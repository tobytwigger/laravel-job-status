<?php

namespace JobStatus\Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use JobStatus\Models\JobSignal;
use JobStatus\Models\JobStatus;

class JobSignalFactory extends Factory
{
    protected $model = JobSignal::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'job_status_id' => JobStatus::factory(),
            'signal' => $this->faker->word,
            'handled_at' => null,
            'parameters' => [],
            'cancel_job' => $this->faker->boolean,
        ];
    }

    public function handled()
    {
        $this->state(fn (array $attributes) => [
            'handled_at' => Carbon::now()->subDay(),
        ]);
    }
}
