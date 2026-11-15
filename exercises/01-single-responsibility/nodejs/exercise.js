import { createHash } from 'node:crypto';

export class UserRegistration {
  constructor() {
    this.users = [];
  }

  register(email, password) {
    if (!email.includes('@')) {
      throw new Error('Invalid email');
    }

    if (password.length < 8) {
      throw new Error('The password must contain at least 8 characters');
    }

    if (this.users.some((user) => user.email === email)) {
      throw new Error('This email is already registered');
    }

    const user = { email, passwordHash: createHash('sha256').update(password).digest('hex') };
    this.users.push(user);
    console.log(`[Email] To: ${email} | Welcome! Your account is ready.`);

    return user;
  }
}
