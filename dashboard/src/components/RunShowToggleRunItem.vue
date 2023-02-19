<template>
  <q-item
    clickable
    v-ripple
    :active="selectedId.toString() === props.job.id.toString()"
    @click="emit('click', props.job.id)"
  >
    <q-item-section avatar v-if="icon !== null">
      <q-icon :name="icon.icon" :color="icon.color" />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        Run #{{ props.index }}
      </q-item-label>
      <q-item-label
        v-if="props.job.released_runs.length > 0"
        caption>Delayed {{ props.job.released_runs.length }} time{{ props.job.released_runs.length > 1 ? 's' : '' }}.</q-item-label>
    </q-item-section>
  </q-item>

</template>

<script setup lang="ts">
import {computed, ref, defineProps, onMounted} from "vue";
import {JobRun, Status} from "src/types/api";


const props = defineProps<{
  job: JobRun,
  index: number,
  selectedId: number
}>();

const emit = defineEmits(['click'])

interface IconSettings {
  icon: string;
  color: string;
}

const icon = computed((): IconSettings|null => {
  switch (props.job.status) {
    case Status.Queued:
      return {icon: 'hourglass_top', color: 'primary'};
    case Status.Started:
      return {icon: 'sync', color: 'info'};
    case Status.Failed:
      return {icon: 'close', color: 'negative'};
    case Status.Succeeded:
      return {icon: 'done', color: 'positive'};
    case Status.Cancelled:
      return {icon: 'not_interested', color: 'warning'};
    default:
      return null
  }
})

</script>

<style scoped>

</style>
