<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Model;

class JobMessage extends Model
{

    const ALLOWED_TYPES = [
        'info', 'success', 'error', 'warning', 'debug'
    ];

    protected $fillable = [
        'message', 'type'
    ];

    protected $casts = [];

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages');
        parent::__construct($attributes);
    }

    public function jobStatus()
    {
        return $this->belongsTo(JobStatus::class);
    }

}
