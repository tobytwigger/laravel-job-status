# Messages

Messages are bits of text that contain information about what a job is doing. These let your users see informative information about the task being processed.

## Sending messages 

To send a message, you can call `$this->status()->line('3/10 emails sent.');` within your job.

You can also set a type on a message. A type is one of success, error, info (the default), warning or debug. Call `$this->status()->message('All emails sent successfully.', 'success')` to set a message with a type. There are also aliases you can use such as `successMessage`, `warningMessage` etc.

```php
class PlanRoute {
    public function handle() {
        $this->status()->line('Planning public transport route');
        $this->planner->planPublicTransportRoute();
        
        $this->status()->line('Planning driving route');
        $this->planner->planDrivingRoute();

        $this->status()->line('Planning cycling route');
        $this->planner->planCyclingRoute();

        $this->status()->line('Planning walking route');
        $this->planner->planWalkingRoute();

        $this->successMessage('All routes planned');
    }
}
```

