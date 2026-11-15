<?php

declare(strict_types=1);

namespace Solid\Exercises\InterfaceSegregation\Solution;

use RuntimeException;

interface ReadableStorage
{
    public function read(string $path): string;
}

interface WritableStorage
{
    public function write(string $path, string $content): void;

    public function delete(string $path): void;
}

interface SignedUrlProvider
{
    public function signedUrl(string $path, int $expiresInSeconds): string;
}

final class S3Storage implements ReadableStorage, WritableStorage, SignedUrlProvider
{
    /** @var array<string, string> */
    private array $files = [];

    public function read(string $path): string
    {
        return $this->files[$path] ?? throw new RuntimeException("File not found: {$path}");
    }

    public function write(string $path, string $content): void
    {
        $this->files[$path] = $content;
    }

    public function delete(string $path): void
    {
        unset($this->files[$path]);
    }

    public function signedUrl(string $path, int $expiresInSeconds): string
    {
        return "https://my-bucket.s3.amazonaws.com/{$path}?expires={$expiresInSeconds}";
    }
}

final class LocalDiskStorage implements ReadableStorage, WritableStorage
{
    /** @var array<string, string> */
    private array $files = [];

    public function read(string $path): string
    {
        return $this->files[$path] ?? throw new RuntimeException("File not found: {$path}");
    }

    public function write(string $path, string $content): void
    {
        $this->files[$path] = $content;
    }

    public function delete(string $path): void
    {
        unset($this->files[$path]);
    }
}

final class ReportViewer
{
    public function __construct(private readonly ReadableStorage $storage)
    {
    }

    public function show(string $path): string
    {
        return $this->storage->read($path);
    }
}

final class ReportSharer
{
    public function __construct(private readonly SignedUrlProvider $urls)
    {
    }

    public function share(string $path): string
    {
        return 'Download your report: ' . $this->urls->signedUrl($path, 3600);
    }
}
