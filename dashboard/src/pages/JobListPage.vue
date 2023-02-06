<template>
  <q-page class="justify-evenly" v-if="results !== null">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="list" to="/jobs" label="Jobs" />
    </q-breadcrumbs>

    <q-list class="rounded-borders q-pa-lg">
      <q-item-label header>All Jobs</q-item-label>

      <q-separator></q-separator>
      <div v-for="result in results" :key="getHash(result)">
        <tracked-job-list-item :tracked-job="result"> </tracked-job-list-item>
        <q-separator></q-separator>
      </div>
    </q-list>
  </q-page>
  <q-page class="items-center justify-evenly" v-else> Loading </q-page>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue';
import TrackedJobListItem from '../components/TrackedJobListItem.vue';
import { TrackedJob } from 'src/types/api';
import {client} from "laravel-job-status-js";

const results = ref<TrackedJob[] | null>(null);

let listener = client.jobs.search()
  .bypassAuth()
  .listen()
  .onUpdated(newResults => results.value = newResults)
  .start();

onBeforeUnmount(() => {
  listener.stop();
});

function getHash(trackedJob: TrackedJob): string {
  return trackedJob.class;
}
</script>
