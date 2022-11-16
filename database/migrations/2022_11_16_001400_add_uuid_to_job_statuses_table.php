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
            $table->uuid('uuid')->nullable();
        });

        foreach(\Illuminate\Support\Facades\DB::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'))
            ->whereNull('uuid')
            ->select('id')
            ->get() as $jobStatus) {
            \Illuminate\Support\Facades\DB::table(config('laravel-job-status.table_prefix'), 'job_statuses')
                ->where('id', $jobStatus->id)
                ->update(['uuid' => (string) \Illuminate\Support\Str::uuid()]);
        }

        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->uuid('uuid')->nullable(false)->change();
        });

    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->dropColumn('uuid');
        });
    }
};
