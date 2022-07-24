<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Model;

class JobSignal extends Model
{

    protected $fillable = [
        'signal'
    ];

    protected $casts = [

    ];

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_signals');
        parent::__construct($attributes);
    }

    public function jobStatus()
    {
        return $this->belongsTo(JobStatus::class);
    }

}
