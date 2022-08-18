# Laravel Job Status

> Show users the progress of their jobs.

[![Latest Version](https://img.shields.io/github/v/release/tobytwigger/laravel-job-status?label=Latest%20Version&sort=semver&style=plastic)](https://github.com/tobytwigger/laravel-job-status/releases)
[![Build status](https://github.com/tobytwigger/laravel-job-status/actions/workflows/build-status.yml/badge.svg)](https://github.com/tobytwigger/laravel-job-status/actions/workflows/build-status.yml)

[![Buy me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](http://buymeacoffee.com/translate)

## Contents

* [About the Project](#about)
* [Documentation](#docs)
* [Examples](#examples)
* [Installation](#installation)
* [Contributing](#contributing)
* [Copyright and Licence](#copyright-and-licence)
* [Contact](#contact)

## About

![example of job status in use](https://github.com/tobytwigger/laravel-job-status/blob/develop/docs/images/podcast.gif "Showing the user the status of their podcast being uploaded")

Laravel Job Status provides a simple way to track your jobs and show the progress to your users.

- Show your users up-to-date progress of your job without refreshing the page.
- Let users cancel running jobs.
- Customisable Vue component for displaying your own progress components.

## Docs

We've taken care over documenting everything you'll need to get started and use Laravel Job Status fully.

[Check out the docs](https://tobytwigger.github.io/laravel-job-status) on our documentation site.

[comment]: <> (To build them locally, you'll need to have ruby &#40;we'd recommend using rbenv&#41; and the gem bundler &#40;https://bundler.io/&#41; installed. Run `bundle install && bundle exec jekyll serve` in the docs folder.)

## Examples

### Show users the status of their jobs

The following is enough to show a user the status of the 'process podcast' job for the podcast with the ID `podcastId`.

```vue
<job-status job="process-podcast" :tags="{podcast: podcastId}">
    <template v-slot:default="{status, lastMessage, complete, cancel, signal}">
    
        <spinner v-if="complete === false"></spinner>
        <p>The status of the job is {{status}}</p>
        <p>{{lastMessage}}</p>
        <v-button @click="cancel" type="danger">Cancel</v-button>
    </template>
    <template v-slot:empty>
        Upload a podcast to get started
    </template>
</job-status>
```

### Track a job

Tracking is simple to enable on any job.

```php
class ProcessPodcast
{
    use Trackable;

    protected Podcast $podcast;

    public function handle()
    {
        // Upload and process the podcast
    }

    public function tags(): array
    {
        return [
            'podcast' => $this->podcast->id,
            'user' => $this->user->id
        ];
    }

    public function alias(): string
    {
        return 'process-podcast';
    }

}
```

## Installation

All you need to do to use this project is pull it into an existing Laravel app using composer.

```console
composer require twigger/laravel-job-status
```

You can publish the configuration file by running
```console
php artisan vendor:publish --provider="JobStatus\JobStatusServiceProvider"
```

## Contributing

Contributions are welcome! Before contributing to this project, familiarize
yourself with [CONTRIBUTING.md](CONTRIBUTING.md).

## Copyright and Licence

This package is copyright © [Toby Twigger](https://github.com/tobytwigger)
and licensed for use under the terms of the MIT License (MIT). Please see
[LICENCE.md](LICENCE.md) for more information.

## Contact

For any questions, suggestions, security vulnerabilities or help, email me directly at [tobytwigger1@gmail.com](mailto:tobytwigger1@gmail.com)
