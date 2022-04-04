# Vue

## Intro

You will often want to mirror the status of specific jobs to the frontend. To help you with this, we've provided a `laravel-job-status` component.

This component takes the alias of a job, and any tags the job should match. It finds the latest of these jobs and passes the information to the default slot.

- `status` - the status of the job
- `lastMessage` - The last message sent
- `isComplete` - is the job complete
- `cancel` - Cancel the current job
- `signal('signal-name')` - Send a signal to the current job
- 
```vue
<v-job-status job="process-election" :tags="{election: electionId}">
    <template v-slot:default="{status, lastMessage, complete, cancel, signal}">
    
        <spinner v-if="complete === false"></spinner>
        <p>The status of the job is {{status}}</p>
        <p>{{lastMessage}}</p>
        <v-button @click="cancel" type="danger">Cancel</v-button>
    
    </template>
</v-job-status>
```

## Updating data

There are three ways to update this data.

- The first is to have it update whenever the page loads - this will always happen.
- The second is to poll the API. To do this pass in `:polling="true"` to the laravel status component.
- The third is to use webhooks. If you have webhooks set up using Laravel Echo we will automatically fire and broadcast events from your application to your Vue component and keep the data up to date.
