export class S3Storage {
  constructor() {
    this.files = new Map();
  }

  read(path) {
    const content = this.files.get(path);

    if (content === undefined) {
      throw new Error(`File not found: ${path}`);
    }

    return content;
  }

  write(path, content) {
    this.files.set(path, content);
  }

  delete(path) {
    this.files.delete(path);
  }

  signedUrl(path, expiresInSeconds) {
    return `https://my-bucket.s3.amazonaws.com/${path}?expires=${expiresInSeconds}`;
  }
}

export class LocalDiskStorage {
  constructor() {
    this.files = new Map();
  }

  read(path) {
    const content = this.files.get(path);

    if (content === undefined) {
      throw new Error(`File not found: ${path}`);
    }

    return content;
  }

  write(path, content) {
    this.files.set(path, content);
  }

  delete(path) {
    this.files.delete(path);
  }
}

export class ReportViewer {
  constructor(storage) {
    this.storage = storage;
  }

  show(path) {
    return this.storage.read(path);
  }
}

export class ReportSharer {
  constructor(urls) {
    this.urls = urls;
  }

  share(path) {
    return `Download your report: ${this.urls.signedUrl(path, 3600)}`;
  }
}
