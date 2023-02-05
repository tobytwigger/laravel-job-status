<?php

namespace JobStatus\Tests\Feature\Http\Api\Runs;

use JobStatus\Tests\TestCase;

class RunShowTest extends TestCase
{

    /** @test */
    public function it_returns_the_requested_run(){

    }

    /** @test */
    public function it_returns_a_404_if_the_run_was_not_found(){

    }

    /** @test */
    public function it_returns_a_403_if_the_user_does_not_have_access_to_a_private_job(){

    }

    /** @test */
    public function it_returns_a_403_if_an_anonymous_user_tries_to_get_the_private_job(){

    }

    /** @test */
    public function it_returns_a_200_if_the_user_does_not_have_access_to_a_public(){

    }

    /** @test */
    public function it_returns_a_200_if_the_user_does_have_access_to_public(){

    }

    /** @test */
    public function it_returns_a_200_if_the_user_is_anonymous_for_a_public_job(){

    }

}
