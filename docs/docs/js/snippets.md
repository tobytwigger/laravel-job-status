# JS Examples

Since there are so many ways to use the job status API, we don't provide a Vue component or specific framework integrations. However, you can use the js tool in any js framework.

This page has some snippets you can use to integrate job tracking with your Vue app.

## Show the user the progress of a podcast being uploaded

A user uploads a podcast, and we show them the progress of it being uploaded

=== "Vue 2"

    ```vue
    <template>
        <div v-if="initialLoadOngoing">Loading...</div>
        <div v-else-if="run !== null">
            <div v-if="updating">Updating...</div>
            <div>Podcast status: {{run.status}}</div>
            <div>{{run.percentage}}% complete</div>
            <div v-if="run.messages.length > 0">
                <div>{{Upload Feedback: {{run.messages[run.messages.length - 1]}} |  </div>
            </div>
        </div>
        <div v-else>Please upload a podcast</div>
    </template>
    
    <script>
        import {client} from '@tobytwigger/laravel-job-status-js';
        
        export default {
            data() {
                return {
                    initialLoadOngoing: false,
                    updating: false,
                    run: null,
                    listenerId: null
                };
            },
            mounted() {
                this.listenerId = client.jobs.show('upload-podcast')
                    .listen()
                    .onStartingInitialLoad(() => this.initialLoadOngoing = true)
                    .onFinishingInitialLoad(() => this.initialLoadOngoing = false)
                    .onStartingUpdate(() => this.updating = true)
                    .onFinishingUpdate(() => this.updating = false)
                    .onUpdated(newRun => this.run = newRun)
                    .onErrored(error => console.log(error))
                    .start();
            },
            beforeUnmount() {
                client.cleanup(this.listenerId);
            }
        }
    </script>
    ```


## Seeing the progress of a sync (multiple jobs)

We want to show a user how all the 'Sync your cycle ride' jobs are progressing

=== "Vue 2"

    ```vue
    <template>
        <div v-if="initialLoadOngoing">Loading...</div>
        <div v-else-if="job !== null">
            <div v-if="updating">Updating...</div>
            <div>Queued: {{jobSummary.queued}}</div>
            <div>Running: {{jobSummary.started}}</div>
            <div>Finished: {{jobSummary.succeeded}}</div>
            <div>Cancelled: {{jobSummary.cancelled}}</div>
            <div>Failed: {{jobSummary.failed}}</div>
        </div>
    </template>
    
    <script>
        import {client} from '@tobytwigger/laravel-job-status-js';
        
        export default {
            data() {
                return {
                    initialLoadOngoing: false,
                    updating: false,
                    job: null,
                    listenerId: null
                };
            },
            mounted() {
                this.listenerId = client.jobs.show('upload-podcast')
                    .forUser(user().id)
                    .listen()
                    .onStartingInitialLoad(() => this.initialLoadOngoing = true)
                    .onFinishingInitialLoad(() => this.initialLoadOngoing = false)
                    .onStartingUpdate(() => this.updating = true)
                    .onFinishingUpdate(() => this.updating = false)
                    .onUpdated(newJob => this.job = newJob)
                    .onErrored(error => console.log(error))
                    .start();
            },
            beforeUnmount() {
                client.cleanup(this.listenerId);
            },
            computed: {
                jobSummary() {
                    let statuses = {queued: 0, started: 0, failed: 0, succeeded: 0, cancelled: 0};
                    for(let run in this.job.runs) {
                        statuses[run.status] += 1;
                    }
                    return statuses;
                }
            }
        }
    </script>
    ```
