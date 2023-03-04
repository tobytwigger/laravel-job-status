<template>
  <span>
    <!--    <q-chip v-if="props.count === 0" dense>-->
    <!--      <q-avatar :color="color" text-color="white">{{ props.count }}</q-avatar>-->
    <!--      {{ props.label }}-->
    <!--    </q-chip>-->
    <q-chip dense :color="props.color" text-color="white">
      <span>
        {{ props.label }}
        &nbsp;
        <span v-for="index in props.count.toString().length" :key="index">
          &nbsp;
        </span>
        <q-badge color="orange" floating>
          {{ props.count }}
        </q-badge>
      </span>
      <q-tooltip>
        {{ props.count }}
      </q-tooltip>
    </q-chip>
  </span>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  count: number;
  label: string;
  color: string;
}>();
</script>

<style scoped>
.spaced-avatar > div {
  color: yellow;
  overflow: visible !important;
}
</style>
