<template>
  <q-page class="row items-center justify-evenly">

    Result: {{apiResult}}

    <button @click="loadApi">
      Load API
    </button>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import api from 'src/utils/client/api';
import {dashboardResponse} from 'src/types/api';

export default defineComponent({
  name: 'IndexPage',
  setup () {
    let results: dashboardResponse|null = null;

    function loadApi() {
      api.dashboard()
        .then((response: dashboardResponse )=> {
          results = reactive(response);
        })
    }

    return {
      loadApi,
      results
    }


    // const meta = ref<Meta>({
    //   totalCount: 1200
    // });
    // return { todos, meta };
  }
});
</script>
