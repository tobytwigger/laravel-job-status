<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class JobSignal extends Model
{

    protected $fillable = [
        'signal', 'handled_at', 'parameters', 'cancel_job'
    ];

    protected $casts = [
        'parameters' => 'array',
        'cancel_job' => 'boolean',
        'handled_at' => 'datetime'
    ];

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_signals');
        parent::__construct($attributes);
    }

    public static function scopeUnread(Builder $query)
    {
        $query->whereNull('handled_at');
    }

    public function jobStatus()
    {
        return $this->belongsTo(JobStatus::class);
    }

}
