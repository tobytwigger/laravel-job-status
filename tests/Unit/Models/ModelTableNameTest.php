<?php

namespace JobStatus\Tests\Unit\Models;

use Illuminate\Support\Facades\Config;
use JobStatus\Models\JobMessage;
use JobStatus\Models\JobStatus;
use JobStatus\Tests\TestCase;

class ModelTableNameTest extends TestCase
{
    protected function setUp(): void
    {
        $this->afterApplicationRefreshed(fn () => Config::set('laravel-job-status.table_prefix', 'new_table_name'));
        parent::setUp();
    }

    /** @test */
    public function table_names_can_be_changed_with_config()
    {
        $attributes = [
            'message' => 'My message 2',
            'type' => \JobStatus\Enums\MessageType::INFO,
            'job_status_id' => JobStatus::factory()->create()->id,
        ];

        JobMessage::factory()->create($attributes);
        $this->assertDatabaseHas('new_table_name_job_messages', $attributes);
    }
}
