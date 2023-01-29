<?php

namespace JobStatus\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use JobStatus\Models\JobException;

class JobExceptionFactory extends Factory
{
    protected $model = JobException::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'message' => $this->faker->sentence,
            'stack_trace' => [$this->faker->word, $this->faker->word],
            'previous_id' => null,
            'line' => $this->faker->numberBetween(1, 100),
            'file' => $this->faker->filePath(),
            'code' => $this->faker->sentence,
        ];
    }
}
