from dataclasses import dataclass
from hashlib import sha256


@dataclass(frozen=True)
class User:
    email: str
    password_hash: str


class UserRegistration:
    def __init__(self) -> None:
        self.users: list[User] = []

    def register(self, email: str, password: str) -> User:
        if "@" not in email:
            raise ValueError("Invalid email")

        if len(password) < 8:
            raise ValueError("The password must contain at least 8 characters")

        if any(user.email == email for user in self.users):
            raise ValueError("This email is already registered")

        user = User(email, sha256(password.encode()).hexdigest())
        self.users.append(user)
        print(f"[Email] To: {email} | Welcome! Your account is ready.")

        return user
