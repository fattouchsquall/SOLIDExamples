package exercise

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

type UserRegistration struct {
	Users []User
}

func (r *UserRegistration) Register(email, password string) (User, error) {
	if !strings.Contains(email, "@") {
		return User{}, errors.New("invalid email")
	}

	if len(password) < 8 {
		return User{}, errors.New("the password must contain at least 8 characters")
	}

	for _, user := range r.Users {
		if user.Email == email {
			return User{}, errors.New("this email is already registered")
		}
	}

	user := User{Email: email, PasswordHash: fmt.Sprintf("%x", sha256.Sum256([]byte(password)))}
	r.Users = append(r.Users, user)
	fmt.Printf("[Email] To: %s | Welcome! Your account is ready.\n", email)

	return user, nil
}
