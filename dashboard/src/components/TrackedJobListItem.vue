<template>
  <q-item clickable :to="{ path: '/jobs/' + props.trackedJob.alias }">
    <q-item-section avatar top>
      <q-icon name="account_tree" color="black" size="34px" />
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <span class="text-weight-medium">{{
          props.trackedJob.alias ?? props.trackedJob.class
        }}</span>
        <span v-if="props.trackedJob.alias !== props.trackedJob.class" class="text-grey-8"> - {{ props.trackedJob.class }}</span>
      </q-item-label>
      <q-item-label caption lines="5">
        <status-count
          :count="props.trackedJob.queued"
          label="Queued"
          color="primary"
        ></status-count>
        <status-count
          :count="props.trackedJob.queued"
          label="Running"
          color="info"
        ></status-count>
        <status-count
          :count="props.trackedJob.cancelled"
          label="Cancelled"
          color="warning"
        ></status-count>
        <status-count
          :count="props.trackedJob.failed"
          label="Failed"
          color="negative"
        ></status-count>
        <status-count
          :count="props.trackedJob.successful"
          label="Succeeded"
          color="positive"
        ></status-count>
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
import { computed, defineProps } from 'vue';
import { TrackedJob, JobRun, Status } from 'src/types/api';
import StatusCount from 'components/StatusCount.vue';

const props = defineProps<{
  trackedJob: TrackedJob;
}>();

// Counts
</script>

<style scoped></style>
