import { createHash } from 'node:crypto';

export class UserValidator {
  validate(email, password) {
    if (!email.includes('@')) {
      throw new Error('Invalid email');
    }

    if (password.length < 8) {
      throw new Error('The password must contain at least 8 characters');
    }
  }
}

export class PasswordHasher {
  hash(password) {
    return createHash('sha256').update(password).digest('hex');
  }
}

export class InMemoryUserRepository {
  constructor() {
    this.users = [];
  }

  exists(email) {
    return this.users.some((user) => user.email === email);
  }

  save(user) {
    this.users.push(user);
  }
}

export class WelcomeMailer {
  send(email) {
    console.log(`[Email] To: ${email} | Welcome! Your account is ready.`);
  }
}

export class UserRegistration {
  constructor(validator, hasher, repository, mailer) {
    this.validator = validator;
    this.hasher = hasher;
    this.repository = repository;
    this.mailer = mailer;
  }

  register(email, password) {
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
