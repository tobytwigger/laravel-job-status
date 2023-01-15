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
            $table->string('job_id');
            $table->string('connection_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->dropColumn('job_id');
        });
        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->dropColumn('connection_name');
        });
    }
};
