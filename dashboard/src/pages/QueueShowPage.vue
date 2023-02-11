<template>
  <q-page class="justify-evenly" padding v-if="results !== null">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="list" to="/jobs" label="Jobs" />
      <q-breadcrumbs-el
        :label="props.queue"
        icon="view_stream"
        :to="'/queues/' + props.queue"
      />
    </q-breadcrumbs>

    <div class="row">
      <div class="col-12 col-sm-6 q-py-md">
        <q-list bordered separator>
          <q-item v-ripple
            ><q-item-section>
              <q-item-label>{{ props.queue }}</q-item-label>
              <q-item-label caption>Queue name</q-item-label>
            </q-item-section></q-item
          >
        </q-list>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <q-list bordered class="rounded-borders" style="min-width: 85%">
          <q-item-label header>Runs</q-item-label>

          <q-separator></q-separator>
          <div v-for="run in results.runs" :key="getHash(run)">
            <tracked-run-list-item :tracked-run="run"> </tracked-run-list-item>
            <q-separator></q-separator>
          </div>
        </q-list>
      </div>
    </div>
  </q-page>
  <q-page class="items-center justify-evenly" v-else> Loading </q-page>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { JobRun, Queue, TrackedJob } from 'src/types/api';
import TrackedRunListItem from 'components/TrackedRunListItem.vue';
import JobFailureReasons from 'components/JobFailureReasons.vue';
import { client } from '@tobytwigger/laravel-job-status-js';

const results = ref<Queue | null>(null);

const props = defineProps<{
  queue: string;
}>();

onMounted(() => {

  let listener = client.queues
    .show(props.queue)
    .bypassAuth()
    .listen()
    .onUpdated((newResults) => (results.value = newResults))
    .start();

  onBeforeUnmount(() => {
    listener.stop();
  });
});
function getHash(jobRun: JobRun): string {
  return jobRun.uuid;
}
</script>
