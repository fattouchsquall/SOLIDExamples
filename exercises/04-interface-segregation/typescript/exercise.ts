export interface FileStorage {
  read(path: string): string;
  write(path: string, content: string): void;
  delete(path: string): void;
  signedUrl(path: string, expiresInSeconds: number): string;
}

export class S3Storage implements FileStorage {
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

export class LocalDiskStorage implements FileStorage {
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

  signedUrl(): string {
    throw new Error('Local disk cannot generate signed URLs');
  }
}

export class ReportViewer {
  readonly storage: FileStorage;

  constructor(storage: FileStorage) {
    this.storage = storage;
  }

  show(path: string): string {
    return this.storage.read(path);
  }
}

export class ReportSharer {
  readonly storage: FileStorage;

  constructor(storage: FileStorage) {
    this.storage = storage;
  }

  share(path: string): string {
    return `Download your report: ${this.storage.signedUrl(path, 3600)}`;
  }
}
