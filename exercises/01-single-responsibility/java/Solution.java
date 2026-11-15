import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.List;

public final class Solution {
    private Solution() {
    }

    public record User(String email, String passwordHash) {
    }

    public static final class UserValidator {
        public void validate(String email, String password) {
            if (!email.contains("@")) {
                throw new IllegalArgumentException("Invalid email");
            }

            if (password.length() < 8) {
                throw new IllegalArgumentException("The password must contain at least 8 characters");
            }
        }
    }

    public static final class PasswordHasher {
        public String hash(String password) {
            try {
                byte[] digest = MessageDigest.getInstance("SHA-256").digest(password.getBytes(StandardCharsets.UTF_8));
                return HexFormat.of().formatHex(digest);
            } catch (NoSuchAlgorithmException exception) {
                throw new IllegalStateException(exception);
            }
        }
    }

    public static final class InMemoryUserRepository {
        private final List<User> users = new ArrayList<>();

        public boolean exists(String email) {
            return users.stream().anyMatch(user -> user.email().equals(email));
        }

        public void save(User user) {
            users.add(user);
        }
    }

    public static final class WelcomeMailer {
        public void send(String email) {
            System.out.println("[Email] To: " + email + " | Welcome! Your account is ready.");
        }
    }

    public static final class UserRegistration {
        private final UserValidator validator;
        private final PasswordHasher hasher;
        private final InMemoryUserRepository repository;
        private final WelcomeMailer mailer;

        public UserRegistration(
                UserValidator validator,
                PasswordHasher hasher,
                InMemoryUserRepository repository,
                WelcomeMailer mailer) {
            this.validator = validator;
            this.hasher = hasher;
            this.repository = repository;
            this.mailer = mailer;
        }

        public User register(String email, String password) {
            validator.validate(email, password);

            if (repository.exists(email)) {
                throw new IllegalArgumentException("This email is already registered");
            }

            User user = new User(email, hasher.hash(password));
            repository.save(user);
            mailer.send(email);

            return user;
        }
    }
}
