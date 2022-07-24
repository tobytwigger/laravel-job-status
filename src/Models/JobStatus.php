<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Model;

class JobStatus extends Model
{

    protected $fillable = [
        'job_class', 'job_alias', 'run_count', 'percentage'
    ];

    protected $casts = [
        'run_count' => 'integer',
        'percentage' => 'float'
    ];

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

}
