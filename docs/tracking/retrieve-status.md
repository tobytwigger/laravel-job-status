- How to get a status model. Using eloquent, or directly through the job.
  - JobStatus::forJob(Job::class) or alias.
  - ->first or ->get
  - ->whereJob('x', '=', '5') // Limiting to conditions. This should refer to a 'job conditions' table.
  - ->whereStatus()
  - ->successful()
  - ->failed();
  - Getting many or one
  - Collection methods
  - finishedCount()
  - ->successfulCount()

Getting the status
- ->getStatus()
- ->wasSuccessful()
- ->hasFinished()
