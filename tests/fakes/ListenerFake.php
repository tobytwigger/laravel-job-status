<?php

namespace JobStatus\Tests\fakes;

use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use JobStatus\Concerns\Trackable;

class ListenerFake implements ShouldQueue
{
    use Trackable, InteractsWithQueue, Queueable;

    private static ?string $staticAlias;

    private static array $staticTags;
    private static \Closure|string|null $staticCallback;
    private static array $staticSignals;
    private static bool $staticIsUnprotected;
    private static array $staticUsers;
    private static ?string $staticQueue;
    private static int $staticMaxExceptions = 3;
    private static int $staticMaxTries = 3;

    public int $maxExceptions;

    public int $tries;

    public function __construct()
    {
        $this->tries = static::$staticMaxTries;
        $this->maxExceptions = static::$staticMaxExceptions;
    }

    public function backoff()
    {
        // In src/Illuminate/Events/Dispatcher.php, createListenerAndJob() creates a new listener instance without the constructor.
        // It then calls this, so we can do the setup here.

        $this->tries = static::$staticMaxTries;
        $this->maxExceptions = static::$staticMaxExceptions;

        return null;
    }

    public static function setupParameters(
        ?string $alias = null,
        array $tags = [],
        \Closure|string|null $callback = null,
        array $signals = [],
        array $users = [],
        bool $isUnprotected = true,
        ?string $queue = null,
        int $maxExceptions = 1,
        int $tries = 3
    ) {
        static::$staticAlias = $alias;
        static::$staticTags = $tags;
        static::$staticCallback = $callback;
        static::$staticSignals = $signals;
        static::$staticUsers = $users;
        static::$staticIsUnprotected = $isUnprotected;
        static::$staticQueue = $queue;
        static::$staticMaxExceptions = $maxExceptions;
        static::$staticMaxTries = $tries;
    }

    public static function reset()
    {
        static::$staticAlias = null;
        static::$staticTags = [];
        static::$staticCallback = null;
        static::$staticSignals = [];
        static::$staticUsers = [];
        static::$staticIsUnprotected = true;
        static::$staticQueue = null;
    }

    public function viaQueue()
    {
        return static::$staticQueue;
    }

    public function viaConnection(): string
    {
        return 'database';
    }

    public function isUnprotected(): bool
    {
        return static::$staticIsUnprotected;
    }

    public function alias(): ?string
    {
        return static::$staticAlias;
    }

    public function tags(): array
    {
        return static::$staticTags;
    }

    public function handle(FakeEvent $event)
    {
        if (static::$staticCallback === null) {
            return null;
        }

        return app()->call(static::$staticCallback, ['job' => $this, 'event' => $event]);
    }

    public function handleSignalCallback(string $signal, array $arguments)
    {
        if (array_key_exists($signal, static::$staticSignals)) {
            app()->call(static::$staticSignals[$signal], ['job' => $this, 'parameters' => $arguments]);
        }
    }

    public function users(): array
    {
        return static::$staticUsers;
    }
}
