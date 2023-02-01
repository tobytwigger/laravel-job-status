# Vue

We've created a component for Vue 2 which will automatically update your users on the progress of a job.

## Installation

To install the frontend package, you can use `npm` or `yarn`.

```npm install --save @tobytwigger/laravel-job-status-vue```

```yarn add @tobytwigger/laravel-job-status-vue```

### Setup

You should then install the plugin in your `app.js` file.


```js
import Vue from 'vue';
import JobStatus from '@tobytwigger/laravel-job-status-vue';

Vue.use(JobStatus, {
    axios: axios, // An instance of the `axios` library that we can use to make API calls.
    url: '/_api' // The base URL to make the API calls to. This is set in the `config` of this package once [published](index.md), and defaults to `/_api`.
});
```

## Props

This component takes the alias of a job, and any tags the job should match. 

```vue
<job-status job="check-for-new-emails" :tags="{user: userId}">

</job-status>
```

## Slots

You can show the user different content based on the job status by using slots.

### Default

This slot is shown when a job status is being tracked.

- `status` - the status of the job. One of queued, started, succeeded, cancelled, or failed.
- `lastMessage` - The last message that was sent from the job.
- `isComplete` - Whether the job is complete
- `percentage` - The percentage the job has progressed
- `cancel` - A method to cancel the current job
- `signal('signal-name', cancelJob, parameters)` - A method to send a signal to the current job. Pass the name of the signal, an optional boolean defining whether the job should also be cancelled, and any parameters you want to pass to the signal handler.

```vue
<template v-slot:default="{status, lastMessage, complete, cancel, signal, percentage}">
    <spinner v-if="complete === false"></spinner>
    <p>The status of the job is {{status}}</p>
    <p>{{lastMessage}}</p>
    <v-button @click="cancel" type="danger">Cancel</v-button>
</template>
```

### Loading

The `loading` slot will show when we load the job status information. We'd recommend some sort of loading indicator here.

If you exclude this slot, it will instead show the `empty` slot and pass you a boolean if the job is loading or not.

This slot receives an `initialLoad` parameter, which signifies if the loading is the initial load (so it's likely there will be a status following shortly) or an update (so fewer changes are expected). This is useful for showing an initial loading screen without showing it during polling.

```vue
<template v-slot:loading="{initialLoad}">
    Your name: <input type="text" :disabled="initialLoad" />
    <button type="submit">Create user in the background</button>
</template>
```

### Errors

The `error` slot will show when the API returned an error, for example if your application is down.

```vue
<template v-slot:error="{message}">
    Sorry, something went wrong. {{message}}
</template>
```

### Empty

The `empty` slot shows if no job status was found. This usually occurs if the job matching the tags has never ran.

A 'loading' parameter lets you alter your slot content based on if the job status is loading or not, such as by disabling form inputs.

An `initialLoad` parameter is also passed, letting you show a proper loading screen (or disabling form inputs etc) when it's likely a job status will shortly be loaded. You can use it in conjunction with `loading` to indicate to the user when we're checking for updated without blocking access to the empty template.

```vue
<template v-slot:empty="{loading, initialLoad}">
    Your name: <input type="text" :disabled="initialLoad" />
    <v-small-spinner v-show="loading"></v-small-spinner>
    <button type="submit">Create user in the background</button>
</template>
```

## Keeping the data up to date

You can always use our backend and [build your own frontend component](./custom-frontend.md). If you do decide to use ours, we keep the data up to date for you automatically using one of the following methods.

### Polling

Polling is the easiest way to keep the data up to date - every 5 seconds we'll make a call to your application to check on the status of a job.

To enable polling, pass `:method="polling"` to the job-status component.

You can customise how frequently we poll by passing the number of milliseconds to wait between polls to the `poll-interval` prop. For a poll every second, you'd pass `:poll-interval=1000` to the job status component.

```vue
<job-status job="check-for-new-emails" :tags="{user: userId}" method="polling" :poll-interval="1500">
    <!--  Checking the job status every 1.5 seconds -->
</job-status>
```
