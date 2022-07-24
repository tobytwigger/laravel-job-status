<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Model;

class JobStatusTag extends Model
{

    protected $fillable = [
        'key', 'value'
    ];

    protected $casts = [];

    public function jobStatus()
    {
        return $this->belongsTo(JobStatus::class);
    }

}
