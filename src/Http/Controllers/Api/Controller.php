<?php

namespace JobStatus\Http\Controllers\Api;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use JobStatus\JobStatusServiceProvider;
use JobStatus\Models\JobStatus;
use JobStatus\Search\Result\JobRun;

class Controller extends \Illuminate\Routing\Controller
{
    public function resolveAuth(): ?int
    {
        return call_user_func(JobStatusServiceProvider::$resolveAuthWith ?? fn () => Auth::user()?->getAuthIdentifier());
    }

    protected function checkUserCanAccessJob(JobStatus $jobStatus)
    {
        $userId = $this->resolveAuth();
        $jobRun = new JobRun($jobStatus);

        if (!$this->shouldBypassAuth() && !$jobRun->accessibleBy($userId)) {
            throw new AuthorizationException('You cannot access this job status', 403);
        }
    }

    public function shouldBypassAuth(): bool
    {
        if (request()->query('bypassAuth', false)) {
            if (Gate::allows('viewJobStatus')) {
                return true;
            }
            abort(403, 'You do not have permission to bypass auth');
        }

        return false;
    }


    public function paginate(Collection $items)
    {
        $perPage = request()->input('per_page', 10);
        $page = request()->input('page', 1);

        $slicedItems = collect($items)->forPage($page, $perPage)->values();

        return (new LengthAwarePaginator(
            $slicedItems,
            $items->count(),
            $perPage,
            $page,
            ['path' => url(request()->path())]
        ))->appends('per_page', $perPage);

        return $this->paginationResponse($slicedItems, count($items));
    }
}
