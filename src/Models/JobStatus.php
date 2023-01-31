<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use JobStatus\Database\Factories\JobStatusFactory;
use JobStatus\Enums\Status;
use JobStatus\Search\Collections\JobStatusCollection;

/**
 * @property Collection<JobStatusTag> $tags The tags that belong to the job
 * @property Status $status The status of the job
 * @property string $class The class of the job
 * @property string $alias The alias of the job
 * @property float $percentage The percentage of the way through the job we are
 *
 * whereUuid($uuid)
 * whereClass($class)
 *
 */
class JobStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'class', 'alias', 'percentage', 'status', 'uuid', 'job_id', 'connection_name', 'configuration', 'exception_id',
        'started_at', 'finished_at', 'public', 'batch_id',
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
            $jobStatus->exception()->delete();
            $jobStatus->batch()->delete();
        });

        static::saving(function (JobStatus $jobStatus) {
            if ($jobStatus->alias === null) {
                $jobStatus->alias = $jobStatus->class;
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


    public function scopeWhereUuid(Builder $query, string $uuid)
    {
        $query->where('uuid', $uuid);
    }

    public function scopeWhereClass(Builder $query, string $class)
    {
        $query->where('class', $class);
    }

    public function scopeWhereAlias(Builder $query, string $alias)
    {
        $query->where('alias', $alias);
    }

    public function scopeWhereTag(Builder $query, string $key, mixed $value)
    {
        $query->whereHas('tags', function (Builder $query) use ($key, $value) {
            $query->where(['key' => $key, 'value' => $value]);
        });
    }

    public function scopeWhereStatusIn(Builder $query, array $statuses)
    {
        $query->whereIn('status', $statuses);
    }

    public function scopeWhereStatusNotIn(Builder $query, array $statuses)
    {
        $query->whereNotIn('status', $statuses);
    }

    public function scopeWhereFinished(Builder $query)
    {
        $query->whereStatusIn([
            Status::FAILED, Status::SUCCEEDED, Status::CANCELLED,
        ]);
    }

    public function scopeWhereNotFinished(Builder $query)
    {
        $query->whereStatusIn([
            Status::QUEUED, Status::STARTED,
        ]);
    }

    public function scopeWhereTags(Builder $query, array $tags)
    {
        foreach ($tags as $key => $value) {
            $query->whereTag($key, $value);
        }
    }

    public function scopeForUsers(Builder $query, int|array|null $userIds)
    {
        if ($userIds === null) {
            $query->where('public', true);
        } else {
            $userIds = Arr::wrap($userIds);

            $query->where(function (Builder $query) use ($userIds) {
                $query->whereHas('users', function (Builder $query) use ($userIds) {
                    $query->whereIn('user_id', $userIds);
                })
                    ->orWhere('public', true);
            });
        }
    }

    public static function newFactory()
    {
        return JobStatusFactory::new();
    }

    /**
     * Create a new Eloquent Collection instance.
     *
     * @param JobStatus[] $models
     * @return JobStatusCollection
     */
    public function newCollection(array $models = [])
    {
        return new JobStatusCollection($models);
    }

    public function batch()
    {
        return $this->belongsTo(JobBatch::class, 'batch_id');
    }
}
