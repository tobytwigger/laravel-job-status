<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use JobStatus\Database\Factories\JobStatusFactory;
use JobStatus\Enums\Status;

/**
 * @property Collection<JobStatusTag> $tags The tags that belong to the job
 * @property Status $status The status of the job
 * @property string $job_class The class of the job
 * @property string $job_alias The alias of the job
 * @property float $percentage The percentage of the way through the job we are
 */
class JobStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_class', 'job_alias', 'percentage', 'status', 'uuid', 'job_id', 'connection_name', 'configuration', 'exception_id',
        'started_at', 'finished_at', 'public',
    ];

    protected $casts = [
        'public' => 'boolean',
        'percentage' => 'float',
        'updated_at' => 'datetime:Y-m-d H:i:s',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'status' => Status::class,
        'configuration' => 'array',
        'started_at' => 'datetime',
        'finished_at' => 'datetime',
    ];

    protected $dateFormat = 'Y-m-d H:i:s.v';

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses');
        parent::__construct($attributes);
    }

    protected static function booted()
    {
        static::deleting(function (JobStatus $jobStatus) {
            $jobStatus->statuses()->delete();
            $jobStatus->tags()->delete();
            $jobStatus->signals()->delete();
            $jobStatus->messages()->delete();
        });

        static::saving(function (JobStatus $jobStatus) {
            if ($jobStatus->job_alias === null) {
                $jobStatus->job_alias = $jobStatus->job_class;
            }
        });
    }

    public function messages()
    {
        return $this->hasMany(JobMessage::class);
    }

    public function exception()
    {
        return $this->belongsTo(JobException::class, 'exception_id');
    }

    public function signals()
    {
        return $this->hasMany(JobSignal::class);
    }

    public function tags()
    {
        return $this->hasMany(JobStatusTag::class);
    }

    public function statuses()
    {
        return $this->hasMany(JobStatusStatus::class);
    }

    public function users()
    {
        return $this->hasMany(JobStatusUser::class);
    }

    public static function newFactory()
    {
        return JobStatusFactory::new();
    }
}
