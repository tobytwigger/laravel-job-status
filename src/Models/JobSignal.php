<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JobStatus\Database\Factories\JobSignalFactory;

/**
 * @property string $signal The signal that was sent to the job
 */
class JobSignal extends Model
{
    use HasFactory;

    protected $fillable = [
        'signal', 'handled_at', 'parameters', 'cancel_job', 'job_status_id',
    ];

    protected $casts = [
        'parameters' => 'array',
        'cancel_job' => 'boolean',
        'handled_at' => 'datetime',
    ];

    protected $dateFormat = 'Y-m-d H:i:s.v';

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_signals');
        parent::__construct($attributes);
    }

    protected static function booted()
    {
        static::creating(fn (JobSignal $jobSignal) => config('laravel-job-status.collectors.signals.enabled', true));
    }

    public static function scopeUnhandled(Builder $query)
    {
        $query->whereNull('handled_at');
    }

    public function jobStatus()
    {
        return $this->belongsTo(JobStatus::class);
    }

    protected static function newFactory()
    {
        return JobSignalFactory::new();
    }
}
