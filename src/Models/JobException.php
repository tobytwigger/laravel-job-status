<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JobStatus\Database\Factories\JobStatusStatusFactory;
use JobStatus\Enums\Status;

class JobException extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'stack_trace',
        'previous_id',
        'line',
        'file',
        'code'
    ];

    protected $casts = [
        'stack_trace' => 'array',
        'line' => 'integer',
        'code' => 'integer'
    ];

    protected $dateFormat = 'Y-m-d H:i:s.v';

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_exceptions');
        parent::__construct($attributes);
    }

    public function jobStatus()
    {
        return $this->hasOne(JobStatus::class, 'exception_id');
    }

    public function previous()
    {
        return $this->belongsTo(JobException::class, 'previous_id');
    }

    protected static function newFactory()
    {
        return JobStatusStatusFactory::new();
    }

}
