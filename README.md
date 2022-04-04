<h1 align="center">Laravel Job Status</h1>

<p align="center">
    <strong>Extensible site and user settings for Laravel.</strong>
</p>

<p align="center">
    <a href="https://github.com/ElbowSpaceUK/laravel-settings/releases">
        <img src="https://img.shields.io/github/v/release/ElbowSpaceUK/laravel-settings?label=Latest%20Version&sort=semver&style=plastic" alt="Latest Version">
    </a>
    <a href="https://github.com/ElbowSpaceUK/laravel-settings/tree/master">
        <img src="https://img.shields.io/github/workflow/status/ElbowSpaceUK/laravel-settings/build-status/master?label=release%20status&style=plastic" alt="Master branch status">
    </a>
    <a href="https://github.com/ElbowSpaceUK/laravel-settings/tree/develop">
        <img src="https://img.shields.io/github/workflow/status/ElbowSpaceUK/laravel-settings/build-status/develop?label=dev%20status&style=plastic" alt="Develop branch status">
    </a>
</p>

<p align="center">
    <a href="http://buymeacoffee.com/translate">
        <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy me a coffee">
    </a>
</p>


## Contents

* [About the Project](#about)
* [Documentation](#docs)
* [Examples](#examples)
* [Installation](#installation)
* [Contributing](#contributing)
* [Copyright and Licence](#copyright-and-licence)
* [Contact](#contact)

## About

Laravel Settings provides simple but flexible settings to any Laravel app.

- Quick to set up and use, but powerful enough to scale as your app does.
- Supports string and class based keys.
- Supports encryption and storing non-primitive values.
- User and global settings provided by default.
- Can add custom types such as a team or organisation.

## Docs

We've taken care over documenting everything you'll need to get started and use Laravel settings fully.

[Check out the docs](https://ElbowSpaceUK.github.io/laravel-settings) on our documentation site.

[comment]: <> (To build them locally, you'll need to have ruby &#40;we'd recommend using rbenv&#41; and the gem bundler &#40;https://bundler.io/&#41; installed. Run `bundle install && bundle exec jekyll serve` in the docs folder.)

## Examples

### Get a setting

```php
    echo \Settings\Setting::getValue('siteName') // My App
```

### Create a setting

You can create settings in the service provider, in your `boot` method

```php
    public function boot()
    {
        \Settings\Setting::createGlobal('siteName', 'My App', Field::text('siteName')->setValue('My App')->setLabel('The name of the site'));
        \Settings\Setting::createUser('theme', 'default', Field::select('theme')->setValue('default')->setLabel('The theme to use')->withOption('default', 'Default'));
    }
```

#### Class-based settings

To make use of static analysis and IDE typehinting support, and to help you manage the defined settings, you can use class-based settings.

### Set a setting

```php
    \Settings\Setting::setDefaultValue('theme', 'default-two'); // Set the default theme for users
    \Settings\Setting::setDefaultValue('theme', 'my-custom-theme', 2); // User with an ID of `2` sets their own value.
```

## Installation

All you need to do to use this project is pull it into an existing Laravel app using composer.

```console
composer require twigger/laravel-settings
```

You can publish the configuration file by running
```console
php artisan vendor:publish --provider="Settings\SettingsServiceProvider"
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
