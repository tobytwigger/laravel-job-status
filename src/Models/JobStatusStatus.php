<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Model;

class JobStatusStatus extends Model
{

    protected $fillable = [
        'status'
    ];

    protected $casts = [];

    public function jobStatus()
    {
        return $this->belongsTo(JobStatus::class);
    }

}
