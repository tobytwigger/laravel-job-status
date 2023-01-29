<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use JobStatus\Database\Factories\JobExceptionFactory;

class JobException extends Model
{
    use HasFactory;

    protected $fillable = [
        'message',
        'stack_trace',
        'previous_id',
        'line',
        'file',
        'code',
    ];

    protected $casts = [
        'stack_trace' => 'array',
        'line' => 'integer',
        'code' => 'integer',
    ];

    protected $dateFormat = 'Y-m-d H:i:s.v';

    public function __construct(array $attributes = [])
    {
        $this->table = sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_exceptions');
        parent::__construct($attributes);
    }

    public function jobStatus()
    {
        return $this->hasOne(JobStatus::class, 'exception_id');
    }

    public function previous()
    {
        return $this->belongsTo(JobException::class, 'previous_id');
    }

    public function loadAllPrevious(): static
    {
        $currentException = $this;
        $count = 1;
        $this->load('previous');
        while ($currentException->previous_id !== null) {
            $string = '';
            for ($i = 0; $i<=$count;$i++) {
                $string .= '.previous.previous';
            }
            if (Str::startsWith($string, '.')) {
                $string = Str::substr($string, 1);
            }
            $this->load($string);
            $currentException = $currentException->previous;
        }

        return $this;
    }

    protected static function newFactory()
    {
        return JobExceptionFactory::new();
    }
}
