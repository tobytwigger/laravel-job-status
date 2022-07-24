<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Model;

class JobStatusTag extends Model
{

    protected $fillable = [
        'key', 'value'
    ];

    protected $casts = [];

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_tags');
        parent::__construct($attributes);
    }

    public function jobStatus()
    {
        return $this->belongsTo(JobStatus::class);
    }

}
