<template>
  <q-list bordered class="rounded-borders" style="min-width: 85%">
    <q-item-label header>{{ title }}</q-item-label>

    <div v-if="results?.total > 0">
      <q-separator></q-separator>
      <div v-for="run in results?.data ?? []" :key="run.id">
        <tracked-run-list-item :tracked-run="run">
        </tracked-run-list-item>
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

        <q-item-section>No runs found</q-item-section>
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
</template>

<script setup lang="ts">

import {computed, defineProps, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import { JobRun, Status, Queue } from 'src/types/api';
import StatusCount from './StatusCount.vue';
import TrackedRunListItem from "components/TrackedRunListItem.vue";
import {PaginationResponse} from "@tobytwigger/laravel-job-status-js/dist/interfaces/PaginationResponse";
import Listener from "@tobytwigger/laravel-job-status-js/dist/listener/Listener";
import {client} from "@tobytwigger/laravel-job-status-js";

const props = defineProps<{
  queues?: string[],
  aliases?: string[],
  batchIds?: number[],
  title: string
}>();

const page = ref<number>(1);

watch(page, (page, prevPage) => {
  setupListener();
});

const results = ref<PaginationResponse<JobRun> | null>(null);

const listener = ref<Listener | null>(null);

watch(() => props.queues, (queue, prevQueue) => setupListener());
watch(() => props.aliases, (queue, prevQueue) => setupListener());
watch(() => props.batchIds, (queue, prevQueue) => setupListener());

function setupListener() {
  if (listener.value !== null) {
    listener.value.stop();
  }

  let search = client.runs.search();
  if(props.aliases !== undefined) {
    for (let alias of props.aliases) {
      search = search.whereAlias(alias);
    }
  }
  if(props.batchIds !== undefined) {
    for (let batchId of props.batchIds) {
      search = search.whereBatchId(batchId);
    }
  }
  if(props.queues !== undefined) {
    for (let queue of props.queues) {
      search = search.whereQueue(queue);
    }
  }

  listener.value = search
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

</script>

<style scoped>

</style>
