<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class() extends Migration {
    /**
     * Run the migrations.
     *
     */
    public function up()
    {
        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->unsignedBigInteger('exception_id')->nullable();
        });

        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->foreign('exception_id')->references('id')->on(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_exceptions'))->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            if (DB::getDriverName() !== 'sqlite') {
                $table->dropForeign(['exception_id']);
            }
            $table->dropColumn('exception_id');
        });
    }
};
