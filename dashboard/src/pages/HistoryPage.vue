<template>
  <q-page class="justify-evenly" v-if="results?.total > 0">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="manage_search" to="/history" label="History" />
    </q-breadcrumbs>

    <div class="row q-ma-md">
      <div class="col-12">
        <q-card>
          <div class="row">
            <div class="col-md-4 col-sm-6 col-xs-12">
              <q-card-section>
                <q-select use-chips multiple clearable emit-value v-model="statusFilter" :options="statusOptions" label="Status" hint="Only show runs with these statuses" />
              </q-card-section>
            </div>
          </div>
        </q-card>

      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <q-list bordered class="rounded-borders" style="min-width: 85%">
          <q-item-label header>Runs</q-item-label>

          <q-separator></q-separator>
          <div v-for="run in results?.data ?? []" :key="run.id">
            <no-context-tracked-run-list-item :tracked-run="run">
            </no-context-tracked-run-list-item>
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

        </q-list>
      </div>
    </div>
  </q-page>
  <q-page class="items-center justify-evenly" v-else> Loading </q-page>
</template>

<script setup lang="ts">
import {computed, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import {JobRun, Status} from 'src/types/api';
import NoContextTrackedRunListItem from 'components/NoContextTrackedRunListItem.vue';
import {client} from '@tobytwigger/laravel-job-status-js';
import Listener from "@tobytwigger/laravel-job-status-js/dist/listener/Listener";
import {PaginationResponse} from "@tobytwigger/laravel-job-status-js/dist/interfaces/PaginationResponse";

const results = ref<PaginationResponse<JobRun> | null>(null);

const page = ref<number>(1);
watch(page, (page, prevPage) => {
  setupListener();
});

const statusFilter = ref<string[]|null>(null);
const listener = ref<Listener|null>(null);

watch(statusFilter, (aliasFilter, prevAliasFilter) => {
  setupListener();
});
watch(page, (page, prevPage) => {
  setupListener();
});

function setupListener() {
  if(listener.value !== null) {
    listener.value.stop();
  }

  let search = client.runs.search();
  if(statusFilter.value !== null && statusFilter.value.length > 0) {
    for(let status of statusFilter.value) {
      search = search.whereStatus(status);
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
  if(listener.value !== null) {
    listener.value.stop();
  }
});

const statusOptions = computed(() => {
  return [
    {label: 'All', value: null},
    {label: 'Queued', value: Status.Queued},
    {label: 'Running', value: Status.Started},
    {label: 'Failed', value: Status.Failed},
    {label: 'Cancelled', value: Status.Cancelled},
    {label: 'Succeeded', value: Status.Succeeded},
  ]
});

</script>
