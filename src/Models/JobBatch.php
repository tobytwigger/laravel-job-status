<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use JobStatus\Database\Factories\JobBatchFactory;

/**
 * @property string $signal The signal that was sent to the job
 */
class JobBatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'batch_id', 'name',
    ];

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_batches');
        parent::__construct($attributes);
    }

    public function jobStatus()
    {
        return $this->hasMany(JobStatus::class, 'batch_id');
    }

    protected static function newFactory()
    {
        return JobBatchFactory::new();
    }
}
