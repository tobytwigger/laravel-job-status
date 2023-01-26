<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JobStatus\Database\Factories\JobStatusStatusFactory;
use JobStatus\Enums\Status;

class JobStackTrace extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_message_id',
        'stack_trace'
    ];

    protected $casts = [
        'stack_trace' => 'array'
    ];

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_stack_traces');
        parent::__construct($attributes);
    }

    public function message()
    {
        return $this->belongsTo(JobMessage::class, 'job_message_id');
    }

    protected static function newFactory()
    {
        return JobStatusStatusFactory::new();
    }

}
