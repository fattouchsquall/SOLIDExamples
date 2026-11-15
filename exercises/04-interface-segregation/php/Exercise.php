<?php

declare(strict_types=1);

namespace Solid\Exercises\InterfaceSegregation\Exercise;

use BadMethodCallException;
use RuntimeException;

interface FileStorage
{
    public function read(string $path): string;

    public function write(string $path, string $content): void;

    public function delete(string $path): void;

    public function signedUrl(string $path, int $expiresInSeconds): string;
}

final class S3Storage implements FileStorage
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

final class LocalDiskStorage implements FileStorage
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
        throw new BadMethodCallException('Local disk cannot generate signed URLs');
    }
}

final class ReportViewer
{
    public function __construct(private readonly FileStorage $storage)
    {
    }

    public function show(string $path): string
    {
        return $this->storage->read($path);
    }
}

final class ReportSharer
{
    public function __construct(private readonly FileStorage $storage)
    {
    }

    public function share(string $path): string
    {
        return 'Download your report: ' . $this->storage->signedUrl($path, 3600);
    }
}
