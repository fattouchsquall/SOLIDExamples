import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

public final class Exercise {
    private Exercise() {
    }

    public interface FileStorage {
        String read(String path);

        void write(String path, String content);

        void delete(String path);

        String signedUrl(String path, int expiresInSeconds);
    }

    public static final class S3Storage implements FileStorage {
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

    public static final class LocalDiskStorage implements FileStorage {
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
            throw new UnsupportedOperationException("Local disk cannot generate signed URLs");
        }
    }

    public static final class ReportViewer {
        private final FileStorage storage;

        public ReportViewer(FileStorage storage) {
            this.storage = storage;
        }

        public String show(String path) {
            return storage.read(path);
        }
    }

    public static final class ReportSharer {
        private final FileStorage storage;

        public ReportSharer(FileStorage storage) {
            this.storage = storage;
        }

        public String share(String path) {
            return "Download your report: " + storage.signedUrl(path, 3600);
        }
    }
}
