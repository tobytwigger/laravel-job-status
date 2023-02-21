<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     *
     */
    public function up()
    {
        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->string('selector')->nullable();
        });
        $this->updateJobSelectors();
        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->string('selector')->nullable(false)->change();
        });
    }

    private function updateJobSelectors()
    {
        $jobStatuses = \JobStatus\Models\JobStatus::query()
            ->withoutEagerLoads()
            ->get();
        foreach ($jobStatuses as $jobStatus) {
            $jobStatus->selector = $jobStatus->uuid === null
                ? $jobStatus->job_id . '-' . $jobStatus->connection_name
                : $jobStatus->uuid;
            $jobStatus->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->dropColumn('selector');
        });
    }
};
