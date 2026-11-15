import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

public final class Solution {
    private Solution() {
    }

    public interface ReadableStorage {
        String read(String path);
    }

    public interface WritableStorage {
        void write(String path, String content);

        void delete(String path);
    }

    public interface SignedUrlProvider {
        String signedUrl(String path, int expiresInSeconds);
    }

    public static final class S3Storage implements ReadableStorage, WritableStorage, SignedUrlProvider {
        private final Map<String, String> files = new HashMap<>();

        @Override
        public String read(String path) {
            String content = files.get(path);

            if (content == null) {
                throw new NoSuchElementException("File not found: " + path);
            }

            return content;
        }

        @Override
        public void write(String path, String content) {
            files.put(path, content);
        }

        @Override
        public void delete(String path) {
            files.remove(path);
        }

        @Override
        public String signedUrl(String path, int expiresInSeconds) {
            return "https://my-bucket.s3.amazonaws.com/" + path + "?expires=" + expiresInSeconds;
        }
    }

    public static final class LocalDiskStorage implements ReadableStorage, WritableStorage {
        private final Map<String, String> files = new HashMap<>();

        @Override
        public String read(String path) {
            String content = files.get(path);

            if (content == null) {
                throw new NoSuchElementException("File not found: " + path);
            }

            return content;
        }

        @Override
        public void write(String path, String content) {
            files.put(path, content);
        }

        @Override
        public void delete(String path) {
            files.remove(path);
        }
    }

    public static final class ReportViewer {
        private final ReadableStorage storage;

        public ReportViewer(ReadableStorage storage) {
            this.storage = storage;
        }

        public String show(String path) {
            return storage.read(path);
        }
    }

    public static final class ReportSharer {
        private final SignedUrlProvider urls;

        public ReportSharer(SignedUrlProvider urls) {
            this.urls = urls;
        }

        public String share(String path) {
            return "Download your report: " + urls.signedUrl(path, 3600);
        }
    }
}
