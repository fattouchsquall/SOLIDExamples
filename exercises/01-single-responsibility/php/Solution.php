<?php

declare(strict_types=1);

namespace Solid\Exercises\SingleResponsibility\Solution;

use InvalidArgumentException;

final readonly class User
{
    public function __construct(
        public string $email,
        public string $passwordHash,
    ) {
    }
}

final class UserValidator
{
    public function validate(string $email, string $password): void
    {
        if (!str_contains($email, '@')) {
            throw new InvalidArgumentException('Invalid email');
        }

        if (strlen($password) < 8) {
            throw new InvalidArgumentException('The password must contain at least 8 characters');
        }
    }
}

final class PasswordHasher
{
    public function hash(string $password): string
    {
        return hash('sha256', $password);
    }
}

final class InMemoryUserRepository
{
    /** @var list<User> */
    public array $users = [];

    public function exists(string $email): bool
    {
        foreach ($this->users as $user) {
            if ($user->email === $email) {
                return true;
            }
        }

        return false;
    }

    public function save(User $user): void
    {
        $this->users[] = $user;
    }
}

final class WelcomeMailer
{
    public function send(string $email): void
    {
        echo "[Email] To: {$email} | Welcome! Your account is ready.\n";
    }
}

final class UserRegistration
{
    public function __construct(
        private readonly UserValidator $validator,
        private readonly PasswordHasher $hasher,
        private readonly InMemoryUserRepository $repository,
        private readonly WelcomeMailer $mailer,
    ) {
    }

    public function register(string $email, string $password): User
    {
        $this->validator->validate($email, $password);

        if ($this->repository->exists($email)) {
            throw new InvalidArgumentException('This email is already registered');
        }

        $user = new User($email, $this->hasher->hash($password));
        $this->repository->save($user);
        $this->mailer->send($email);

        return $user;
    }
}
