<?php

namespace JobStatus\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;

class JobStatusFactory extends Factory
{
    protected $model = JobStatus::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'job_class' => $this->faker->word,
            'job_alias' => $this->faker->word,
            'run_count' => 0,
            'percentage' => $this->faker->numberBetween(0, 100)
        ];
    }
}
