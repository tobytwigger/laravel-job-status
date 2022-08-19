<?php

namespace JobStatus\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobStatusSearchRequest extends FormRequest
{
    public function rules()
    {
        return [
            'alias' => 'required|string',
            'tags' => 'sometimes|array',
        ];
    }
}
