namespace Solid.Exercises.InterfaceSegregation.Solution;

public interface IReadableStorage
{
    string Read(string path);
}

public interface IWritableStorage
{
    void Write(string path, string content);

    void Delete(string path);
}

public interface ISignedUrlProvider
{
    string SignedUrl(string path, int expiresInSeconds);
}

public sealed class S3Storage : IReadableStorage, IWritableStorage, ISignedUrlProvider
{
    private readonly Dictionary<string, string> _files = [];

    public string Read(string path) =>
        _files.TryGetValue(path, out var content) ? content : throw new FileNotFoundException($"File not found: {path}");

    public void Write(string path, string content)
    {
        _files[path] = content;
    }

    public void Delete(string path)
    {
        _files.Remove(path);
    }

    public string SignedUrl(string path, int expiresInSeconds) =>
        $"https://my-bucket.s3.amazonaws.com/{path}?expires={expiresInSeconds}";
}

public sealed class LocalDiskStorage : IReadableStorage, IWritableStorage
{
    private readonly Dictionary<string, string> _files = [];

    public string Read(string path) =>
        _files.TryGetValue(path, out var content) ? content : throw new FileNotFoundException($"File not found: {path}");

    public void Write(string path, string content)
    {
        _files[path] = content;
    }

    public void Delete(string path)
    {
        _files.Remove(path);
    }
}

public sealed class ReportViewer
{
    private readonly IReadableStorage _storage;

    public ReportViewer(IReadableStorage storage)
    {
        _storage = storage;
    }

    public string Show(string path) => _storage.Read(path);
}

public sealed class ReportSharer
{
    private readonly ISignedUrlProvider _urls;

    public ReportSharer(ISignedUrlProvider urls)
    {
        _urls = urls;
    }

    public string Share(string path) => $"Download your report: {_urls.SignedUrl(path, 3600)}";
}
