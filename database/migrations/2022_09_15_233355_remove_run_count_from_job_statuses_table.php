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
            $table->dropColumn('run_count');
        });
    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->unsignedBigInteger('run_count')->default(1);
        });
    }
};
