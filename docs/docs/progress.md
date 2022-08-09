# Progress

For very long running jobs, you can track how far through the process your job is by regularly setting a percentage completion.

Use `$this->percentage(55);` in the job to change the percentage of a job. It will change to 100 automatically when you complete the job.

When you have a status model, call `$status->getPercentage()` to get the percentage.
