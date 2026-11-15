<?php

declare(strict_types=1);

namespace Solid\Exercises\SingleResponsibility\Exercise;

use InvalidArgumentException;

final readonly class User
{
    public function __construct(
        public string $email,
        public string $passwordHash,
    ) {
    }
}

final class UserRegistration
{
    /** @var list<User> */
    public array $users = [];

    public function register(string $email, string $password): User
    {
        if (!str_contains($email, '@')) {
            throw new InvalidArgumentException('Invalid email');
        }

        if (strlen($password) < 8) {
            throw new InvalidArgumentException('The password must contain at least 8 characters');
        }

        foreach ($this->users as $user) {
            if ($user->email === $email) {
                throw new InvalidArgumentException('This email is already registered');
            }
        }

        $user = new User($email, hash('sha256', $password));
        $this->users[] = $user;
        echo "[Email] To: {$email} | Welcome! Your account is ready.\n";

        return $user;
    }
}
