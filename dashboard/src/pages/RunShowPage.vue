<template>
  <q-page class="row items-center justify-evenly" v-if="results !== null">
    <q-banner class="bg-primary text-white" v-if="results.parent !== null">
      This job was dispatched by another when it failed.
      <template v-slot:action>
        <q-btn flat color="white" label="View parent job"
               :to="{path: '/run/' + results.parent.id}"/>
      </template>
    </q-banner>

    <q-list bordered separator>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>{{ results.alias }}</q-item-label>
          <q-item-label caption>Alias</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>{{ results.class }}</q-item-label>
          <q-item-label caption>Class</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>{{ results.status }}</q-item-label>
          <q-item-label caption>Status</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>{{ results.uuid }}</q-item-label>
          <q-item-label caption>Uuid</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>{{ results.tags }}</q-item-label>
          <q-item-label caption>Tags</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>{{ results.percentage }}</q-item-label>
          <q-item-label caption>Percentage</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label>{{ results.created_at }}</q-item-label>
          <q-item-label caption>Dispatched At</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-card>
      <q-tabs v-model="tab"
              class="text-teal"
      >
        <q-tab name="messages" icon="mail" label="Messages"/>
        <q-tab name="signals" icon="alarm" label="Signals"/>
        <q-tab name="statuses" icon="movie" label="Status History"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="messages">
          <div class="text-h6">Messages</div>
          <q-timeline color="secondary">
            <q-timeline-entry
              v-for="message in results.messages"
              :key="message.id"
              :title="message.type"
              :subtitle="dayjs(message.created_at).format('L LTS')"
            >
              <div>
                {{message.message}}
              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-tab-panel>

        <q-tab-panel name="signals">
          <div class="text-h6">Signals</div>
          <q-timeline color="secondary">
            <q-timeline-entry
              v-for="signal in results.signals"
              :key="signal.id"
              :title="signal.signal"
              :subtitle="signal.cancel_job ? 'Job stopped' : 'Job continued'"
            >
              <div>
                {{signal.parameters}}.
                <q-list bordered separator>
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>{{ signal.parameters }}</q-item-label>
                      <q-item-label caption>Parameters</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>{{ dayjs(signal.created_at).format('L LTS') }}</q-item-label>
                      <q-item-label caption>Sent at</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>
                      <q-item-label>{{ dayjs(signal.handled_at).format('L LTS') }}</q-item-label>
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
              v-for="status in results.statuses"
              :key="status.id"
              :title="status.status"
              :subtitle="dayjs(status.created_at).format('L LTS')"
            >
              <div>

              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
  <q-page class="row items-center justify-evenly" v-else>
    Loading
  </q-page>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import api from 'src/utils/client/api';
import {JobRun} from 'src/types/api';
import {useApi} from "../compostables/useApi";
import TrackedRunListItem from "components/TrackedRunListItem.vue";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

const results = ref<JobRun | null>(null);

const tab = ref<string>('messages');

const props = defineProps<{
  jobStatusId: number
}>();

useApi((after) => {
  api.runShow(props.jobStatusId)
    .then((response: JobRun) => results.value = response)
    .finally(after);
})

function getHash(jobRun: JobRun): string {
  return jobRun.uuid;
}

</script>
