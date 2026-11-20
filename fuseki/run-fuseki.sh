#!/usr/bin/env bash
set -e

echo "==================================================="
echo "Starting Apache Jena Fuseki (Standalone)"
echo "Project: Mortal Kombat Knowledge Nexus"
echo "==================================================="

# 1. Check Java
if ! command -v java &> /dev/null; then
    echo "[ERROR] Java runtime not found in PATH. Install OpenJDK 17 or 21."
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export FUSEKI_BASE="$SCRIPT_DIR"

# 2. Find Fuseki Home directory
FUSEKI_HOME=$(find "$SCRIPT_DIR" -maxdepth 1 -type d -name "apache-jena-fuseki-*" | head -n 1)

if [ -z "$FUSEKI_HOME" ]; then
    echo "[ERROR] Apache Jena Fuseki distribution not found in $SCRIPT_DIR"
    echo "Download from https://jena.apache.org/download/ and extract into $SCRIPT_DIR"
    exit 1
fi

echo "[INFO] FUSEKI_HOME: $FUSEKI_HOME"
echo "[INFO] FUSEKI_BASE: $FUSEKI_BASE"
echo "[INFO] Starting Fuseki on http://localhost:3030/mk_nexus ..."

cd "$FUSEKI_HOME"
./fuseki-server --base="$FUSEKI_BASE" --port=3030
