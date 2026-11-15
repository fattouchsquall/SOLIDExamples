export interface ReadableStorage {
  read(path: string): string;
}

export interface WritableStorage {
  write(path: string, content: string): void;
  delete(path: string): void;
}

export interface SignedUrlProvider {
  signedUrl(path: string, expiresInSeconds: number): string;
}

export class S3Storage implements ReadableStorage, WritableStorage, SignedUrlProvider {
  readonly files = new Map<string, string>();

  read(path: string): string {
    const content = this.files.get(path);

    if (content === undefined) {
      throw new Error(`File not found: ${path}`);
    }

    return content;
  }

  write(path: string, content: string): void {
    this.files.set(path, content);
  }

  delete(path: string): void {
    this.files.delete(path);
  }

  signedUrl(path: string, expiresInSeconds: number): string {
    return `https://my-bucket.s3.amazonaws.com/${path}?expires=${expiresInSeconds}`;
  }
}

export class LocalDiskStorage implements ReadableStorage, WritableStorage {
  readonly files = new Map<string, string>();

  read(path: string): string {
    const content = this.files.get(path);

    if (content === undefined) {
      throw new Error(`File not found: ${path}`);
    }

    return content;
  }

  write(path: string, content: string): void {
    this.files.set(path, content);
  }

  delete(path: string): void {
    this.files.delete(path);
  }
}

export class ReportViewer {
  readonly storage: ReadableStorage;

  constructor(storage: ReadableStorage) {
    this.storage = storage;
  }

  show(path: string): string {
    return this.storage.read(path);
  }
}

export class ReportSharer {
  readonly urls: SignedUrlProvider;

  constructor(urls: SignedUrlProvider) {
    this.urls = urls;
  }

  share(path: string): string {
    return `Download your report: ${this.urls.signedUrl(path, 3600)}`;
  }
}
