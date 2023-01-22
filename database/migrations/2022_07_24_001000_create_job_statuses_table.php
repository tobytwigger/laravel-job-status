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
        Schema::create(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->nullable();
            $table->text('job_class');
            $table->string('job_alias')->nullable();
            $table->float('percentage')->default(0.0);
            $table->string('status')->default('queued');
            $table->string('job_id');
            $table->text('configuration')->nullable();
            $table->string('connection_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
        Schema::dropIfExists(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'));
    }
};
