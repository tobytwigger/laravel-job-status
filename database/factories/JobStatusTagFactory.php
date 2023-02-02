<?php

namespace JobStatus\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;

class JobStatusTagFactory extends Factory
{
    protected $model = JobStatusTag::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'key' => $this->faker->word,
            'value' => $this->faker->sentence,
            'is_indexless' => false,
            'job_status_id' => JobStatus::factory(),
        ];
    }

    public function indexless(string $key)
    {
        return $this->state(fn(array $attributes) => [
            'is_indexless' => true,
            'key' => $key,
            'value' => null
        ]);
    }
}
