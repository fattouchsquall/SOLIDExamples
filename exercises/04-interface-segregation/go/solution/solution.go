package solution

import "fmt"

type ReadableStorage interface {
	Read(path string) (string, error)
}

type WritableStorage interface {
	Write(path, content string)
	Delete(path string)
}

type SignedURLProvider interface {
	SignedURL(path string, expiresInSeconds int) string
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

func (s *S3Storage) SignedURL(path string, expiresInSeconds int) string {
	return fmt.Sprintf("https://my-bucket.s3.amazonaws.com/%s?expires=%d", path, expiresInSeconds)
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

type ReportViewer struct {
	Storage ReadableStorage
}

func (v ReportViewer) Show(path string) (string, error) {
	return v.Storage.Read(path)
}

type ReportSharer struct {
	URLs SignedURLProvider
}

func (s ReportSharer) Share(path string) string {
	return "Download your report: " + s.URLs.SignedURL(path, 3600)
}
