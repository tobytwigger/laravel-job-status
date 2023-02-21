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
            // Helps to calculate the number of jobs of a certain type in a queue
            $table->index(['queue', 'status', 'selector'], algorithm: 'hash');

            // Helps to calculate the number of jobs of a certain type in a queue
            $table->index(['batch_id', 'status', 'selector'], algorithm: 'hash');

            // Helps to calculate the number of jobs of a certain type in a queue
            $table->index(['alias', 'status', 'selector'], algorithm: 'hash');


//            // Queues are grouped by queue, and therefore this index speeds the rows scanned from x to y.
            $table->index(['queue', 'selector', 'created_at', 'id'], algorithm: 'hash');
//
//            // Jobs are grouped by alias, and therefore this index speeds the rows scanned from x to y.
            $table->index(['alias','selector', 'created_at', 'id'], algorithm: 'hash');
//
//            // Batches are grouped by batch_id, and therefore this index speeds the rows scanned from x to y.
            $table->index(['batch_id','selector', 'created_at', 'id'], algorithm: 'hash');
//
//             // We nearly always order by created_at and id, so this index speeds that up.
            $table->index(['selector', 'created_at', 'id'], algorithm: 'hash');
        });
    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->dropIndex(['queue', 'status', 'selector']);

            $table->dropIndex(['batch_id', 'status', 'selector']);

            $table->dropIndex(['alias', 'status', 'selector']);


//            // Queues are grouped by queue, and therefore this index speeds the rows scanned from x to y.
            $table->dropIndex(['queue', 'selector', 'created_at', 'id']);
//
//            // Jobs are grouped by alias, and therefore this index speeds the rows scanned from x to y.
            $table->dropIndex(['alias', 'selector', 'created_at', 'id']);
//
//            // Batches are grouped by batch_id, and therefore this index speeds the rows scanned from x to y.
            $table->dropIndex(['batch_id', 'selector', 'created_at', 'id']);
//
//            // We nearly always order by created_at and id, so this index speeds that up.
            $table->dropIndex(['selector', 'status']);
        });
    }
};
