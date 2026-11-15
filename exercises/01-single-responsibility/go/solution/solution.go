package solution

import (
	"crypto/sha256"
	"errors"
	"fmt"
	"strings"
)

type User struct {
	Email        string
	PasswordHash string
}

type UserValidator struct{}

func (UserValidator) Validate(email, password string) error {
	if !strings.Contains(email, "@") {
		return errors.New("invalid email")
	}

	if len(password) < 8 {
		return errors.New("the password must contain at least 8 characters")
	}

	return nil
}

type PasswordHasher struct{}

func (PasswordHasher) Hash(password string) string {
	return fmt.Sprintf("%x", sha256.Sum256([]byte(password)))
}

type InMemoryUserRepository struct {
	Users []User
}

func (r *InMemoryUserRepository) Exists(email string) bool {
	for _, user := range r.Users {
		if user.Email == email {
			return true
		}
	}

	return false
}

func (r *InMemoryUserRepository) Save(user User) {
	r.Users = append(r.Users, user)
}

type WelcomeMailer struct{}

func (WelcomeMailer) Send(email string) {
	fmt.Printf("[Email] To: %s | Welcome! Your account is ready.\n", email)
}

type UserRegistration struct {
	validator  UserValidator
	hasher     PasswordHasher
	repository *InMemoryUserRepository
	mailer     WelcomeMailer
}

func NewUserRegistration(
	validator UserValidator,
	hasher PasswordHasher,
	repository *InMemoryUserRepository,
	mailer WelcomeMailer,
) *UserRegistration {
	return &UserRegistration{validator: validator, hasher: hasher, repository: repository, mailer: mailer}
}

func (r *UserRegistration) Register(email, password string) (User, error) {
	if err := r.validator.Validate(email, password); err != nil {
		return User{}, err
	}

	if r.repository.Exists(email) {
		return User{}, errors.New("this email is already registered")
	}

	user := User{Email: email, PasswordHash: r.hasher.Hash(password)}
	r.repository.Save(user)
	r.mailer.Send(email)

	return user, nil
}
