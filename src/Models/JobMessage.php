<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Model;

class JobMessage extends Model
{

    protected $fillable = [
        'message', 'type'
    ];

    protected $casts = [];

    public function jobStatus()
    {
        return $this->belongsTo(JobStatus::class);
    }

}
