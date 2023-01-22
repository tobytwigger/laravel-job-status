<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Job Tracker
        </q-toolbar-title>

        <div>
          <a href="https://github.com/tobytwigger/laravel-job-status" style="color: white; text-decoration: none;">
            Version {{ version }}
          </a>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import {useConfig} from 'src/compostables/configuration';

const linksList = [
  {
    title: 'Dashboard',
    caption: 'Job dashboard.',
    icon: 'school',
    route: {name: 'dashboard'}
  },
  {
    title: 'Jobs',
    caption: 'All tracked jobs.',
    icon: 'school',
    route: {name: 'jobs.index'}
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false)


    return {
      version: useConfig().version,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
