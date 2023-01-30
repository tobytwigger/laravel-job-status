<?php

namespace JobStatus\Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use JobStatus\Models\JobBatch;
use JobStatus\Models\JobStatus;

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
            'name' => $this->faker->word
        ];
    }

}
