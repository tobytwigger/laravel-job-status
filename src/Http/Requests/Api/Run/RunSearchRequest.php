<?php

namespace JobStatus\Http\Requests\Api\Run;

use Illuminate\Foundation\Http\FormRequest;

class RunSearchRequest extends FormRequest
{
    public function rules()
    {
        return [
            'alias' => 'sometimes|string',
            'tags' => 'sometimes|array',
        ];
    }
}
