import { createHash } from 'node:crypto';

export type User = { email: string; passwordHash: string };

export class UserValidator {
  validate(email: string, password: string): void {
    if (!email.includes('@')) {
      throw new Error('Invalid email');
    }

    if (password.length < 8) {
      throw new Error('The password must contain at least 8 characters');
    }
  }
}

export class PasswordHasher {
  hash(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }
}

export class InMemoryUserRepository {
  readonly users: User[] = [];

  exists(email: string): boolean {
    return this.users.some((user) => user.email === email);
  }

  save(user: User): void {
    this.users.push(user);
  }
}

export class WelcomeMailer {
  send(email: string): void {
    console.log(`[Email] To: ${email} | Welcome! Your account is ready.`);
  }
}

export class UserRegistration {
  readonly validator: UserValidator;
  readonly hasher: PasswordHasher;
  readonly repository: InMemoryUserRepository;
  readonly mailer: WelcomeMailer;

  constructor(
    validator: UserValidator,
    hasher: PasswordHasher,
    repository: InMemoryUserRepository,
    mailer: WelcomeMailer,
  ) {
    this.validator = validator;
    this.hasher = hasher;
    this.repository = repository;
    this.mailer = mailer;
  }

  register(email: string, password: string): User {
    this.validator.validate(email, password);

    if (this.repository.exists(email)) {
      throw new Error('This email is already registered');
    }

    const user = { email, passwordHash: this.hasher.hash(password) };
    this.repository.save(user);
    this.mailer.send(email);

    return user;
  }
}
