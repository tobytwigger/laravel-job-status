<template>
  <q-page class="row items-center justify-evenly">

    Result: {{apiResult}}

    <button @click="loadApi">
      Load API
    </button>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta } from 'components/models';
import { defineComponent, ref, reactive } from 'vue';
import JobStatusClient from './../core/core/JobStatusClient';

export default defineComponent({
  name: 'IndexPage',
  setup () {
      const apiResult = reactive({ api: [] });

      const client = JobStatusClient.createInstance(options.url, options.axios);

      function loadApi() {
        apiResult.api = ['test'];
        // Make the API call
      }

      return {
        apiResult,
        loadApi
      }


    // const meta = ref<Meta>({
    //   totalCount: 1200
    // });
    // return { todos, meta };
  }
});
</script>
