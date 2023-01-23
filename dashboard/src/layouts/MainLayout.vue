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

      <q-banner class="bg-warning text-black" v-if="!assets_in_date">
        The assets are not in date, which makes this site unstable. Run `artisan job:install` to update them.
      </q-banner>

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
    icon: 'dashboard',
    route: {path: '/dashboard'}
  },
  {
    title: 'Jobs',
    caption: 'All tracked jobs.',
    icon: 'list',
    route: {path: '/jobs'}
  },
  {
    title: 'History',
    caption: 'A list of all runs your queue worker has made.',
    icon: 'manage_search',
    route: {path: '/history'}
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
      assets_in_date: useConfig().assets_in_date,
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
