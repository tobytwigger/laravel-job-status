<template>
  <q-item>
    <q-item-section avatar top>
      <q-avatar color="primary" text-color="white">
        {{props.jobFailure.count}}
      </q-avatar>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <span class="text-weight-medium">{{ props.jobFailure.message }}</span>
      </q-item-label>
<!--      <q-item-label caption lines="5">-->
<!--        <status-count :count="queuedCount" label="Queued" color="primary"></status-count>-->
<!--        <status-count :count="runningCount" label="Running" color="info"></status-count>-->
<!--        <status-count :count="cancelledCount" label="Cancelled" color="warning"></status-count>-->
<!--        <status-count :count="failedCount" label="Failed" color="negative"></status-count>-->
<!--        <status-count :count="succeededCount" label="Succeeded" color="positive"></status-count>-->
<!--      </q-item-label>-->
    </q-item-section>

<!--    <q-item-section top side>-->
<!--      <div class="text-grey-8 q-gutter-xs">-->
<!--        <q-icon class="gt-xs" size="12px" icon="keyboard_arrow_right" />-->
<!--      </div>-->
<!--    </q-item-section>-->
  </q-item>
</template>

<script setup lang="ts">
import {computed, defineProps} from 'vue';
import {JobFailureReason} from 'src/types/api';
import StatusCount from "components/StatusCount.vue";

const props = defineProps<{
  jobFailure: JobFailureReason
}>();

</script>

<style scoped>

</style>
