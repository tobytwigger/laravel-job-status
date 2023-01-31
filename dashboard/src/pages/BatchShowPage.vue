<template>
  <q-page class="justify-evenly" v-if="results !== null">

    <q-breadcrumbs>
      <q-breadcrumbs-el icon="list" to="/batch" label="Batches"/>
      <q-breadcrumbs-el icon="list" :to="'/batch/' + props.batchId" :label="'Batch #' + props.batchId"/>
    </q-breadcrumbs>

    <q-list class="rounded-borders q-pa-lg">
      <q-item-label header>Viewing batch {{batchName}}</q-item-label>
      <q-separator></q-separator>

      <div v-for="result in results.runs" :key="result.id">
        <tracked-run-list-item :tracked-run="result"></tracked-run-list-item>
        <q-separator></q-separator>
      </div>
    </q-list>

  </q-page>
  <q-page class="items-center justify-evenly" v-else>
    Loading
  </q-page>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import api from 'src/utils/client/api';
import {Batch, Results as ResultsType} from 'src/types/api';
import TrackedJobListItem from "../components/TrackedJobListItem.vue";
import {useApi} from "../compostables/useApi";
import BatchListItem from "components/BatchListItem.vue";
import TrackedRunListItem from "components/TrackedRunListItem.vue";
import dayjs from "dayjs";

const results = ref<Batch|null>(null);

const props = defineProps<{
  batchId: number
}>();

useApi((after) => {
  api.batchShow(props.batchId)
    .then((response: Batch) => results.value = response)
    .finally(after);
})

const batchName = computed((): string => {
  if(results.value === null) {
    return 'Loading'
  }
  if(results.value.name !== null && results.value.name !== '') {
    return results.value.name;
  }
  return 'dispatched at ' + dayjs(results.value.created_at).format('L LTS');
})

</script>
