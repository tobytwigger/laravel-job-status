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
        Schema::create('job_messages', function (Blueprint $table) {
            $table->id();
            $table->text('message');
            $table->enum('type', ['success', 'error', 'info', 'warning', 'debug'])->default('info');
            $table->unsignedBigInteger('job_status_id');
            $table->timestamps();
        });

        Schema::table('job_messages', function (Blueprint $table) {
            $table->foreign('job_status_id')->references('id')->on('job_status')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     */
    public function down()
    {
        Schema::dropIfExists('job_messages');
    }
};
