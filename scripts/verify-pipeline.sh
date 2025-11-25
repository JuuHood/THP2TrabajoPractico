#!/bin/bash

# Script para verificar que el pipeline pasará antes de hacer push
# Ejecuta las mismas verificaciones que GitHub Actions

echo "🔍 Verificando Pipeline Local..."
echo "=================================="
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

EXIT_CODE=0

# 1. Verificar Node.js
echo "1️⃣  Verificando Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js instalado: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    EXIT_CODE=1
fi
echo ""

# 2. Verificar dependencias
echo "2️⃣  Verificando dependencias..."
if [ -f "package.json" ] && [ -f "package-lock.json" ]; then
    echo -e "${GREEN}✅ package.json y package-lock.json encontrados${NC}"
    
    # Verificar si node_modules existe
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✅ node_modules existe${NC}"
    else
        echo -e "${YELLOW}⚠️  node_modules no existe. Ejecutando npm install...${NC}"
        npm install
    fi
else
    echo -e "${RED}❌ Archivos de dependencias faltantes${NC}"
    EXIT_CODE=1
fi
echo ""

# 3. Ejecutar Linter
echo "3️⃣  Ejecutando Biome Linter..."
if npm run lint; then
    echo -e "${GREEN}✅ Lint pasó correctamente${NC}"
else
    echo -e "${YELLOW}⚠️  Lint tiene warnings (no bloquea deploy)${NC}"
fi
echo ""

# 4. Verificar archivos críticos
echo "4️⃣  Verificando archivos críticos..."
REQUIRED_FILES=(
    "src/server.js"
    "src/config/config.js"
    "src/db/supabase.cnx.js"
    "docs/openapi.yaml"
    ".github/workflows/deploy.yml"
)

ALL_FILES_OK=true
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅ $file${NC}"
    else
        echo -e "${RED}❌ $file NO ENCONTRADO${NC}"
        ALL_FILES_OK=false
        EXIT_CODE=1
    fi
done

if [ "$ALL_FILES_OK" = true ]; then
    echo -e "${GREEN}✅ Todos los archivos críticos presentes${NC}"
fi
echo ""

# 5. Verificar script de start
echo "5️⃣  Verificando script de start..."
if grep -q '"start"' package.json; then
    echo -e "${GREEN}✅ Script 'start' configurado en package.json${NC}"
else
    echo -e "${RED}❌ Script 'start' no encontrado en package.json${NC}"
    EXIT_CODE=1
fi
echo ""

# 6. Verificar variables de entorno (opcional)
echo "6️⃣  Verificando configuración de entorno..."
if [ -f ".env" ]; then
    echo -e "${GREEN}✅ Archivo .env encontrado${NC}"
    
    # Verificar variables críticas
    REQUIRED_VARS=("SUPABASE_URL" "SUPABASE_KEY" "JWT_SECRET")
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${var}=" .env; then
            echo -e "${GREEN}   ✓ $var configurado${NC}"
        else
            echo -e "${RED}   ✗ $var NO configurado${NC}"
            EXIT_CODE=1
        fi
    done
else
    echo -e "${YELLOW}⚠️  Archivo .env no encontrado (necesario para desarrollo local)${NC}"
fi
echo ""

# Resumen final
echo "=================================="
if [ $EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}🎉 ¡Todas las verificaciones pasaron!${NC}"
    echo -e "${GREEN}✅ El pipeline debería pasar en GitHub Actions${NC}"
    echo ""
    echo "Puedes hacer push con confianza:"
    echo "  git add ."
    echo "  git commit -m 'tu mensaje'"
    echo "  git push origin main"
else
    echo -e "${RED}❌ Algunas verificaciones fallaron${NC}"
    echo -e "${RED}⚠️  Corrige los errores antes de hacer push${NC}"
fi
echo "=================================="

exit $EXIT_CODE

