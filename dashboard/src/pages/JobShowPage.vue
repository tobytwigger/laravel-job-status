<template>
  <q-page class="row items-center justify-evenly" v-if="results !== null">
    <q-list bordered separator>
      <q-item clickable v-ripple><q-item-section>
        <q-item-label>{{ results.alias }}</q-item-label>
        <q-item-label caption>Alias</q-item-label>
      </q-item-section></q-item>
      <q-item clickable v-ripple><q-item-section>
        <q-item-label>{{ results.class }}</q-item-label>
        <q-item-label caption>Class</q-item-label>
      </q-item-section></q-item>
    </q-list>

    <q-list bordered class="rounded-borders" style="min-width: 85%" >
      <q-item-label header>Runs</q-item-label>

      <q-separator></q-separator>
      <div v-for="run in results.runs" :key="getHash(run)">
        <tracked-run-list-item :tracked-run="run">
        </tracked-run-list-item>
        <q-separator></q-separator>
      </div>
    </q-list>

  </q-page>
  <q-page class="row items-center justify-evenly" v-else>
    Loading
  </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import api from 'src/utils/client/api';
import {JobRun, TrackedJob} from 'src/types/api';
import {useApi} from "../compostables/useApi";
import TrackedRunListItem from "components/TrackedRunListItem.vue";

const results = ref<TrackedJob|null>(null);

const props = defineProps<{
  alias: string
}>();

useApi((after) => {
  api.jobShow(props.alias)
    .then((response: TrackedJob) => results.value = response)
    .finally(after);
})

function getHash(jobRun: JobRun): string {
  return jobRun.uuid;
}

</script>
