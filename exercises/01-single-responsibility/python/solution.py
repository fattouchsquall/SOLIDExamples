from dataclasses import dataclass
from hashlib import sha256


@dataclass(frozen=True)
class User:
    email: str
    password_hash: str


class UserValidator:
    def validate(self, email: str, password: str) -> None:
        if "@" not in email:
            raise ValueError("Invalid email")

        if len(password) < 8:
            raise ValueError("The password must contain at least 8 characters")


class PasswordHasher:
    def hash(self, password: str) -> str:
        return sha256(password.encode()).hexdigest()


class InMemoryUserRepository:
    def __init__(self) -> None:
        self.users: list[User] = []

    def exists(self, email: str) -> bool:
        return any(user.email == email for user in self.users)

    def save(self, user: User) -> None:
        self.users.append(user)


class WelcomeMailer:
    def send(self, email: str) -> None:
        print(f"[Email] To: {email} | Welcome! Your account is ready.")


class UserRegistration:
    def __init__(
        self,
        validator: UserValidator,
        hasher: PasswordHasher,
        repository: InMemoryUserRepository,
        mailer: WelcomeMailer,
    ) -> None:
        self.validator = validator
        self.hasher = hasher
        self.repository = repository
        self.mailer = mailer

    def register(self, email: str, password: str) -> User:
        self.validator.validate(email, password)

        if self.repository.exists(email):
            raise ValueError("This email is already registered")

        user = User(email, self.hasher.hash(password))
        self.repository.save(user)
        self.mailer.send(email)

        return user
