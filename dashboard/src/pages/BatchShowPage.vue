<template>
  <q-page class="justify-evenly" padding v-if="results !== null">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="list" to="/batch" label="Batches" />
      <q-breadcrumbs-el
        icon="list"
        :to="'/batch/' + props.batchId"
        :label="'Batch #' + props.batchId"
      />
    </q-breadcrumbs>

    <div class="row">
      <div class="col-12 q-py-md">
        <q-list bordered separator>
          <q-item>
            <q-item-section>
              <q-item-label>{{ results.batch_id }}</q-item-label>
              <q-item-label caption>Batch ID</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label>{{ batchName }}</q-item-label>
              <q-item-label caption>Name</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="col-12">
        <run-list-with-filtering
          :title="'Runs in batch \'' + batchName + '\''"
          :batch-ids="[props.batchId]"
        >
        </run-list-with-filtering>
      </div>
    </div>
  </q-page>
  <q-page class="items-center justify-evenly" v-else padding> Loading </q-page>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import api from 'src/utils/client/api';
import { Batch } from 'src/types/api';
import TrackedJobListItem from '../components/TrackedJobListItem.vue';
import BatchListItem from 'components/BatchListItem.vue';
import TrackedRunListItem from 'components/TrackedRunListItem.vue';
import dayjs from 'dayjs';
import { client } from '@tobytwigger/laravel-job-status-js';
import RunListWithFiltering from 'components/RunListWithFiltering.vue';

const results = ref<Batch | null>(null);

const props = defineProps<{
  batchId: number;
}>();

onMounted(() => {
  let listener = client.batches
    .show(props.batchId)
    .bypassAuth()
    .listen()
    .onUpdated((newResults) => (results.value = newResults))
    .start();

  onBeforeUnmount(() => {
    listener.stop();
  });
});

const batchName = computed((): string => {
  if (results.value === null) {
    return 'Loading';
  }
  if (results.value.name !== null && results.value.name !== '') {
    return results.value.name;
  }
  return 'dispatched at ' + dayjs(results.value.created_at).format('L LTS');
});
</script>
