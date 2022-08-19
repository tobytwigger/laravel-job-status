<?php

namespace JobStatus\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusStatus;

class JobStatusStatusFactory extends Factory
{
    protected $model = JobStatusStatus::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'status' => $this->faker->randomElement(['queued', 'started', 'cancelled', 'failed', 'succeeded']),
            'job_status_id' => JobStatus::factory(),
        ];
    }
}
