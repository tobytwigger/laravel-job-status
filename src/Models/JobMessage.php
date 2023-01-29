<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JobStatus\Database\Factories\JobMessageFactory;
use JobStatus\Enums\MessageType;

class JobMessage extends Model
{
    use HasFactory;

    const ALLOWED_TYPES = [
        'info', 'success', 'error', 'warning', 'debug',
    ];

    protected $fillable = [
        'message', 'type',
    ];

    protected $casts = [
        'type' => MessageType::class,
    ];

    protected $dateFormat = 'Y-m-d H:i:s.v';

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_messages');
        parent::__construct($attributes);
    }

    public function jobStatus()
    {
        return $this->belongsTo(JobStatus::class);
    }

    protected static function newFactory()
    {
        return JobMessageFactory::new();
    }
}
