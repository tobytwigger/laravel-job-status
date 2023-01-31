<?php

namespace JobStatus\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use JobStatus\Models\JobBatch;

class JobBatchFactory extends Factory
{
    protected $model = JobBatch::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'batch_id' => $this->faker->bothify('##??##??##??##??#'),
            'name' => $this->faker->word,
        ];
    }
}
