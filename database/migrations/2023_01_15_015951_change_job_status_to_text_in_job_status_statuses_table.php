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
        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_status_statuses'), function (Blueprint $table) {
            $table->string('status')->default('queued')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
    }
};
