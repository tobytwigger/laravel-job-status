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
use JobStatus\Search\Result\JobRun;

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

    const INDEXLESS_VALUE = 'JOB_STATUS_MODEL_INDEXLESS';

    protected $fillable = [
        'class', 'alias', 'percentage', 'status', 'uuid', 'job_id', 'connection_name', 'exception_id',
        'started_at', 'finished_at', 'is_unprotected', 'batch_id', 'queue', 'payload',
    ];

    protected $casts = [
        'is_unprotected' => 'boolean',
        'percentage' => 'float',
        'updated_at' => 'datetime:Y-m-d H:i:s',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'status' => Status::class,
        'started_at' => 'datetime',
        'finished_at' => 'datetime',
        'payload' => 'array',
    ];

    protected $with = [
        'statuses', 'tags', 'signals', 'messages', 'exception', 'batch', 'exception.previous', 'users',
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

    public function scopeWhereQueue(Builder $query, string $queue)
    {
        $query->where('queue', $queue);
    }

    public function scopeWithCustomOrder(Builder $query, string $sortBy, string $sortByDirection)
    {
        $query->orderBy(
            $sortBy,
            $sortByDirection
        );
    }

    public function scopeWhereTag(Builder $query, string $key, mixed $value = JobStatus::INDEXLESS_VALUE)
    {
        $query->whereHas('tags', function (Builder $query) use ($key, $value) {
            if ($value === JobStatus::INDEXLESS_VALUE) {
                $query->where(['key' => $key, 'value' => null, 'is_indexless' => true]);
            } else {
                $query->where(['key' => $key, 'value' => $value, 'is_indexless' => false]);
            }
        });
    }

    public function scopeWhereHasTag(Builder $query, string $key)
    {
        $query->whereHas('tags', function (Builder $query) use ($key) {
            $query->where(['key' => $key]);
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
        $query->whereStatusIn(Status::getFinishedStatuses());
    }

    public function scopeWhereNotFinished(Builder $query)
    {
        $query->whereStatusIn(Status::getUnfinishedStatuses());
    }

    public function scopeWhereTags(Builder $query, array $tags)
    {
        foreach ($tags as $key => $value) {
            if (is_numeric($key)) {
                $query->whereTag($value);
            } else {
                $query->whereTag($key, $value);
            }
        }
    }

    public function scopeWhereHasTags(Builder $query, array $tags)
    {
        foreach ($tags as $value) {
            $query->whereHasTag($value);
        }
    }

    public function scopeForUsers(Builder $query, int|array|null $userIds)
    {
        if ($userIds === null || empty($userIds)) {
            $query->where('is_unprotected', true);
        } else {
            $userIds = Arr::wrap($userIds);

            $query->where(function (Builder $query) use ($userIds) {
                $query->whereHas('users', function (Builder $query) use ($userIds) {
                    $query->whereIn('user_id', $userIds);
                })
                    ->orWhere('is_unprotected', true);
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

    public function toRun(): JobRun
    {
        return new JobRun($this);
    }
}
