<template>
  <q-page class="justify-evenly">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="list" to="/batch" label="Batches"/>
    </q-breadcrumbs>

    <q-list class="rounded-borders q-pa-lg">
      <q-item-label header>All Batches</q-item-label>

      <div v-if="results?.total > 0">

        <q-separator></q-separator>
        <div v-for="result in results?.data ?? []" :key="getHash(result)">
          <batch-list-item :batch="result"></batch-list-item>
          <q-separator></q-separator>
        </div>

        <div class="q-pa-lg flex flex-center">
          <q-pagination
            v-if="results?.total > 0"
            input
            :model-value="results.current_page"
            @update:model-value="page = $event"
            :max="results.last_page"
          />
        </div>
      </div>
      <div v-else-if="results?.total === 0">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="negative" name="warning" />
          </q-item-section>

          <q-item-section>No batches found</q-item-section>
        </q-item>
      </div>
      <div v-else>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="sync" />
          </q-item-section>

          <q-item-section>Loading</q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch} from 'vue';
import api from 'src/utils/client/api';
import {Batch} from 'src/types/api';
import TrackedJobListItem from '../components/TrackedJobListItem.vue';
import BatchListItem from 'components/BatchListItem.vue';
import {client} from '@tobytwigger/laravel-job-status-js';
import {PaginationResponse} from '@tobytwigger/laravel-job-status-js/dist/interfaces/PaginationResponse';
import Listener from '@tobytwigger/laravel-job-status-js/dist/listener/Listener';

const results = ref<PaginationResponse<Batch> | null>(null);

const page = ref<number>(1);
watch(page, (page, prevPage) => {
  setupListener();
});

const listener = ref<Listener | null>(null);

function setupListener() {
  if (listener.value !== null) {
    listener.value.stop();
  }

  listener.value = client.batches
    .search()
    .page(page.value)
    .bypassAuth()
    .listen()
    .onUpdated((newResults) => (results.value = newResults))
    .start();
}

onMounted(() => setupListener());

onBeforeUnmount(() => {
  if (listener.value !== null) {
    listener.value.stop();
  }
});

function getHash(batch: Batch): string {
  return batch.batch_id;
}
</script>
