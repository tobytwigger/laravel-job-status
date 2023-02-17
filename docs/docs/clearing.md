# Pruning Jobs

If you have a lot of jobs, there's a potential for a lot of data to be collected.

You should regularly prune this data. We provide a command to make this easy, but you should schedule it according to your needs.

## Prune command

To prune all your jobs, run `artisan job-status:clear`.

You can keep any job that's been updated recently. Pass in the `--preserve` option with the number of hours of jobs to keep.

```bash
# Preserve the last 6 hours of jobs
artisan job-status:clear --preserve=6
```

### Keeping failed jobs

It is useful to keep failed jobs for longer than successful jobs, so you can debug any problems. With `--keep-failed` flag you can make sure no failed jobs are deleted.

### Trimming or deleting jobs

To help build up analytics of your jobs, preserving more data is beneficial.

To keep a high level overview of your job history, you can choose to just delete additional information about every job. This will remove information about messages, signals and past statuses, whilst preserving the core data. You will still be able to see the jobs contribution to your job insights, but will not be able to view the full job history.

To turn on trimming, pass the `--trim` flag to the command.

### Wipe all data

When developing `laravel-job-status`, or for other reasons - you might want to wipe all job status data from your database.

To do this, pass the option `--all`, this will remove all constraints when searching for job status data to prune.

## Scheduling the command

Often your real use case is more complex than the above examples. We may want to preserve a week of analytics at a time, and preserve failed jobs until you can debug them, but otherwise limit the stored data.

To achieve this, we can schedule a combination of commands.

```php
// Trim any successful job older than 6 hours.
$schedule->command('job-status:clear --preserve=6 --keep-failed --trim')->everyFifteenMinutes();
// Trim any failed job older than 2 days.
$schedule->command('job-status:clear --preserve=48 --trim');
// Delete all jobs older than 1 week.
$schedule->command('job-status:clear --preserve=168');
```
