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
            $table->text('class');
            $table->string('alias');
            $table->string('queue')->nullable();
            $table->longText('payload')->nullable();
            $table->float('percentage')->default(0.0);
            $table->string('status')->default('queued');
            $table->timestamp('started_at', 3)->nullable();
            $table->timestamp('finished_at', 3)->nullable();
            $table->string('job_id');
            $table->boolean('is_unprotected')->default(true);
            $table->string('connection_name');
            $table->timestamps(3);
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
