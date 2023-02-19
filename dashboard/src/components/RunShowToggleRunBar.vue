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
        <!--          <q-btn-dropdown auto-close rounded color="primary" label="Three" split>-->
        <!--             dropdown content goes here-->
        <!--            <q-list padding style="width: 250px">-->
        <!--              <q-item clickable>-->
        <!--                <q-item-section avatar>-->
        <!--                  <q-avatar icon="folder" color="purple" text-color="white" />-->
        <!--                </q-item-section>-->
        <!--                <q-item-section>-->
        <!--                  <q-item-label>Photos</q-item-label>-->
        <!--                  <q-item-label caption>February 22, 2016</q-item-label>-->
        <!--                </q-item-section>-->
        <!--                <q-item-section side>-->
        <!--                  <q-icon name="info" color="amber" />-->
        <!--                </q-item-section>-->
        <!--              </q-item>-->
        <!---->
        <!--              <q-item clickable>-->
        <!--                <q-item-section avatar>-->
        <!--                  <q-avatar icon="folder" color="purple" text-color="white" />-->
        <!--                </q-item-section>-->
        <!--                <q-item-section>-->
        <!--                  <q-item-label>Videos</q-item-label>-->
        <!--                  <q-item-label caption>London</q-item-label>-->
        <!--                </q-item-section>-->
        <!--                <q-item-section side>-->
        <!--                  <q-icon name="info" color="amber" />-->
        <!--                </q-item-section>-->
        <!--              </q-item>-->
        <!---->
        <!--              <q-separator inset />-->
        <!--              <q-item-label header>Files</q-item-label>-->
        <!---->
        <!--              <q-item clickable>-->
        <!--                <q-item-section avatar>-->
        <!--                  <q-avatar icon="assignment" color="teal" text-color="white" />-->
        <!--                </q-item-section>-->
        <!--                <q-item-section>-->
        <!--                  <q-item-label>London</q-item-label>-->
        <!--                  <q-item-label caption>March 1st, 2018</q-item-label>-->
        <!--                </q-item-section>-->
        <!--                <q-item-section side>-->
        <!--                  <q-icon name="info" color="amber" />-->
        <!--                </q-item-section>-->
        <!--              </q-item>-->
        <!---->
        <!--              <q-item clickable>-->
        <!--                <q-item-section avatar>-->
        <!--                  <q-avatar icon="assignment" color="teal" text-color="white" />-->
        <!--                </q-item-section>-->
        <!--                <q-item-section>-->
        <!--                  <q-item-label>Paris</q-item-label>-->
        <!--                  <q-item-label caption>January 22nd, 2017</q-item-label>-->
        <!--                </q-item-section>-->
        <!--                <q-item-section side>-->
        <!--                  <q-icon name="info" color="amber" />-->
        <!--                </q-item-section>-->
        <!--              </q-item>-->
        <!--            </q-list>-->
        <!--          </q-btn-dropdown>-->


      <!--        <q-btn-toggle-->
      <!--          push-->
      <!--          spread-->
      <!--          no-caps-->
      <!--          rounded-->
      <!--          unelevated-->
      <!--          glossy-->
      <!--          toggle-color="primary"-->
      <!--          :options="retryOptions"-->
      <!--        >-->
      <!--          <template v-for="option in retryOptions" :key="option.value" v-slot:[option.slot]>-->
      <!--            <div class="row items-center no-wrap">-->
      <!--              <div class="text-center">-->
      <!--                {{ option.label }}-->
      <!--              </div>-->
      <!--              <q-icon right name="directions_boat" />-->
      <!--            </div>-->
      <!--          </template>-->
      <!--        </q-btn-toggle>-->
</template>

<script setup lang="ts">
import {computed, ref, defineProps, onMounted} from "vue";
import {JobRun} from "src/types/api";
import RunShowToggleRunItem from "components/RunShowToggleRunItem.vue";


const props = defineProps<{
  jobRun: JobRun;
  modelValue: JobRun
}>();


function viewRun(runId: number) {
  let run = getRun(runId);
  console.log(run);
  emit('update:modelValue', run);
}

function getRun(runId: number): JobRun|null {
  console.log('getting ID' + runId);
  let jobRun: JobRun | null = props.jobRun;

  while (jobRun !== null) {
    console.log('checking ID ' + jobRun.id.toString());
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
  jobs = jobs.reverse();

  // Iterate through each of the jobs, from oldest first.
  // If it's released, add to the released array
  // Once we get to the first run that isn't released, give it all the previously released ones
  return jobs.reverse();
});



</script>

<style scoped>

</style>
