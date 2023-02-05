<?php

namespace JobStatus\Tests\Feature\Http\Api\Batches;

use Illuminate\Contracts\Auth\Authenticatable;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Models\JobStatusUser;
use JobStatus\Tests\TestCase;

class BatchIndexTest extends TestCase
{

    /** @test */
    public function it_returns_all_batches(){

    }

    /** @test */
    public function it_returns_only_batches_that_have_jobs_the_user_can_access(){

    }

    /** @test */
    public function it_returns_runs_for_the_jobs_a_user_can_access(){

    }

    /** @test */
    public function it_returns_an_empty_array_for_no_batches(){

    }

}
