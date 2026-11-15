from abc import ABC, abstractmethod


class ReadableStorage(ABC):
    @abstractmethod
    def read(self, path: str) -> str: ...


class WritableStorage(ABC):
    @abstractmethod
    def write(self, path: str, content: str) -> None: ...

    @abstractmethod
    def delete(self, path: str) -> None: ...


class SignedUrlProvider(ABC):
    @abstractmethod
    def signed_url(self, path: str, expires_in_seconds: int) -> str: ...


class S3Storage(ReadableStorage, WritableStorage, SignedUrlProvider):
    def __init__(self) -> None:
        self.files: dict[str, str] = {}

    def read(self, path: str) -> str:
        if path not in self.files:
            raise FileNotFoundError(f"File not found: {path}")

        return self.files[path]

    def write(self, path: str, content: str) -> None:
        self.files[path] = content

    def delete(self, path: str) -> None:
        self.files.pop(path, None)

    def signed_url(self, path: str, expires_in_seconds: int) -> str:
        return f"https://my-bucket.s3.amazonaws.com/{path}?expires={expires_in_seconds}"


class LocalDiskStorage(ReadableStorage, WritableStorage):
    def __init__(self) -> None:
        self.files: dict[str, str] = {}

    def read(self, path: str) -> str:
        if path not in self.files:
            raise FileNotFoundError(f"File not found: {path}")

        return self.files[path]

    def write(self, path: str, content: str) -> None:
        self.files[path] = content

    def delete(self, path: str) -> None:
        self.files.pop(path, None)


class ReportViewer:
    def __init__(self, storage: ReadableStorage) -> None:
        self.storage = storage

    def show(self, path: str) -> str:
        return self.storage.read(path)


class ReportSharer:
    def __init__(self, urls: SignedUrlProvider) -> None:
        self.urls = urls

    def share(self, path: str) -> str:
        return f"Download your report: {self.urls.signed_url(path, 3600)}"
