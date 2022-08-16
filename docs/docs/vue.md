# Vue

## Example use

You will often want to mirror the status of specific jobs to the frontend. To help you with this, we've provided a `job-status` component.

This component takes the alias of a job, and any tags the job should match. It finds the latest of these jobs and passes the information to the default slot.

- `status` - the status of the job
- `lastMessage` - The last message sent
- `isComplete` - is the job complete
- `cancel` - Cancel the current job
- `signal('signal-name')` - Send a signal to the current job
- 
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

```vue
<template v-slot:empty="{loading}">
    Your name: <input type="text" :disabled="loading" />
    <button type="submit">Create user in the background</button>
</template>
```

## Keeping the data up to date

You can always use our backend and build your own frontend component. If you do decide to use ours, we keep the data up to date for you automatically

### Polling

Polling is the quickest way to keep the data up to date - every 5 seconds we'll make a call to your application to check on the status of a job.

To enable polling, pass `:method="polling"` to the job-status component.
