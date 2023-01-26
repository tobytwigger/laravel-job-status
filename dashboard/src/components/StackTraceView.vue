<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Stack Trace</div>
    </q-card-section>
    <q-card-actions v-if="props.stackTraces.length > 1">
      <q-btn flat
             v-if="indexToView !== null && indexToView !== undefined && indexToView < (props.stackTraces.length - 1)"
             @click="indexToView++">Previous exception
      </q-btn>
      <q-space></q-space>
      <q-btn flat color="secondary" v-if="indexToView !== null && indexToView !== undefined && indexToView !== 0"
             @click="indexToView--">Next exception
      </q-btn>
    </q-card-actions>

    <q-card-section class="q-pt-none" v-if="stackTrace !== null">
      <q-list>
        <q-item v-for="(trace, index) in stackTrace.stack_trace" :key="index">
          <q-item-section side top>
            <q-item-label caption>#{{ index }}</q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ trace.file }}::{{ trace.line }}</q-item-label>
            <q-item-label caption lines="2">{{ trace.class }}{{ trace.type }}{{ trace.function }}</q-item-label>
          </q-item-section>


        </q-item>

        <q-separator spaced inset/>
      </q-list>
    </q-card-section>
    <q-card-section class="q-pt-none" v-else>
      No stack trace found
    </q-card-section>


    <q-card-actions align="right">
      <q-btn flat label="Close" color="primary" v-close-popup/>
    </q-card-actions>
  </q-card>
</template>p

<script setup lang="ts">
import {computed, defineProps, onMounted, ref} from "vue";
import {StackTrace} from "src/types/api";

const props = defineProps<{
  stackTraces: StackTrace[]
}>();

const indexToView = ref<null | number>();

onMounted(() => {
  if (props.stackTraces.length > 0) {
    indexToView.value = 0;
  }
})

const stackTrace = computed((): StackTrace | null => {
  if (indexToView.value !== null && indexToView.value !== undefined) {
    return props.stackTraces[indexToView.value]
  }
  return null;
});
</script>

<style scoped>

</style>
