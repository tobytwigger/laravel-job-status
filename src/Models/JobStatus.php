<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use JobStatus\Database\Factories\JobStatusFactory;
use JobStatus\JobStatusCollection;

class JobStatus extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_class', 'job_alias', 'run_count', 'percentage'
    ];

    protected $casts = [
        'run_count' => 'integer',
        'percentage' => 'float'
    ];

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses');
        parent::__construct($attributes);
    }

    public function getTagsAsArray()
    {
        return $this->tags->mapWithKeys(fn(JobStatusTag $tag) => [$tag->key => $tag->value])->toArray();
    }

    public function messages()
    {
        return $this->hasMany(JobMessage::class);
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

    public static function scopeForJob(Builder $query, string $class)
    {
        $query->where('job_class', $class);
    }

    public static function scopeForJobAlias(Builder $query, string $class)
    {
        $query->where('job_alias', $class);
    }

    public static function scopeWhereTag(Builder $query, string $key, mixed $value)
    {
        $query->whereHas('tags', function(Builder $query) use ($key, $value) {
            $query->where(['key' => $key, 'value' => $value]);
        });
    }

    public static function scopeWhereStatus(Builder $query, string $status)
    {
        $query->where('status', $status);
    }

    public static function scopeWhereNotStatus(Builder $query, string|array $status)
    {
        $query->whereNotIn('status', Arr::wrap($status));
    }

    /**
     * Create a new Eloquent Collection instance.
     *
     * @param  array  $models
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function newCollection(array $models = [])
    {
        return new JobStatusCollection($models);
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function isFinished(): bool
    {
        return in_array($this->getStatus(), [
            'succeeded', 'failed', 'cancelled'
        ]);
    }

    public function isSuccessful(): bool
    {
        return $this->getStatus() === 'succeeded';
    }

    public function isRunning(): bool
    {
        return $this->getStatus() === 'started';
    }

    public function isQueued(): bool
    {
        return $this->getStatus() === 'queued';
    }

    public function getIsFinishedAttribute()
    {
        return $this->isFinished();
    }

    public function getLastMessageAttribute()
    {
        return $this->mostRecentMessage();
    }

    public function mostRecentMessage(bool $includeDebug = false)
    {
        return $this->messages()
            ->when($includeDebug === false, fn(Builder $query) => $query->where('type', '!=', 'debug'))
            ->latest()
            ->orderBy('id', 'DESC')
            ->first()
            ?->message;
    }

    public function messagesOfType(string $type)
    {
        return $this->messages()
            ->where('type', $type)
            ->latest()
            ->pluck('message');
    }

    public function getPercentage(): float
    {
        return $this->percentage ?? 0;
    }

    public function cancel()
    {
        $this->sendSignal('cancel', cancel: true);
    }

    public function sendSignal(string $signal, array $parameters = [], bool $cancel = false)
    {
        $this->signals()->create([
            'signal' => $signal,
            'parameters' => $parameters,
            'cancel_job' => $cancel
        ]);
    }

    public static function newFactory()
    {
        return JobStatusFactory::new();
    }

}
