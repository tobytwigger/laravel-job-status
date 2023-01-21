<template>
  <q-page class="row items-center justify-evenly">


    <q-list bordered class="rounded-borders" style="max-width: 600px">
      <q-item-label header>All Jobs</q-item-label>

      <q-item >
        <q-item-section avatar top>
          <q-icon name="account_tree" color="black" size="34px" />
        </q-item-section>

        <q-item-section top class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">GitHub</q-item-label>
        </q-item-section>

        <q-item-section top>
          <q-item-label lines="1">
            <span class="text-weight-medium">[quasarframework/quasar]</span>
            <span class="text-grey-8"> - GitHub repository</span>
          </q-item-label>
          <q-item-label caption lines="1">
            @rstoenescu in #3: > Generic type parameter for props
          </q-item-label>
          <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
            <span class="cursor-pointer">Open in GitHub</span>
          </q-item-label>
        </q-item-section>

        <q-item-section top side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
            <q-btn size="12px" flat dense round icon="more_vert" />
          </div>
        </q-item-section>
      </q-item>

    <div>
      {{results}}
    </div>

    <button @click="loadApi">
      Load API
    </button>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import api from 'src/utils/client/api';
import {results} from 'src/types/api';

export default defineComponent({
  name: 'JobListPage',
  setup () {

      // const client = JobStatusClient.createInstance(options.url, options.axios);

    const results = ref<results|null>(null);

    let loading = true;

      function loadApi() {
        loading = true;
        api.jobList()
          .then((response: results )=> {
            results.value = response;
            console.log(response);
        })
          .finally(() => {
            loading = false;
          })
      }

      return {
        loadApi,
        results,
        loading
      }


    // const meta = ref<Meta>({
    //   totalCount: 1200
    // });
    // return { todos, meta };
  }
});
</script>
