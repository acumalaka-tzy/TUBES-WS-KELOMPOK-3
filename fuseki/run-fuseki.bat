@echo off
setlocal

echo ===================================================
echo Starting Apache Jena Fuseki (Standalone)
echo Project: Mortal Kombat Knowledge Nexus
echo ===================================================

REM 1. Check Java
java -version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Java runtime not found. Please install Java 17 or Java 21 LTS and ensure 'java' is in PATH.
    pause
    exit /b 1
)

REM 2. Set Fuseki Base to current fuseki directory
set "SCRIPT_DIR=%~dp0"
set "FUSEKI_BASE=%SCRIPT_DIR%"

REM 3. Search for Fuseki installation folder
for /d %%D in ("%SCRIPT_DIR%apache-jena-fuseki-*") do (
    set "FUSEKI_HOME=%%D"
)

if not defined FUSEKI_HOME (
    echo [ERROR] Apache Jena Fuseki distribution not found in %SCRIPT_DIR%
    echo Please run powershell -ExecutionPolicy Bypass -File "%SCRIPT_DIR%setup-fuseki.ps1"
    echo or download Apache Jena Fuseki manually from https://jena.apache.org/download/
    pause
    exit /b 1
)

echo [INFO] FUSEKI_HOME: %FUSEKI_HOME%
echo [INFO] FUSEKI_BASE: %FUSEKI_BASE%
echo [INFO] Serving dataset: mk_nexus on http://localhost:3030/mk_nexus
echo [INFO] Press Ctrl+C to stop server.

cd /d "%FUSEKI_HOME%"
fuseki-server.bat --base="%FUSEKI_BASE%" --port=3030

endlocal
