# Vue

## Example use

You will often want to mirror the status of specific jobs to the frontend. To help you with this, we've provided a `job-status` component.

This component takes the alias of a job, and any tags the job should match. It finds the latest of these jobs and passes the information to the default slot.

- `status` - the status of the job
- `lastMessage` - The last message sent
- `isComplete` - Is the job complete
- `percentage` - The percentage the job has progressed
- `cancel` - Cancel the current job
- `signal('signal-name')` - Send a signal to the current job

```vue
<job-status job="process-election" :tags="{election: electionId}">
    <template v-slot:default="{status, lastMessage, complete, cancel, signal}">
    
        <spinner v-if="complete === false"></spinner>
        <p>The status of the job is {{status}}</p>
        <p>{{lastMessage}}</p>
        <v-button @click="cancel" type="danger">Cancel</v-button>
    
    </template>
</job-status>
```

## Slots

The default slot is used to show information about the job. All the attributes given are listed above.

We provide other slots to give your users as smooth an experience as possible.

**Loading**

The `loading` slot will show when we load the job status information. We'd recommend some sort of loading indicator here.

If you exclude this slot, it will instead show the `empty` slot and pass you a boolean if the job is loading or not.

This slot receives an `initialLoad` parameter, which signifies if the loading is the initial load (so it's likely there will be a status following shortly) or an update (so fewer changes are expected). This is useful for showing an initial loading screen without showing it during polling.

```vue
<template v-slot:loading="{initialLoad}">
    Your name: <input type="text" :disabled="initialLoad" />
    <button type="submit">Create user in the background</button>
</template>
```

**Errors**

The `error` slot will show when the API returned an error, for example if your application is down.

```vue
<template v-slot:error="{message}">
    Sorry, something went wrong. {{message}}
</template>
```

**Empty**

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

You can always use our backend and build your own frontend component. If you do decide to use ours, we keep the data up to date for you automatically

### Polling

Polling is the quickest way to keep the data up to date - every 5 seconds we'll make a call to your application to check on the status of a job.

To enable polling, pass `:method="polling"` to the job-status component.

You can customise how frequently we poll by passing the number of milliseconds to wait between polls to the `poll-interval` prop. For a poll every second, you'd pass `:poll-interval=1000` to the job status component.
