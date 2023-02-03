<template>
  <q-page class="justify-evenly" padding v-if="selectedRun !== null">
    <q-breadcrumbs>
      <q-breadcrumbs-el icon="list" to="/jobs" label="Jobs" />
      <q-breadcrumbs-el
        :label="selectedRun.alias"
        icon="view_stream"
        :to="'/jobs/' + selectedRun.alias"
      />
      <q-breadcrumbs-el
        :label="'Run #' + selectedRun.id"
        icon="visibility"
        :to="'/run/' + selectedRun.id"
      />
    </q-breadcrumbs>

    <div class="row" v-if="retryOptions.length > 1">
      <div class="col-12 q-py-md">
        <q-btn-toggle
          @update:model-value="viewRun($event)"
          :model-value="selectedRun?.id.toString()"
          push
          spread
          no-caps
          rounded
          unelevated
          glossy
          toggle-color="primary"
          :options="retryOptions"
        />
      </div>
    </div>

    <div
      class="row"
      v-if="
        (selectedRun.status === 'started' || selectedRun.status === 'queued') &&
        hasUnfinishedCancel
      "
    >
      <div class="col-12">
        <q-banner class="bg-warning text-black">
          A cancel signal has been sent to this job, but the job has not yet
          handled it.
        </q-banner>
      </div>
    </div>

    <div class="row q-pa-md">
      <div class="col-12 text-right">
        <q-btn-group rounded>
          <q-btn
            rounded
            push
            v-if="selectedRun.alias !== null"
            :to="{ path: '/jobs/' + selectedRun.alias }"
            icon-right="arrow_back"
            label="Go to job"
          />

          <q-btn
            v-if="
              selectedRun.status === 'started' ||
              selectedRun.status === 'queued'
            "
            rounded
            :disable="hasUnfinishedCancel"
            :loading="cancelling"
            push
            icon-right="cancel"
            label="Cancel"
            @click="cancel"
          />

          <q-btn
            v-if="
              selectedRun.connection_name !== null &&
              selectedRun.queue !== null &&
              selectedRun.payload !== null
            "
            rounded
            :disable="hasUnfinishedRetry"
            :loading="retrying"
            push
            icon-right="retry"
            label="Retry"
            @click="retry"
          />
        </q-btn-group>
      </div>
    </div>

    <div class="row">
      <div class="col-12 q-py-md">
        <q-list bordered separator>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedRun.alias }}</q-item-label>
              <q-item-label caption>Alias</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedRun.class }}</q-item-label>
              <q-item-label caption>Class</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedRun.status }}</q-item-label>
              <q-item-label caption>Status</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedRun.uuid }}</q-item-label>
              <q-item-label caption>Uuid</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedRun.tags }}</q-item-label>
              <q-item-label caption>Tags</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedRun.percentage }}</q-item-label>
              <q-item-label caption>Percentage</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedRun.created_at }}</q-item-label>
              <q-item-label caption>Dispatched At</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label v-if="queueTime === null">N/A</q-item-label>
              <q-item-label v-else>{{ queueTime }} s</q-item-label>
              <q-item-label caption>Queue time</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label v-if="runTime === null">N/A</q-item-label>
              <q-item-label v-else>{{ runTime }} s</q-item-label>
              <q-item-label caption>Runtime</q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-if="selectedRun.batch_id === null">
            <q-item-section>
              <q-item-label>N/A</q-item-label>
              <q-item-label caption>Batch</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            v-else
            clickable
            :to="{ path: '/batch/' + selectedRun.batch_id }"
          >
            <q-item-section>
              <q-item-label>{{ selectedRun.batch_id_uuid }}</q-item-label>
              <q-item-label caption>Batch</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <div class="row">
      <div class="col-12 q-py-md">
        <q-card>
          <q-tabs v-model="tab" class="text-teal">
            <q-tab name="timeline" icon="timeline" label="Timeline" />
            <q-tab name="messages" icon="mail" label="Messages" />
            <q-tab
              name="signals"
              icon="connect_without_contact"
              label="Signals"
            />
            <q-tab name="statuses" icon="move_down" label="Status History" />
            <q-tab name="exception" icon="error" label="Exception" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="timeline">
              <job-run-timeline :run="selectedRun"></job-run-timeline>
            </q-tab-panel>

            <q-tab-panel name="messages">
              <div class="text-h6">Messages</div>
              <q-timeline color="secondary">
                <q-timeline-entry
                  v-for="message in selectedRun.messages"
                  :key="message.id"
                  :title="message.type"
                  :subtitle="dayjs(message.created_at).format('L LTS')"
                >
                  <div>
                    {{ message.message }}
                  </div>
                </q-timeline-entry>
              </q-timeline>
            </q-tab-panel>

            <q-tab-panel name="signals">
              <div class="text-h6">Signals</div>
              <q-timeline color="secondary">
                <q-timeline-entry
                  v-for="signal in selectedRun.signals"
                  :key="signal.id"
                  :title="signal.signal"
                  :subtitle="
                    signal.cancel_job ? 'Job stopped' : 'Job continued'
                  "
                >
                  <div>
                    <q-list bordered separator>
                      <q-item>
                        <q-item-section>
                          <q-item-label>{{ signal.parameters }}</q-item-label>
                          <q-item-label caption>Parameters</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label>{{
                            dayjs(signal.created_at).format('L LTS')
                          }}</q-item-label>
                          <q-item-label caption>Sent at</q-item-label>
                        </q-item-section>
                      </q-item>
                      <q-item>
                        <q-item-section>
                          <q-item-label>{{
                            dayjs(signal.handled_at).format('L LTS')
                          }}</q-item-label>
                          <q-item-label caption>Handled at</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </q-timeline-entry>
              </q-timeline>
            </q-tab-panel>

            <q-tab-panel name="statuses">
              <div class="text-h6">Statuses</div>
              <q-timeline color="secondary">
                <q-timeline-entry
                  v-for="status in selectedRun.statuses"
                  :key="status.id"
                  :title="status.status"
                  :subtitle="dayjs(status.created_at).format('L LTS')"
                >
                  <div></div>
                </q-timeline-entry>
              </q-timeline>
            </q-tab-panel>

            <q-tab-panel name="exception">
              <div class="text-h6">Exception</div>
              <div v-if="!selectedRun.exception">
                No exceptions were detected in this job
              </div>
              <exception-view v-else :exceptions="exceptions"></exception-view>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
  <q-page class="items-center justify-evenly" v-else> Loading </q-page>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import api from 'src/utils/client/api';
import {
  JobException,
  JobRun,
  JobSignal,
  JobStatusStatus,
} from 'src/types/api';
import { useApi } from '../compostables/useApi';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import JobRunTimeline from 'components/JobRunTimeline.vue';
import ExceptionView from 'components/ExceptionView.vue';

dayjs.extend(localizedFormat);

const results = ref<JobRun | null>(null);

const tab = ref<string>('timeline');

const props = defineProps<{
  jobStatusId: number;
}>();

useApi((after) => {
  api
    .runShow(props.jobStatusId)
    .then((response: JobRun) => {
      results.value = response;
    })
    .finally(after);
});

// CANCELLING

const hasUnfinishedCancel = computed((): boolean => {
  if (selectedRun.value === null) {
    return false;
  }
  return (
    selectedRun.value?.signals.filter(
      (signal: JobSignal) => signal.cancel_job && signal.handled_at === null
    ).length > 0
  );
});

const cancelling = ref(false);

function cancel() {
  cancelling.value = true;
  api
    .signal(props.jobStatusId, 'cancel', true, {})
    .finally(() => (cancelling.value = false));
}

// RETRYING

const retrying = ref(false);

function retry() {
  retrying.value = true;
  api.retry(props.jobStatusId).finally(() => (retrying.value = false));
}

const exceptions = computed((): JobException[] => {
  let tempException = selectedRun.value?.exception;
  let exs = [];
  while (tempException !== null && tempException !== undefined) {
    exs.push(tempException);
    tempException = tempException.previous;
  }
  return exs;
});

interface ButtonOption {
  label?: string;
  value: string;
}

const retryId = ref<number | null>(null);

const selectedRun = computed((): JobRun | null => {
  let jobRun: JobRun | null = results.value;
  while (
    jobRun !== null &&
    jobRun.id.toString() !== retryId.value?.toString()
  ) {
    jobRun = jobRun.parent;
  }
  return jobRun;
});

const runTime = computed((): number => {
  if (selectedRun.value === null || selectedRun.value.started_at === null) {
    return 0;
  }
  if (selectedRun.value.finished_at === null) {
    return getDuration(selectedRun.value?.started_at, new Date(), false);
  }
  return getDuration(
    selectedRun.value.started_at,
    selectedRun.value.finished_at,
    true
  );
});

const queueTime = computed((): number => {
  if (selectedRun.value === null || selectedRun.value.created_at === null) {
    return 0;
  }
  if (selectedRun.value.started_at === null) {
    return getDuration(selectedRun.value?.created_at, new Date(), false);
  }
  return getDuration(
    selectedRun.value?.created_at,
    selectedRun.value.started_at,
    true
  );
});

function getDuration(
  startedAt: Date,
  finishedAt: Date | null | undefined = null,
  withDecimals: boolean = false
): number {
  if (finishedAt === null || finishedAt === undefined) {
    finishedAt = new Date();
  }
  return (
    Math.round(
      dayjs(finishedAt).diff(startedAt, 'seconds', withDecimals) * 10
    ) / 10
  );
}

const retryOptions = computed((): ButtonOption[] => {
  let jobs: JobRun[] = [];
  let jobRun: JobRun | null = results.value;
  while (jobRun !== null) {
    jobs.push(jobRun);
    jobRun = jobRun.parent;
  }
  return jobs.reverse().map((job, index) => {
    return {
      label: 'Run #' + (index + 1).toString(),
      value: job.id.toString(),
    };
  });
});

function viewRun(runId: number) {
  retryId.value = runId;
}

viewRun(props.jobStatusId);

function getHash(jobRun: JobRun): string {
  return jobRun.uuid;
}
</script>
