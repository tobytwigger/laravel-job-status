<?php

namespace JobStatus\Tests\Unit\Enums;

use JobStatus\Enums\Status;
use JobStatus\Tests\TestCase;

class StatusTest extends TestCase
{
    /** @test */
    public function it_returns_all_finished_statuses()
    {
        $this->assertCount(4, Status::getFinishedStatuses());
        $this->assertContains(Status::FAILED, Status::getFinishedStatuses());
        $this->assertContains(Status::SUCCEEDED, Status::getFinishedStatuses());
        $this->assertContains(Status::CANCELLED, Status::getFinishedStatuses());
        $this->assertContains(Status::RELEASED, Status::getFinishedStatuses());
    }

    /** @test */
    public function it_returns_all_unfinished_statuses()
    {
        $this->assertCount(2, Status::getUnfinishedStatuses());
        $this->assertContains(Status::QUEUED, Status::getUnfinishedStatuses());
        $this->assertContains(Status::STARTED, Status::getUnfinishedStatuses());
    }

    /** @test */
    public function it_returns_all_finished_unfailed_statuses()
    {
        $this->assertCount(3, Status::getFinishedUnfailedStatuses());
        $this->assertContains(Status::SUCCEEDED, Status::getFinishedUnfailedStatuses());
        $this->assertContains(Status::CANCELLED, Status::getFinishedUnfailedStatuses());
        $this->assertContains(Status::RELEASED, Status::getFinishedUnfailedStatuses());
    }

    /**
     * @test
     *
     * @dataProvider convertToHumanProvider
     * @param string $human
     * @param Status $enum
     */
    public function convert_to_human_converts_to_human_text(string $human, Status $enum)
    {
        $this->assertEquals(
            $human,
            Status::convertToHuman($enum)
        );
    }

    public function convertToHumanProvider(): array
    {
        return [
            ['Queued', Status::QUEUED],
            ['Started', Status::STARTED],
            ['Succeeded', Status::SUCCEEDED],
            ['Failed', Status::FAILED],
            ['Cancelled', Status::CANCELLED],
            ['Released', Status::RELEASED],
        ];
    }
}
