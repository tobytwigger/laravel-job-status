<template>
  <q-item clickable :to="{path: '/run/' + props.trackedRun.id}">
    <q-item-section avatar top>
      <q-icon name="hourglass_top" color="black" size="34px" v-if="props.trackedRun.status === Status.Queued" />
      <q-circular-progress
        show-value
        :value="props.trackedRun.percentage"
        rounded
        v-else-if="props.trackedRun.status === Status.Started"
        size="34px"
        class="q-ma-md"
      />
      <q-icon name="done" color="black" size="34px" v-else-if="props.trackedRun.status === Status.Succeeded" />
      <q-icon name="close" color="black" size="34px" v-else-if="props.trackedRun.status === Status.Failed" />
      <q-icon name="not_interested" color="black" size="34px" v-else-if="props.trackedRun.status === Status.Cancelled" />
    </q-item-section>

    <q-item-section top class="col-2 gt-sm">
      <q-item-label class="q-mt-sm">{{ timeAgo }}</q-item-label>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <span class="text-weight-medium">{{props.trackedRun.alias}}</span>
        <span class="text-grey-8"> - {{props.trackedRun.status}}</span>
      </q-item-label>
      <q-item-label caption>
        <span>
          <q-chip v-if="props.trackedRun.messages.length === 0" dense icon="chat">Messages: {{props.trackedRun.messages.length}}</q-chip>
          <q-chip v-else dense color="blue" text-color="white" icon="chat">
            Messages: {{props.trackedRun.messages.length}}
          </q-chip>
        </span>
        <span>
          <q-chip v-if="props.trackedRun.signals.length === 0" dense icon="sensors">Signals: {{props.trackedRun.signals.length}}</q-chip>
          <q-chip v-else dense color="red" text-color="white" icon="sensors">
            Signals: {{props.trackedRun.signals.length}}
          </q-chip>
        </span>
        <span>
          <q-chip v-if="tryCount === 1" dense icon="replay">Retries: {{tryCount - 1}}</q-chip>
          <q-chip v-else dense color="orange" text-color="white" icon="replay">
            Retries: {{tryCount - 1}}
          </q-chip>
        </span>
      </q-item-label>
    </q-item-section>

    <q-item-section top side>
      <div class="text-grey-8 q-gutter-xs">
        <q-icon class="gt-xs" size="12px" icon="keyboard_arrow_right" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import {JobRun, Status} from 'src/types/api';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const props = defineProps<{
  trackedRun: JobRun
}>();

const timeAgo = computed(() => dayjs().to(props.trackedRun.created_at))

const tryCount = computed(() => {
  let tries = 1;
  let run = props.trackedRun;
  while(run.parent !== null) {
    run = run.parent
    tries++;
  }
  return tries;
})

</script>

<style scoped>

</style>
