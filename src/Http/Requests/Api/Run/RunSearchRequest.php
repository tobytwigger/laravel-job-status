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
            'tags' => ['sometimes', function($attribute, $value, $fail) {
                if(!is_array($value)) {
                    $value = json_decode($value, true);
                }
                if (!is_array($value)) {
                    $fail('The tags must be an array.');
                }
            }],
            'status' => ['sometimes', 'array'],
            'status.*' => [
                'string',
                Rule::in(Arr::map(Status::cases(), fn (Status $status) => $status->value)),
            ],
            'batchId' => ['sometimes', 'array'],
            'batchId.*' => [
                'numeric', sprintf('exists:%s_%s,id', config('laravel-job-status.table_prefix'), 'job_batches'),
            ],
            'queue' => ['sometimes', 'array'],
            'queue.*' => ['string'],
        ];
    }
}
