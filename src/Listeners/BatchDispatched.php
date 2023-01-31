<?php

namespace JobStatus\Listeners;

use JobStatus\Models\JobBatch;

class BatchDispatched
{

    public function handle(\Illuminate\Bus\Events\BatchDispatched $event)
    {
        JobBatch::firstOrCreate(
            ['batch_id' => $event->batch->id],
            ['name' => $event->batch->name]
        );
    }

}
