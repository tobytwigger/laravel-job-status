# Custom frontend

We supply integrations for Vue, but if you use Vue 3, React or any other javascript framework you can easily build your own component.

## Get tracking data

In the vue package, there is a `JobStatusObserver` class that will let you keep your component up to date with the latest information.

### Event Listeners

```js
let jobStatusObserver = new JobStatusObserver('publish-package', {packageId: 'laravel-job-status'});

this.jobStatusObserver
    .poll(5000) // Poll every five seconds
    .onUpdated((jobStatus) => {}) 
    .onError(({message}) => {}) 
    .onLoading(() => {})
    .onFinishedLoading(() => {});
```

- `onUpdated` is called whenever the job status is updated
- `onError` is called when an error occured getting a job status
- `onLoading` is called when the job starts to check for an update
- `onFinishedLoading` is called when the job finishes checking for an update

### Initial run

You should call `this.jobStatusObserver.update()` when your component starts listening, otherwise you'll have to wait for the first poll to take place.

### Clean up

When your component is destroyed, you should call `this.jobStatusObserver.cleanup()` to step any listeners.
