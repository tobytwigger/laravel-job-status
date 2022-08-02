<?php

namespace JobStatus\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobSignalStoreRequest extends FormRequest
{

    public function rules(): array
    {
        return [
            'signal' => 'required|string|min:1',
            'cancel_job' => 'required|boolean',
            'parameters' => 'sometimes|array'
        ];
    }

}
