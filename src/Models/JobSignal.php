<?php

namespace JobStatus\Models;

use Illuminate\Database\Eloquent\Model;

class JobSignal extends Model
{

    protected $fillable = [
        'signal'
    ];

    protected $casts = [

    ];

    public function jobStatus()
    {
        return $this->belongsTo(JobStatus::class);
    }

}
