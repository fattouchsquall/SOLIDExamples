namespace Solid.Exercises.InterfaceSegregation.Exercise;

public interface IFileStorage
{
    string Read(string path);

    void Write(string path, string content);

    void Delete(string path);

    string SignedUrl(string path, int expiresInSeconds);
}

public sealed class S3Storage : IFileStorage
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

public sealed class LocalDiskStorage : IFileStorage
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
        throw new NotSupportedException("Local disk cannot generate signed URLs");
}

public sealed class ReportViewer
{
    private readonly IFileStorage _storage;

    public ReportViewer(IFileStorage storage)
    {
        _storage = storage;
    }

    public string Show(string path) => _storage.Read(path);
}

public sealed class ReportSharer
{
    private readonly IFileStorage _storage;

    public ReportSharer(IFileStorage storage)
    {
        _storage = storage;
    }

    public string Share(string path) => $"Download your report: {_storage.SignedUrl(path, 3600)}";
}
