<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Model;

class JobStatusStatus extends Model
{

    protected $fillable = [
        'status'
    ];

    protected $casts = [];

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses');
        parent::__construct($attributes);
    }

    public function jobStatus()
    {
        return $this->belongsTo(JobStatus::class);
    }

}
