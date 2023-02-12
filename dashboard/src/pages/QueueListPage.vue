<template>
  <q-page class="justify-evenly" padding>
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="list" to="/queues" label="Queues" />
      <q-breadcrumbs-el to="/queues" label="List Queues" />
    </q-breadcrumbs>

    <q-list class="rounded-borders q-pa-lg">
      <q-item-label header>All Queues</q-item-label>

      <div v-if="results?.total > 0">
        <q-separator></q-separator>
        <div v-for="result in results?.data ?? []" :key="getHash(result)">
          <queue-list-item :queue="result"></queue-list-item>
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

          <q-item-section>No queues found</q-item-section>
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
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { client } from '@tobytwigger/laravel-job-status-js';
import { Queue } from 'src/types/api';
import QueueListItem from 'components/QueueListItem.vue';
import { PaginationResponse } from '@tobytwigger/laravel-job-status-js/dist/interfaces/PaginationResponse';
import Listener from '@tobytwigger/laravel-job-status-js/dist/listener/Listener';

const results = ref<PaginationResponse<Queue> | null>(null);

const listener = ref<Listener | null>(null);

const page = ref<number>(1);

watch(page, (page, prevPage) => {
  setupListener();
});

function setupListener() {
  if (listener.value !== null) {
    listener.value.stop();
  }

  listener.value = client.queues
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

function getHash(queue: Queue): string {
  return queue.name ?? 'default';
}
</script>
