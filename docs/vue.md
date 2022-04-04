# Vue

We provide a `laravel-job-status` component you can import. This keeps the status up to date

```vue
<v-job-status :job="process-election" :tags="{election: electionId}">
    <template v-slot:default="{status, mostRecentMessage, complete, cancel}">
    
        <spinner v-if="complete === false"></spinner>
        <p>The status of the job is {{status}}</p>
        <p>{{mostRecentMessage}}</p>
        <v-button @click="cancel" type="danger">Cancel</v-button>
    
    </template>
</v-job-status>
```
