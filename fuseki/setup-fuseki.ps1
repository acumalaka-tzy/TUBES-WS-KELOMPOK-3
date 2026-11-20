<#
.SYNOPSIS
    Automated downloader and setup for Apache Jena Fuseki standalone distribution.
.DESCRIPTION
    Downloads official Apache Jena Fuseki zip archive and extracts into the fuseki/ directory.
#>

$ErrorActionPreference = "Stop"
$FusekiVersion = "5.2.0"
$ZipName = "apache-jena-fuseki-$FusekiVersion.zip"
$TargetDir = $PSScriptRoot

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "Apache Jena Fuseki Standalone Setup ($FusekiVersion)" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

# Check if already installed
$ExistingDir = Get-ChildItem -Path $TargetDir -Directory -Filter "apache-jena-fuseki-*" | Select-Object -First 1
if ($ExistingDir) {
    Write-Host "[OK] Apache Jena Fuseki is already installed in: $($ExistingDir.FullName)" -ForegroundColor Green
    exit 0
}

# Download URL candidates (Apache archive / mirror)
$Urls = @(
    "https://archive.apache.org/dist/jena/binaries/$ZipName",
    "https://dlcdn.apache.org/jena/binaries/$ZipName"
)

$ZipPath = Join-Path $TargetDir $ZipName
$Downloaded = $false

foreach ($Url in $Urls) {
    try {
        Write-Host "[INFO] Downloading Fuseki from $Url ..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri $Url -OutFile $ZipPath -UseBasicParsing
        $Downloaded = $true
        break
    } catch {
        Write-Host "[WARN] Failed from $Url, trying next mirror..." -ForegroundColor Gray
    }
}

if (-not $Downloaded -or -not (Test-Path $ZipPath)) {
    Write-Host "[ERROR] Could not automatically download Apache Jena Fuseki." -ForegroundColor Red
    Write-Host "Please download $ZipName manually from https://jena.apache.org/download/ and place it into $TargetDir" -ForegroundColor Red
    exit 1
}

Write-Host "[INFO] Extracting $ZipName to $TargetDir ..." -ForegroundColor Yellow
Expand-Archive -Path $ZipPath -DestinationPath $TargetDir -Force

Remove-Item -Path $ZipPath -Force
Write-Host "[SUCCESS] Apache Jena Fuseki installed successfully!" -ForegroundColor Green
Write-Host "Run .\run-fuseki.bat or npm run fuseki to start." -ForegroundColor Cyan
