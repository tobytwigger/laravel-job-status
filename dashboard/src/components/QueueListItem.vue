<template>
  <q-item clickable :to="{ path: '/queues/' + encodeURIComponent(props.queue.name) }">
    <q-item-section avatar top>
      <q-icon name="queue" color="black" size="34px" />
    </q-item-section>

    <q-item-section top class="col-2 gt-sm">
      <q-item-label class="q-mt-sm">{{ props.queue.name }}</q-item-label>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <span class="text-weight-medium">{{
          props.queue.name
        }}</span>

      </q-item-label>
      <q-item-label caption lines="5">
        <status-count
          :count="props.queue.queued"
          label="Queued"
          color="primary"
        ></status-count>
        <status-count
          :count="props.queue.started"
          label="Running"
          color="info"
        ></status-count>
        <status-count
          :count="props.queue.cancelled"
          label="Cancelled"
          color="warning"
        ></status-count>
        <status-count
          :count="props.queue.failed"
          label="Failed"
          color="negative"
        ></status-count>
        <status-count
          :count="props.queue.succeeded"
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
import {JobRun, Status, Queue} from 'src/types/api';
import StatusCount from "./StatusCount.vue";

const props = defineProps<{
  queue: Queue;
}>();


</script>
