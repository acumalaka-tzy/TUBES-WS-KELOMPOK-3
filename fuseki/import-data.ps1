<#
.SYNOPSIS
    Imports the complete Mortal Kombat RDF/OWL Knowledge Graph into Apache Jena Fuseki.
.DESCRIPTION
    Uploads knowledge-base/data/knowledge_graph.ttl to http://localhost:3030/mk_nexus/data?default
    and verifies the loaded triple count via SPARQL.
#>

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent $PSScriptRoot
$KbScript = Join-Path $RepoRoot "knowledge-base\scripts\kb_tools.py"

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "Importing RDF/OWL Knowledge Graph into Fuseki" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

python $KbScript fuseki-load
python $KbScript fuseki-test

Write-Host "[SUCCESS] Dataset imported and all SPARQL queries verified on Fuseki!" -ForegroundColor Green
