package exercise

import (
	"errors"
	"fmt"
)

type FileStorage interface {
	Read(path string) (string, error)
	Write(path, content string)
	Delete(path string)
	SignedURL(path string, expiresInSeconds int) (string, error)
}

type S3Storage struct {
	files map[string]string
}

func NewS3Storage() *S3Storage {
	return &S3Storage{files: map[string]string{}}
}

func (s *S3Storage) Read(path string) (string, error) {
	content, found := s.files[path]
	if !found {
		return "", fmt.Errorf("file not found: %s", path)
	}

	return content, nil
}

func (s *S3Storage) Write(path, content string) {
	s.files[path] = content
}

func (s *S3Storage) Delete(path string) {
	delete(s.files, path)
}

func (s *S3Storage) SignedURL(path string, expiresInSeconds int) (string, error) {
	return fmt.Sprintf("https://my-bucket.s3.amazonaws.com/%s?expires=%d", path, expiresInSeconds), nil
}

type LocalDiskStorage struct {
	files map[string]string
}

func NewLocalDiskStorage() *LocalDiskStorage {
	return &LocalDiskStorage{files: map[string]string{}}
}

func (s *LocalDiskStorage) Read(path string) (string, error) {
	content, found := s.files[path]
	if !found {
		return "", fmt.Errorf("file not found: %s", path)
	}

	return content, nil
}

func (s *LocalDiskStorage) Write(path, content string) {
	s.files[path] = content
}

func (s *LocalDiskStorage) Delete(path string) {
	delete(s.files, path)
}

func (s *LocalDiskStorage) SignedURL(path string, expiresInSeconds int) (string, error) {
	return "", errors.New("local disk cannot generate signed URLs")
}

type ReportViewer struct {
	Storage FileStorage
}

func (v ReportViewer) Show(path string) (string, error) {
	return v.Storage.Read(path)
}

type ReportSharer struct {
	Storage FileStorage
}

func (s ReportSharer) Share(path string) (string, error) {
	url, err := s.Storage.SignedURL(path, 3600)
	if err != nil {
		return "", err
	}

	return "Download your report: " + url, nil
}
