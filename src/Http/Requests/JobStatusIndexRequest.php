<?php

namespace JobStatus\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobStatusIndexRequest extends FormRequest
{

    public function rules()
    {
        return [
            'tags' => 'sometimes|array'
        ];
    }

}
