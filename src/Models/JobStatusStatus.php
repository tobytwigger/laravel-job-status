<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JobStatus\Database\Factories\JobStatusStatusFactory;
use JobStatus\Enums\Status;

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

    protected $casts = [
        'status' => Status::class,
    ];

    protected $dateFormat = 'Y-m-d H:i:s.v';

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses');
        parent::__construct($attributes);
    }

    protected static function booted()
    {
        static::creating(fn (JobStatusStatus $jobStatus) => config('laravel-job-status.collectors.status_history.enabled', true));
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
