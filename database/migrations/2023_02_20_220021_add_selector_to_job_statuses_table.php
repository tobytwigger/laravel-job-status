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
        $this->truncateTable('job_status_statuses');
        $this->truncateTable('job_status_tags');
        $this->truncateTable('job_signals');
        $this->truncateTable('job_messages');
        $this->truncateTable('job_exceptions');
        $this->truncateTable('job_batches');
        $this->truncateTable('job_statuses');

        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->string('selector');
        });
    }

    private function truncateTable(string $table)
    {
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0');
        \Illuminate\Support\Facades\DB::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), $table))->truncate();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
        Schema::table(sprintf('%s_%s', config('laravel-job-status.table_prefix'), 'job_statuses'), function (Blueprint $table) {
            $table->dropColumn('selector');
        });
    }
};
