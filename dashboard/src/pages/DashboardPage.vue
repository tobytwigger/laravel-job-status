<template>
  <q-page class="justify-evenly">
<!--    Result: {{ apiResult }}-->
<!---->
<!--    <button @click="loadApi">Load API</button>-->
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import api from 'src/utils/client/api';
import { DashboardResponse } from 'src/types/api';

export default defineComponent({
  name: 'DashboardPage',
  setup() {
    let results: DashboardResponse | null = null;

    function loadApi() {
      // api.dashboard().then((response: DashboardResponse) => {
      //   results = reactive(response);
      // });
    }

    return {
      // loadApi,
      results,
    };

    // const meta = ref<Meta>({
    //   totalCount: 1200
    // });
    // return { todos, meta };
  },
});
</script>
