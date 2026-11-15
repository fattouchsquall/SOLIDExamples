import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.List;

public final class Exercise {
    private Exercise() {
    }

    public record User(String email, String passwordHash) {
    }

    public static final class UserRegistration {
        private final List<User> users = new ArrayList<>();

        public User register(String email, String password) {
            if (!email.contains("@")) {
                throw new IllegalArgumentException("Invalid email");
            }

            if (password.length() < 8) {
                throw new IllegalArgumentException("The password must contain at least 8 characters");
            }

            if (users.stream().anyMatch(user -> user.email().equals(email))) {
                throw new IllegalArgumentException("This email is already registered");
            }

            String passwordHash;
            try {
                byte[] digest = MessageDigest.getInstance("SHA-256").digest(password.getBytes(StandardCharsets.UTF_8));
                passwordHash = HexFormat.of().formatHex(digest);
            } catch (NoSuchAlgorithmException exception) {
                throw new IllegalStateException(exception);
            }

            User user = new User(email, passwordHash);
            users.add(user);
            System.out.println("[Email] To: " + email + " | Welcome! Your account is ready.");

            return user;
        }
    }
}
