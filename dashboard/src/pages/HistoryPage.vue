<template>
  <q-page class="justify-evenly" padding v-if="results !== null">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="manage_search" to="/history" label="History" />
    </q-breadcrumbs>

    <div class="row">
      <!--      <div class="col-12 q-py-md">-->
      <!--        <q-list bordered separator>-->
      <!--          <q-item v-ripple><q-item-section>-->
      <!--            <q-item-label>{{ results.alias }}</q-item-label>-->
      <!--            <q-item-label caption>Alias</q-item-label>-->
      <!--          </q-item-section></q-item>-->
      <!--          <q-item v-ripple><q-item-section>-->
      <!--            <q-item-label>{{ results.class }}</q-item-label>-->
      <!--            <q-item-label caption>Class</q-item-label>-->
      <!--          </q-item-section></q-item>-->
      <!--        </q-list>-->
      <!--      </div>-->

      <div class="col-12">
        <q-list bordered class="rounded-borders" style="min-width: 85%">
          <q-item-label header>Runs</q-item-label>

          <q-separator></q-separator>
          <div v-for="run in results" :key="run.id">
            <no-context-tracked-run-list-item :tracked-run="run">
            </no-context-tracked-run-list-item>
            <q-separator></q-separator>
          </div>
        </q-list>
      </div>
    </div>
  </q-page>
  <q-page class="items-center justify-evenly" v-else> Loading </q-page>
</template>

<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref} from 'vue';
import api from 'src/utils/client/api';
import { JobRun } from 'src/types/api';
import NoContextTrackedRunListItem from 'components/NoContextTrackedRunListItem.vue';
import {client} from "laravel-job-status-js";

const results = ref<JobRun[] | null>(null);

let listener = client.runs.search()
  .bypassAuth()
  .listen()
  .onUpdated(newResults => results.value = newResults)
  .start();

onBeforeUnmount(() => {
  listener.stop();
});

</script>
