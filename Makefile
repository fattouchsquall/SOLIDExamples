JUNIT_VERSION := 1.13.4
JUNIT_JAR := .tools/junit-platform-console-standalone-$(JUNIT_VERSION).jar
PYTHON ?= python3

.PHONY: install test node php python java go csharp clean

install:
	npm install
	composer install

test: node php python java go csharp

node:
	npm test
	npm run typecheck
	@for file in exercises/*/nodejs/*.js; do node --check "$$file" || exit 1; done

php:
	composer test
	@for file in exercises/*/php/*.php; do php -l "$$file" > /dev/null || exit 1; done

python:
	@set -e; for dir in principles/*/python; do \
		echo "==> $$dir"; \
		$(PYTHON) -m unittest discover --start-directory "$$dir" --pattern "*_test.py"; \
	done
	$(PYTHON) -m py_compile exercises/*/python/*.py

java: $(JUNIT_JAR)
	@set -e; for dir in principles/*/java; do \
		echo "==> $$dir"; \
		rm -rf "build/$$dir"; \
		javac -encoding UTF-8 -d "build/$$dir" -cp "$(JUNIT_JAR)" "$$dir"/*.java; \
		java -jar "$(JUNIT_JAR)" execute --class-path "build/$$dir" --select-class GoodTest --disable-banner --details=summary; \
	done
	@set -e; for dir in exercises/*/java; do \
		javac -encoding UTF-8 -d "build/$$dir" "$$dir"/*.java; \
	done

go:
	go vet ./...
	go test ./...

csharp:
	dotnet test --project csharp/Tests/SolidExamples.Tests.csproj
	dotnet build csharp/Exercises/SolidExamples.Exercises.csproj
	@set -e; for dir in principles/*/csharp; do \
		dotnet build "$$dir/Demo.csproj" --nologo --verbosity quiet; \
	done

clean:
	rm -rf build .tools csharp/*/bin csharp/*/obj principles/*/csharp/bin principles/*/csharp/obj

$(JUNIT_JAR):
	mkdir -p .tools
	curl -sSfL -o "$@" "https://repo1.maven.org/maven2/org/junit/platform/junit-platform-console-standalone/$(JUNIT_VERSION)/junit-platform-console-standalone-$(JUNIT_VERSION).jar"
