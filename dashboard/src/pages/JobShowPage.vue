<template>
  <q-page class="justify-evenly" padding v-if="results !== null">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="list" to="/jobs" label="Jobs" />
      <q-breadcrumbs-el
        :label="results.alias"
        icon="view_stream"
        :to="'/jobs/' + results.alias"
      />
    </q-breadcrumbs>

    <div class="row">
      <div class="col-12 col-sm-6 q-py-md">
        <q-list bordered separator>
          <q-item v-ripple
            ><q-item-section>
              <q-item-label>{{ results.alias }}</q-item-label>
              <q-item-label caption>Alias</q-item-label>
            </q-item-section></q-item
          >
          <q-item v-ripple
            ><q-item-section>
              <q-item-label>{{ results.class }}</q-item-label>
              <q-item-label caption>Class</q-item-label>
            </q-item-section></q-item
          >
        </q-list>
      </div>

      <div class="col-12 col-sm-6 q-py-md">
        <job-failure-reasons
          :job-failure-reasons="results.failure_reasons"
        ></job-failure-reasons>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <run-list-with-filtering
          title="Runs"
          :aliases="[props.alias]"
        ></run-list-with-filtering>
        <!--        <q-list bordered class="rounded-borders" style="min-width: 85%">-->
        <!--          <q-item-label header>Runs</q-item-label>-->

        <!--          <q-separator></q-separator>-->
        <!--          <div v-for="run in results.runs" :key="getHash(run)">-->
        <!--            <tracked-run-list-item :tracked-run="run"> </tracked-run-list-item>-->
        <!--            <q-separator></q-separator>-->
        <!--          </div>-->
        <!--        </q-list>-->
      </div>
    </div>
  </q-page>
  <q-page class="items-center justify-evenly" v-else padding> Loading </q-page>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { JobRun, TrackedJob } from 'src/types/api';
import TrackedRunListItem from 'components/TrackedRunListItem.vue';
import JobFailureReasons from 'components/JobFailureReasons.vue';
import { client } from '@tobytwigger/laravel-job-status-js';
import Listener from '@tobytwigger/laravel-job-status-js/dist/listener/Listener';
import RunListWithFiltering from 'components/RunListWithFiltering.vue';

const results = ref<TrackedJob | null>(null);

const props = defineProps<{
  alias: string;
}>();

// Filter

const listener = ref<Listener | null>(null);

function setupListener() {
  if (listener.value !== null) {
    listener.value.stop();
  }

  listener.value = client.jobs
    .show(props.alias)
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

function getHash(jobRun: JobRun): string {
  return jobRun.uuid;
}
</script>
