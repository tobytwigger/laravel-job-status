<?php

namespace JobStatus\Dashboard\Http\Composers;

class DashboardVariables
{

    public function compose(\Illuminate\View\View  $view)
    {
        $view->with('jobStatusVariables', [
            'path' => config('laravel-job-status.dashboard.path', 'job-status')
        ]);
    }

}
