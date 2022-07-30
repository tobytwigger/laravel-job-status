<?php

namespace JobStatus\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;

class JobMessageFactory extends Factory
{
    protected $model = JobMessage::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'message' => $this->faker->sentence,
            'type' => $this->faker->randomElement(['success', 'error', 'info', 'warning', 'debug']),
            'job_status_id' => JobStatus::factory()
        ];
    }
}
