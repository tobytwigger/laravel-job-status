<?php

namespace JobStatus\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\fakes\JobFake;

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
            'job_class' => JobFake::class,
            'job_alias' => $this->faker->word,
            'percentage' => $this->faker->numberBetween(0, 100),
            'uuid' => Str::uuid(),
            'job_id' => $this->faker->numberBetween(1, 10000000),
            'connection_name' => 'database',
            'status' => 'queued'
        ];
    }
}
