<?php

namespace JobStatus\Tests\Feature\Http\Api\Batches;

use JobStatus\Tests\TestCase;

class BatchShowTest extends TestCase
{

    /** @test */
    public function it_returns_the_requested_batch(){

    }

    /** @test */
    public function it_returns_a_404_if_the_batch_was_not_found(){

    }

    /** @test */
    public function it_returns_a_403_if_the_user_does_not_have_access_to_any_jobs_in_the_batch(){

    }

    /** @test */
    public function it_returns_a_403_if_an_anonymous_user_tries_to_get_the_batch_without_any_public_jobs_in_the_batch(){

    }

    /** @test */
    public function it_returns_a_200_if_the_user_does_not_have_access_to_a_public_job_through_the_batch(){

    }

    /** @test */
    public function it_returns_a_200_if_the_user_does_have_access_to_public_job_through_the_batch(){

    }

    /** @test */
    public function it_returns_a_200_if_the_user_is_anonymous_for_a_public_job_through_the_batch(){

    }

}
