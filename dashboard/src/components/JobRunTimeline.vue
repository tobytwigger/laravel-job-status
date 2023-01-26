<template>
  <div>
    <q-chat-message
      :text="entry.text"
      :sent="entry.from_app"
      text-color="white"
      :bg-color="entry.color ?? 'primary'"
      v-for="entry in entries"
      :key="entry.id"
    >
      <template v-slot:name>
        <span v-if="entry.from_app">Your Application</span>
        <span v-else>{{ run.alias }}</span>
      </template>
      <template v-slot:stamp>
        <span>{{ Math.round(entry.time_into_job.asSeconds() * 10) / 10 }} seconds</span></template>
      <template v-slot:avatar>
        <q-avatar color="teal" class="q-ma-sm" text-color="white" v-if="entry.from_app" :icon="entry.icon"></q-avatar>
        <q-avatar color="teal" class="q-ma-sm" text-color="white" v-else :icon="entry.icon"></q-avatar>
      </template>
    </q-chat-message>
  </div>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import {JobRun, MessageType, JobException} from 'src/types/api';
import duration, {Duration} from 'dayjs/plugin/duration';
import dayjs from "dayjs";

dayjs.extend(duration);

const props = defineProps<{
  run: JobRun
}>();

interface TimelineEntry {
  id: string
  text: string[]
  from_app: boolean
  time_into_job: Duration,
  color: string | null,
  icon: string
}

function calculateTimeIntoJob(time: Date): Duration {
  let originalDate = props.run.created_at;
  return dayjs.duration({
    milliseconds: dayjs(time).diff(originalDate, 'millisecond')
  });
}

function getColourFromMessageType(type: MessageType): string {
  if (type === MessageType.Info) {
    return 'info';
  } else if (type === MessageType.Success) {
    return 'positive';
  } else if (type === MessageType.Error) {
    return 'negative';
  } else if (type === MessageType.Warning) {
    return 'warning';
  } else {
    return 'accent';
  }
}

const entries = computed((): TimelineEntry[] => {
  let rawEntries: TimelineEntry[] = [];
  for (let message of props.run.messages) {
    rawEntries.push({
      from_app: false,
      id: 'message-' + message.id.toString(),
      text: [message.message],
      time_into_job: calculateTimeIntoJob(message.created_at),
      color: getColourFromMessageType(message.type),
      icon: 'chat',
    });
  }
  if(props.run.exception !== null) {
    rawEntries.push({
      from_app: false,
      id: 'exception-' + props.run.exception.id.toString(),
      text: ['An exception occurred', props.run.exception.message],
      time_into_job: calculateTimeIntoJob(props.run.exception.created_at),
      color: 'negative',
      icon: 'error',
    });
  }
  for (let status of props.run.statuses) {
    rawEntries.push({
      from_app: false,
      id: 'status-' + status.id.toString(),
      text: [
        'Status changed to ' + status.status
      ],
      time_into_job: calculateTimeIntoJob(status.created_at),
      color: null,
      icon: 'move_down'
    });
  }
  for (let signal of props.run.signals) {
    rawEntries.push({
      from_app: true,
      id: 'signal-dispatched-' + signal.id.toString(),
      text: [
        'Signal ' + signal.signal + ' sent (#' + signal.id.toString() + ')'
      ].concat(
        Object.keys(signal.parameters)
          .map((key): string => {
            return 'Passing parameter \'' + key + '\' with value \'' + signal.parameters[key] + '\''
          })
      ),
      time_into_job: calculateTimeIntoJob(signal.created_at),
      color: null,
      icon: 'connect_without_contact'
    });
    rawEntries.push({
      from_app: false,
      id: 'signal-handled-' + signal.id.toString(),
      text: [
        'Handled signal ' + signal.signal + ' (#' + signal.id + ')'
      ].concat(signal.cancel_job ? ['This caused the job to be cancelled.'] : []),
      time_into_job: calculateTimeIntoJob(signal.handled_at),
      color: signal.cancel_job ? 'warning' : null,
      icon: 'connect_without_contact'
    });
  }
  rawEntries.sort((a, b) => {
    return a.time_into_job.asMilliseconds() - b.time_into_job.asMilliseconds()
  });
  return rawEntries;
});

</script>

<style scoped>

</style>
