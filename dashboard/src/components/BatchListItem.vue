<template>
  <q-item clickable :to="{path: '/batch/' + props.batch.id}">
    <q-item-section avatar top>
      <q-icon name="group_work" color="black" size="34px" />
    </q-item-section>

    <q-item-section top class="col-2 gt-sm">
      <q-item-label class="q-mt-sm">{{ timeAgo }}</q-item-label>
    </q-item-section>

    <q-item-section top>
      <q-item-label lines="1">
        <span class="text-weight-medium">{{ batchName }}</span>
<!--        <span class="text-grey-8"> - {{ finishedCount }} finished.</span>-->
      </q-item-label>
      <q-item-label caption lines="5">
        <status-count :count="props.batch.queued" label="Queued" color="primary"></status-count>
        <status-count :count="props.batch.started" label="Running" color="info"></status-count>
        <status-count :count="props.batch.cancelled" label="Cancelled" color="warning"></status-count>
        <status-count :count="props.batch.failed" label="Failed" color="negative"></status-count>
        <status-count :count="props.batch.succeeded" label="Succeeded" color="positive"></status-count>
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
import {JobRun, Status, Batch} from 'src/types/api';
import StatusCount from "components/StatusCount.vue";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat)

const props = defineProps<{
  batch: Batch
}>();

const timeAgo = computed(() => dayjs().to(props.batch.created_at))

const batchName = computed((): string => {
  if(props.batch.name !== null && props.batch.name !== '') {
    return props.batch.name;
  }
  return 'Batch dispatched at ' + dayjs(props.batch.created_at).format('L LTS');
})

</script>

<style scoped>

</style>
