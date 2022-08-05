<?php

namespace JobStatus\Tests\Feature\Http\Api;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Foundation\Console\RouteListCommand;
use Illuminate\Routing\RouteCollection;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Artisan;
use JobStatus\Models\JobStatus;
use JobStatus\Models\JobStatusTag;
use JobStatus\Tests\fakes\JobFake;
use JobStatus\Tests\TestCase;

class JobSignalStoreTest extends TestCase
{

    /** @test */
    public function it_returns_a_404_if_the_model_does_not_exist(){
        $response = $this->postJson(route('job-status.job-signal.store', ['job_status' => 5000]), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1']
        ]);
        $response->assertStatus(404);
    }

    /** @test */
    public function it_sends_a_signal(){
        $jobStatus = JobStatus::factory()->create();

        $response = $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1']
        ]);
        $response->assertOk();

        $this->assertDatabaseHas('job_status_job_signals', [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => json_encode(['param1' => 'value1'])
        ]);
    }

    /** @test */
    public function it_validates_signal(){
        $jobStatus = JobStatus::factory()->create();

        $getResponse = function($signal) use ($jobStatus) {
            return $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
                'signal' => $signal,
                'cancel_job' => true,
                'parameters' => ['param1' => 'value1']
            ]);
        };

        $getResponse('my-signal')->assertOk();
        $getResponse(null)->assertJsonValidationErrorFor('signal');
        $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
            'cancel_job' => true, 'parameters' => ['param1' => 'value1']
        ])->assertJsonValidationErrorFor('signal');
    }

    /** @test */
    public function it_validates_cancel_job(){
        $jobStatus = JobStatus::factory()->create();

        $getResponse = function($cancelJob) use ($jobStatus) {
            return $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
                'signal' => 'my-signal',
                'cancel_job' => $cancelJob,
                'parameters' => ['param1' => 'value1']
            ]);
        };

        $getResponse(true)->assertOk();
        $getResponse(false)->assertOk();
        $getResponse(null)->assertJsonValidationErrorFor('cancel_job');
        $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
            'signal' => 'my-signal', 'parameters' => ['param1' => 'value1']
        ])->assertJsonValidationErrorFor('cancel_job');
    }

    /** @test */
    public function it_validates_parameters(){
        $jobStatus = JobStatus::factory()->create();

        $getResponse = function($parameters) use ($jobStatus) {
            return $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
                'signal' => 'my-signal',
                'cancel_job' => true,
                'parameters' => $parameters
            ]);
        };

        $getResponse(['one' => 'two'])->assertOk();
        $getResponse(['one' => 'two', 'three' => 'four'])->assertOk();
        $getResponse([])->assertOk();
        $getResponse(null)->assertJsonValidationErrorFor('parameters');
        $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
            'signal' => 'my-signal', 'cancel_job' => false
        ])->assertOk();
    }

    /** @test */
    public function it_throws_an_exception_if_the_user_does_not_have_access_to_see_the_tracking(){
        $jobStatus = JobStatus::factory()->has(
            JobStatusTag::factory(['key' => 'tag1', 'value' => 'val1']), 'tags'
        )->create(['job_class' => JobFake::class]);

        JobFake::$canSeeTracking = fn($user, $tags) => false;
        $response = $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1']
        ]);
        $this->assertInstanceOf(AuthorizationException::class, $response->exception);
        $this->assertEquals('You cannot access this job status', $response->exception->getMessage());

        $response->assertStatus(403);
    }

    /** @test */
    public function it_throws_an_exception_if_the_job_class_is_not_real(){
        $jobStatus = JobStatus::factory()->create(['job_class' => 'NotAClass']);

        $response = $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1']
        ]);
        $this->assertInstanceOf(\Exception::class, $response->exception);
        $this->assertEquals('No job of type NotAClass found.', $response->exception->getMessage());

        $response->assertStatus(500);
    }

    /** @test */
    public function it_throws_an_exception_if_the_job_class_exists_but_does_not_extend_trackable(){
        $jobStatus = JobStatus::factory()->create(['job_class' => TestCase::class]);

        $response = $this->postJson(route('job-status.job-signal.store', $jobStatus->id), [
            'signal' => 'custom-signal',
            'cancel_job' => true,
            'parameters' => ['param1' => 'value1']
        ]);
        $this->assertInstanceOf(\Exception::class, $response->exception);
        $this->assertEquals('Job JobStatus\Tests\TestCase is not trackable.', $response->exception->getMessage());

        $response->assertStatus(500);
    }

}
