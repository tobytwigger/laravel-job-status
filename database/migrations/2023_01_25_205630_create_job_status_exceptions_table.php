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
        Schema::create(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_exceptions'), function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->text('message');
            $table->longText('stack_trace');
            $table->unsignedInteger('line')->nullable();
            $table->text('file')->nullable();
            $table->unsignedInteger('code')->nullable();
            $table->unsignedBigInteger('previous_id')->nullable();
            $table->timestamps(3);
        });
    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
        Schema::dropIfExists(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_exceptions'));
    }
};
