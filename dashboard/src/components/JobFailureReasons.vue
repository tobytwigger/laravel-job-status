<template>
  <q-list bordered separator v-if="results !== null">
    <q-item-label header>Errors</q-item-label>

    <q-item v-if="results.length === 0">
      <q-item-section>
        <q-item-label>Good news; no errors found!</q-item-label>
      </q-item-section>
    </q-item>

    <div v-else>
      <q-item v-for="(jobFailureReason, index) in results" :key="index">
        <job-failure-list-item :job-failure="jobFailureReason"></job-failure-list-item>
      </q-item>
    </div>
  </q-list>
</template>

<script setup lang="ts">
import {computed, defineProps, ref} from 'vue';
import {JobRun, Status, Batch, TrackedJob, JobFailureReason} from 'src/types/api';
import StatusCount from "components/StatusCount.vue";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useApi} from "src/compostables/useApi";
import api from "src/utils/client/api";
import JobFailureListItem from "components/JobFailureListItem.vue";

const results = ref<JobFailureReason[] | null>(null);

const props = defineProps<{
  alias: string
}>();

useApi((after) => {
  api.jobFailureReasons(props.alias)
    .then((response: JobFailureReason[]) => results.value = response)
    .finally(after);
})

</script>

<style scoped>

</style>
