<?php

namespace JobStatus\Tests\Feature\Search;

use Illuminate\Support\Str;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Tests\TestCase;

class JobStatusSearcherTest extends TestCase
{

    /** @test */
    public function testing(){
        JobStatus::factory()->has(JobStatusTag::factory()->count(2), 'tags')->create(['job_class' => 'SomeClass']);
        JobStatus::factory()->has(JobStatusTag::factory(), 'tags')->create(['job_class' => 'SomeClassTwo']);
        JobStatus::factory()
            ->has(JobStatusTag::factory(['key' => 'test1', 'value' => 'val1']), 'tags')
            ->has(JobStatusTag::factory(['key' => 'test2', 'value' => 'val2']), 'tags')
            ->create(['job_class' => 'SomeClass']);
        $uuid = Str::uuid();
        JobStatus::factory()
            ->has(JobStatusTag::factory(['key' => 'test1', 'value' => 'val1']), 'tags')
            ->has(JobStatusTag::factory(['key' => 'test2', 'value' => 'val2']), 'tags')
            ->create(['job_class' => 'SomeClass', 'uuid' => $uuid]);
        JobStatus::factory()
            ->has(JobStatusTag::factory(['key' => 'test1', 'value' => 'val1']), 'tags')
            ->has(JobStatusTag::factory(['key' => 'test2', 'value' => 'val2']), 'tags')
            ->create(['job_class' => 'SomeClass', 'uuid' => $uuid]);

        dd((new JobStatusSearcher())->get()->toArray());
    }

}
