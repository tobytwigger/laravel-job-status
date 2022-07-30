<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JobStatus\Database\Factories\JobStatusStatusFactory;

class JobStatusStatus extends Model
{
    use HasFactory;

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

    protected static function newFactory()
    {
        return JobStatusStatusFactory::new();
    }

}
