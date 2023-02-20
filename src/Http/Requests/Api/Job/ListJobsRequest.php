<?php

    namespace JobStatus\Http\Requests\Api\Job;

    use Illuminate\Foundation\Http\FormRequest;

    class ListJobsRequest extends FormRequest
    {
        public function authorize(): bool
        {
            return true;
        }

        public function rules(): array
        {
            return [];
        }

        public function perPage(): ?int
        {
            return $this->query('per_page', 10);
        }

        public function page(): ?int
        {
            return $this->query('page', 1);
        }

        public function sortBy(): ?string
        {
            return $this->query('sortBy');
        }

        public function sortByDirection(): ?string
        {
            return $this->query('sortByDirection');
        }
    }