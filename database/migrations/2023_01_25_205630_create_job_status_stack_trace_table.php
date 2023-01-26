<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_stack_traces'), function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('job_message_id');
            $table->longText('stack_trace');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_stack_traces'));
    }
};
