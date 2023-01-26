<?php

namespace JobStatus\Tests\Feature\Search;

use Illuminate\Support\Str;
use JobStatus\Database\Factories\JobStatusTagFactory;
use JobStatus\JobStatusRepository;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Search\Result\JobRun;
use JobStatus\Search\Result\TrackedJob;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\TestCase;

class JobStatusJobRunTest extends TestCase
{

    /** @test */
    public function hasParent_returns_true_if_a_parent_is_set(){

    }

    /** @test */
    public function hasParent_returns_false_if_a_parent_is_not_set(){

    }

    /** @test */
    public function parent_returns_the_parent(){

    }

    /** @test */
    public function parent_returns_null_if_no_parent(){

    }

    /** @test */
    public function getException_gets_the_exception_all_loaded(){

    }

    /** @test */
    public function jobStatus_gets_the_underlying_job_status_model(){

    }

    /** @test */
    public function signals_gets_all_signals(){

    }

    /** @test */
    public function messagesOfType_gets_all_messages_of_the_given_type(){

    }

    /** @test */
    public function mostRecentMessage_gets_the_most_recent_message(){

    }

    /** @test */
    public function messages_gets_all_messages(){

    }

    /** @test */
    public function hasFinished_returns_if_the_job_has_finished(){

    }

    /** @test */
    public function hasFailed_returns_if_the_job_has_failed(){

    }

    /** @test */
    public function hasBeenCancelled_returns_if_the_job_has_been_cancelled(){

    }

    /** @test */
    public function isQueue_returns_if_the_status_is_queued(){

    }

    /** @test */
    public function isRunning_returns_true_if_the_status_is_running(){

    }

    /** @test */
    public function isSuccessful_returns_true_of_the_status_is_successful(){

    }

    /** @test */
    public function getPercentage_returns_the_percentage(){

    }

    /** @test */
    public function getStatus_returns_the_status(){

    }

    /** @test */
    public function it_can_be_casted_to_an_array_or_json(){

    }

}
