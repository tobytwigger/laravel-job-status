<template>
  <q-page class="justify-evenly" v-if="results !== null">

    <q-breadcrumbs>
        <q-breadcrumbs-el icon="list" to="/jobs" label="Jobs"/>
    </q-breadcrumbs>

    <q-list class="rounded-borders q-pa-lg">
      <q-item-label header>All Jobs</q-item-label>

      <q-separator></q-separator>
      <div v-for="result in results.jobs" :key="getHash(result)">
        <tracked-job-list-item  :tracked-job="result">
        </tracked-job-list-item>
        <q-separator></q-separator>
      </div>
    </q-list>

  </q-page>
  <q-page class="items-center justify-evenly" v-else>
    Loading
  </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import api from 'src/utils/client/api';
import {Results as ResultsType} from 'src/types/api';
import TrackedJobListItem from "../components/TrackedJobListItem.vue";
import {useApi} from "../compostables/useApi";

const results = ref<ResultsType|null>(null);

useApi((after) => {
  api.jobList()
    .then((response: ResultsType) => results.value = response)
    .finally(after);
})

function getHash(trackedJob: TrackedJob): string {
  return trackedJob.class;
}

</script>
