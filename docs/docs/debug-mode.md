# Debug Mode

Depending on what you want to use your jobs for, you can either set up a scheduled command to remove any old jobs you no longer want to track, or keep the information to use for a debug mode.

## Scheduled Command

Add this to your schedule to auto remove any old jobs that have finished processing. Pass a `--after=2` to mark how many hours to keep jobs around before removing them. 2 will delete any jobs that finished processing more than 2 hours ago.

`$schedule->command('job-status:truncate --after=1)->hourly();`.

## Debug Mode

If you turn on debug mode you can see more information about each job, such as the runtime, These are saved in the database and can be accessed through the status model.

`$status->debug()->getRuntime()`.

You can see the runtime between each percentage increase if you use percentages.
