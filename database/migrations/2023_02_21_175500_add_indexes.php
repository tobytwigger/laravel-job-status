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
            $table->unique(['queue', 'status', 'selector', 'id'], algorithm: 'hash');

            // Helps to calculate the number of jobs of a certain type in a queue
            $table->unique(['batch_id', 'status', 'selector', 'id'], algorithm: 'hash');

            // Helps to calculate the number of jobs of a certain type in a queue
            $table->unique(['alias', 'status', 'selector', 'id'], algorithm: 'hash');


//            // Queues are grouped by queue, and therefore this index speeds the rows scanned from x to y.
            $table->unique(['queue', 'selector', 'created_at', 'id'], algorithm: 'hash');
//
//            // Jobs are grouped by alias, and therefore this index speeds the rows scanned from x to y.
            $table->unique(['alias','selector', 'created_at', 'id'], algorithm: 'hash');
//
//            // Batches are grouped by batch_id, and therefore this index speeds the rows scanned from x to y.
            $table->unique(['batch_id','selector', 'created_at', 'id'], algorithm: 'hash');
//
//             // We nearly always order by created_at and id, so this index speeds that up.
            $table->unique(['selector', 'created_at', 'id'], algorithm: 'hash');
        });
    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->dropUnique(['queue', 'status', 'selector', 'id']);

            $table->dropUnique(['batch_id', 'status', 'selector', 'id']);

            $table->dropUnique(['alias', 'status', 'selector', 'id']);


//            // Queues are grouped by queue, and therefore this index speeds the rows scanned from x to y.
            $table->dropUnique(['queue', 'selector', 'created_at', 'id']);
//
//            // Jobs are grouped by alias, and therefore this index speeds the rows scanned from x to y.
            $table->dropUnique(['alias', 'selector', 'created_at', 'id']);
//
//            // Batches are grouped by batch_id, and therefore this index speeds the rows scanned from x to y.
            $table->dropUnique(['batch_id', 'selector', 'created_at', 'id']);
//
//            // We nearly always order by created_at and id, so this index speeds that up.
            $table->dropUnique(['selector', 'created_at', 'id']);
        });
    }
};
