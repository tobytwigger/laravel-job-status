<template>
  <span>
    <q-chip v-if="props.count === 0" dense>
      <q-avatar :color="color" text-color="white">{{ props.count }}</q-avatar>
      {{ props.label }}
    </q-chip>
    <q-chip v-else dense :color="props.color" text-color="white">
      <q-avatar :color="color" text-color="white"></q-avatar>
      <span>{{ props.label }}</span>
       <q-tooltip>
        {{ props.count }}
       </q-tooltip>
    </q-chip>
  </span>
</template>

<script setup lang="ts">
import {defineProps} from 'vue';

const props = defineProps<{
  count: number;
  label: string;
  color: string;
}>();
</script>

<style scoped></style>
