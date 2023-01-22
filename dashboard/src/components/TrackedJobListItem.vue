<template>
  <q-item clickable :to="{path: '/jobs/' + props.trackedJob.alias}">
    <q-item-section avatar top>
      <q-icon name="account_tree" color="black" size="34px" />
    </q-item-section>

    <q-item-section top class="col-2 gt-sm">
      <q-item-label class="q-mt-sm">{{ props.trackedJob.class }}</q-item-label>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <span class="text-weight-medium">{{ props.trackedJob.alias ?? props.trackedJob.class }}</span>
<!--        <span class="text-grey-8"> - {{ finishedCount }} finished.</span>-->
      </q-item-label>
      <q-item-label caption lines="2">
        {{ failedCount }} failed
        {{ queuedCount }} queued
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
import {TrackedJob, JobRun, Status} from 'src/types/api';

const props = defineProps<{
  trackedJob: TrackedJob
}>();


// Counts

const failedCount = computed(() => props.trackedJob.runs
  .filter((jobRun: JobRun) => jobRun.status === Status.Failed)
  .length
);
const runningCount = computed(() => props.trackedJob.runs
  .filter((jobRun: JobRun) => jobRun.status === Status.Started)
  .length
);
const queuedCount = computed(() => props.trackedJob.runs
  .filter((jobRun: JobRun) => jobRun.status === Status.Queued)
  .length
);
const finishedCount = computed(() => props.trackedJob.runs
  .filter((jobRun: JobRun) => jobRun.status === Status.Cancelled || jobRun.status === Status.Succeeded)
  .length
);

</script>

<style scoped>

</style>
