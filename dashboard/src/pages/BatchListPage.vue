<template>
  <q-page class="justify-evenly" v-if="results !== null">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="list" to="/batch" label="Batches" />
    </q-breadcrumbs>

    <q-list class="rounded-borders q-pa-lg">
      <q-item-label header>All Batches</q-item-label>

      <q-separator></q-separator>
      <div v-for="result in results" :key="getHash(result)">
        <batch-list-item :batch="result"></batch-list-item>
        <q-separator></q-separator>
      </div>
    </q-list>
  </q-page>
  <q-page class="items-center justify-evenly" v-else> Loading </q-page>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import api from 'src/utils/client/api';
import { Batch } from 'src/types/api';
import TrackedJobListItem from '../components/TrackedJobListItem.vue';
import BatchListItem from 'components/BatchListItem.vue';
import { client } from 'laravel-job-status-js';

const results = ref<Batch[] | null>(null);

let listener = client.batches
  .search()
  .bypassAuth()
  .listen()
  .onUpdated((newResults) => (results.value = newResults))
  .start();

onBeforeUnmount(() => {
  listener.stop();
});

function getHash(batch: Batch): string {
  return batch.batch_id;
}
</script>
