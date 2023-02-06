<template>
  <q-page class="justify-evenly" v-if="results !== null">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="list" to="/queues" label="Queues" />
    </q-breadcrumbs>

    <q-list class="rounded-borders q-pa-lg">
      <q-item-label header>All Queues</q-item-label>

      <q-separator></q-separator>
      <div v-for="result in results" :key="getHash(result)">
        <queue-list-item :queue="result"> </queue-list-item>
        <q-separator></q-separator>
      </div>
    </q-list>
  </q-page>
  <q-page class="items-center justify-evenly" v-else> Loading </q-page>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { client } from 'laravel-job-status-js';
import { Queue } from 'src/types/api';
import QueueListItem from 'components/QueueListItem.vue';

const results = ref<Queue[] | null>(null);

let listener = client.queues
  .search()
  .bypassAuth()
  .listen()
  .onUpdated((newResults) => (results.value = newResults))
  .start();

onBeforeUnmount(() => {
  listener.stop();
});

function getHash(queue: Queue): string {
  return queue.name;
}
</script>
