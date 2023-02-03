<template>
  <q-card v-if="exception !== null">
    <q-card-actions v-if="props.exceptions.length > 1">
      <q-btn
        flat
        v-if="
          indexToView !== null &&
          indexToView !== undefined &&
          indexToView < props.exceptions.length - 1
        "
        @click="indexToView++"
        >Previous exception
      </q-btn>
      <q-space></q-space>
      <q-btn
        flat
        v-if="
          indexToView !== null && indexToView !== undefined && indexToView !== 0
        "
        @click="indexToView--"
        >Next exception
      </q-btn>
    </q-card-actions>

    <q-card-section>
      <div class="text-h6">{{ exception.code }} | {{ exception.message }}</div>
      <div class="text-subtitle2">
        {{ exception.file }}:{{ exception.line }}
      </div></q-card-section
    >

    <q-card-section class="q-pt-none">
      <q-list>
        <q-item v-for="(trace, index) in exception.stack_trace" :key="index">
          <q-item-section side top>
            <q-item-label caption>#{{ index }}</q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ trace.file }}:{{ trace.line }}</q-item-label>
            <q-item-label caption lines="2"
              >{{ trace.class }}{{ trace.type
              }}{{ trace.function }}</q-item-label
            >
          </q-item-section>
        </q-item>

        <q-separator spaced inset />
      </q-list>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Close" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
  <q-card v-else>
    <q-card-section class="q-pt-none"> No exception found </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="Close" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { computed, defineProps, onMounted, ref } from 'vue';
import { JobException } from 'src/types/api';

const props = defineProps<{
  exceptions: JobException[];
}>();

const indexToView = ref<null | number>();

onMounted(() => {
  if (props.exceptions.length > 0) {
    indexToView.value = 0;
  }
});

const exception = computed((): JobException | null => {
  if (indexToView.value !== null && indexToView.value !== undefined) {
    return props.exceptions[indexToView.value];
  }
  return null;
});
</script>

<style scoped></style>
