<?php

namespace JobStatus\Dashboard\Http\Controllers\Api;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use JobStatus\Dashboard\Http\Controllers\Controller;
use JobStatus\Http\Requests\JobSignalStoreRequest;
use JobStatus\Models\JobStatus;
use JobStatus\Search\JobStatusSearcher;
use JobStatus\Search\Result\JobRun;

class JobSignalController extends Controller
{

    public function store(Request $request, JobStatus $jobStatus)
    {
        $request->validate([
            'signal' => 'required|string|min:1',
            'cancel_job' => 'required|boolean',
            'parameters' => 'sometimes|array',
        ]);

        $jobStatus->signals()->create([
            'signal' => $request->input('signal'),
            'cancel_job' => $request->input('cancel_job'),
            'parameters' => $request->input('parameters', []),
        ]);
    }

}
