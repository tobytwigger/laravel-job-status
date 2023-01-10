<?php

namespace JobStatus\Tests\Unit;

use JobStatus\JobStatusRepository;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Tests\TestCase;

class JobStatusRepositoryTest extends TestCase
{

    /** @test */
    public function it_gets_a_searcher(){
        $repo = new JobStatusRepository();
        $this->assertInstanceOf(JobStatusSearcher::class, $repo->search());
    }

}
