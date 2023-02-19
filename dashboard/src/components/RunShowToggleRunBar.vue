<template>
  <div class="col-12 q-py-md">
    <q-list bordered class="rounded-borders">
      <run-show-toggle-run-item
        v-for="(job, index) in jobLists"
        :key="job.id"
        :index="index"
        :selected-id="props.modelValue.id"
        @click="viewRun($event)"
        :job="job">
      </run-show-toggle-run-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, defineProps, onMounted, watch} from "vue";
import {JobRun} from "src/types/api";
import RunShowToggleRunItem from "components/RunShowToggleRunItem.vue";


const props = defineProps<{
  jobRun: JobRun;
  modelValue: JobRun
}>();

watch(() => props.jobRun, (newRun, oldRun) => {
  if(props.modelValue.id === newRun.id) {
    viewRun(newRun.id);
  }
});

function viewRun(runId: number) {
  let run = getRun(runId);
  console.log(run);
  emit('update:modelValue', run);
}

function getRun(runId: number): JobRun|null {
  let jobRun: JobRun | null = props.jobRun;

  while (jobRun !== null) {
    if(jobRun.id.toString() === runId.toString()) {
      return jobRun;
    }
    for(let releasedRun of jobRun.released_runs) {
      console.log('checking ID ' + releasedRun.id.toString());

      if(releasedRun.id.toString() === runId.toString()) {
        return releasedRun;
      }
    }
    jobRun = jobRun.parent;
  }

  return null;
}

const emit = defineEmits(['update:modelValue'])

onMounted(() => viewRun(props.jobRun.id));

const jobLists = computed((): JobRun[] => {
  let jobs: JobRun[] = [];

  let jobRun: JobRun | null = props.jobRun;
  while (jobRun !== null) {
    jobs.push(jobRun);
    jobRun = jobRun.parent;
  }

  // Iterate through each of the jobs, from oldest first.
  // If it's released, add to the released array
  // Once we get to the first run that isn't released, give it all the previously released ones
  return jobs.reverse();
});



</script>

<style scoped>

</style>
