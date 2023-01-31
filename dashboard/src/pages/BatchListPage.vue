<template>
  <q-page class="justify-evenly" v-if="results !== null">

    <q-breadcrumbs>
        <q-breadcrumbs-el icon="list" to="/batch" label="Batches"/>
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
  <q-page class="items-center justify-evenly" v-else>
    Loading
  </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import api from 'src/utils/client/api';
import {Batch, Results as ResultsType} from 'src/types/api';
import TrackedJobListItem from "../components/TrackedJobListItem.vue";
import {useApi} from "../compostables/useApi";
import BatchListItem from "components/BatchListItem.vue";

const results = ref<Batch[]|null>(null);

useApi((after) => {
  api.batchList()
    .then((response: Batch[]) => results.value = response)
    .finally(after);
})

function getHash(batch: Batch): string {
  return batch.batch_id;
}

</script>
