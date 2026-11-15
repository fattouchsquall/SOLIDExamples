using System.Security.Cryptography;
using System.Text;

namespace Solid.Exercises.SingleResponsibility.Solution;

public record User(string Email, string PasswordHash);

public sealed class UserValidator
{
    public void Validate(string email, string password)
    {
        if (!email.Contains('@'))
        {
            throw new ArgumentException("Invalid email");
        }

        if (password.Length < 8)
        {
            throw new ArgumentException("The password must contain at least 8 characters");
        }
    }
}

public sealed class PasswordHasher
{
    public string Hash(string password) => Convert.ToHexStringLower(SHA256.HashData(Encoding.UTF8.GetBytes(password)));
}

public sealed class InMemoryUserRepository
{
    private readonly List<User> _users = [];

    public bool Exists(string email) => _users.Any(user => user.Email == email);

    public void Save(User user)
    {
        _users.Add(user);
    }
}

public sealed class WelcomeMailer
{
    public void Send(string email)
    {
        Console.WriteLine($"[Email] To: {email} | Welcome! Your account is ready.");
    }
}

public sealed class UserRegistration
{
    private readonly UserValidator _validator;
    private readonly PasswordHasher _hasher;
    private readonly InMemoryUserRepository _repository;
    private readonly WelcomeMailer _mailer;

    public UserRegistration(
        UserValidator validator,
        PasswordHasher hasher,
        InMemoryUserRepository repository,
        WelcomeMailer mailer)
    {
        _validator = validator;
        _hasher = hasher;
        _repository = repository;
        _mailer = mailer;
    }

    public User Register(string email, string password)
    {
        _validator.Validate(email, password);

        if (_repository.Exists(email))
        {
            throw new ArgumentException("This email is already registered");
        }

        var user = new User(email, _hasher.Hash(password));
        _repository.Save(user);
        _mailer.Send(email);

        return user;
    }
}
