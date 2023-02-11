<?php

namespace JobStatus\Http\Requests\Api\Run;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;
use JobStatus\Enums\Status;

class RunSearchRequest extends FormRequest
{
    public function rules()
    {
        return [
            'alias' => 'sometimes|array',
            'tags' => 'sometimes|array',
            'status' => ['sometimes', 'array'],
            'status.*' => [
                'string',
                Rule::in(Arr::map(Status::cases(), fn (Status $status) => $status->value)),
            ],
        ];
    }
}
