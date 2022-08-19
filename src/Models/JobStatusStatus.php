<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JobStatus\Database\Factories\JobStatusStatusFactory;

/**
 * @property JobStatus $jobStatus The job status the status belongs to
 * @property string $status The status of the job
 */
class JobStatusStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
    ];

    protected $casts = [];

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses');
        parent::__construct($attributes);
    }

    protected static function booted()
    {
        static::created(function (JobStatusStatus $model) {
            $status = $model->jobStatus;
            $status->status = $model->status;
            $status->save();
        });
    }

    public function jobStatus()
    {
        return $this->belongsTo(JobStatus::class);
    }

    protected static function newFactory()
    {
        return JobStatusStatusFactory::new();
    }
}
