<?php

    namespace JobStatus\Http\Resources\Job;

    use Illuminate\Http\Resources\Json\JsonResource;

    class JobOverviewResource extends JsonResource
    {
        public function toArray($request)
        {
            return [
                'count' => $this->runs,
                'alias' => $this->alias,
                'uuid' => $this->uuid,
                'succeeded' => $this->succeeded,
                'failed' => $this->failed,
                'queued' => $this->queued,
                'running' => $this->running,
                'cancelled' => $this->cancelled
            ];
        }
    }