<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JobStatus\Database\Factories\JobStatusTagFactory;

/**
 * @property string $key The key of the tag
 * @property string $value The value of the tag
 */
class JobStatusTag extends Model
{
    use HasFactory;

    protected $fillable = [
        'key', 'value',
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

    protected static function newFactory()
    {
        return JobStatusTagFactory::new();
    }
}
