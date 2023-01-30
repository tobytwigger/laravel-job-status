<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JobStatus\Database\Factories\JobStatusUserFactory;

/**
 * @property string $key The key of the tag
 * @property string $value The value of the tag
 */
class JobStatusUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'job_status_id',
    ];

    protected $casts = [];

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_users');
        parent::__construct($attributes);
    }

    public function jobStatus()
    {
        return $this->belongsTo(JobStatus::class);
    }

    protected static function newFactory()
    {
        return new JobStatusUserFactory();
    }
}
