<?php

namespace JobStatus\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusUser;

class JobStatusUserFactory extends Factory
{
    protected $model = JobStatusUser::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 100),
            'job_status_id' => JobStatus::factory(),
        ];
    }
}
