using System.Security.Cryptography;
using System.Text;

namespace Solid.Exercises.SingleResponsibility.Exercise;

public record User(string Email, string PasswordHash);

public sealed class UserRegistration
{
    private readonly List<User> _users = [];

    public User Register(string email, string password)
    {
        if (!email.Contains('@'))
        {
            throw new ArgumentException("Invalid email");
        }

        if (password.Length < 8)
        {
            throw new ArgumentException("The password must contain at least 8 characters");
        }

        if (_users.Any(user => user.Email == email))
        {
            throw new ArgumentException("This email is already registered");
        }

        var user = new User(email, Convert.ToHexStringLower(SHA256.HashData(Encoding.UTF8.GetBytes(password))));
        _users.Add(user);
        Console.WriteLine($"[Email] To: {email} | Welcome! Your account is ready.");

        return user;
    }
}
