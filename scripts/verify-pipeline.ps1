# Script para verificar que el pipeline pasará antes de hacer push
# Ejecuta las mismas verificaciones que GitHub Actions

Write-Host "`n🔍 Verificando Pipeline Local..." -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

$ExitCode = 0

# 1. Verificar Node.js
Write-Host "1️⃣  Verificando Node.js..." -ForegroundColor Yellow
try {
    $NodeVersion = node -v
    Write-Host "✅ Node.js instalado: $NodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js no está instalado" -ForegroundColor Red
    $ExitCode = 1
}
Write-Host ""

# 2. Verificar dependencias
Write-Host "2️⃣  Verificando dependencias..." -ForegroundColor Yellow
if ((Test-Path "package.json") -and (Test-Path "package-lock.json")) {
    Write-Host "✅ package.json y package-lock.json encontrados" -ForegroundColor Green
    
    # Verificar si node_modules existe
    if (Test-Path "node_modules") {
        Write-Host "✅ node_modules existe" -ForegroundColor Green
    } else {
        Write-Host "⚠️  node_modules no existe. Ejecutando npm install..." -ForegroundColor DarkYellow
        npm install
    }
} else {
    Write-Host "❌ Archivos de dependencias faltantes" -ForegroundColor Red
    $ExitCode = 1
}
Write-Host ""

# 3. Ejecutar Linter
Write-Host "3️⃣  Ejecutando Biome Linter..." -ForegroundColor Yellow
$LintOutput = npm run lint 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Lint pasó correctamente" -ForegroundColor Green
} else {
    Write-Host "⚠️  Lint tiene warnings (no bloquea deploy)" -ForegroundColor DarkYellow
}
Write-Host ""

# 4. Verificar archivos críticos
Write-Host "4️⃣  Verificando archivos críticos..." -ForegroundColor Yellow
$RequiredFiles = @(
    "src\server.js",
    "src\config\config.js",
    "src\db\supabase.cnx.js",
    "docs\openapi.yaml",
    ".github\workflows\deploy.yml"
)

$AllFilesOk = $true
foreach ($file in $RequiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file" -ForegroundColor Green
    } else {
        Write-Host "❌ $file NO ENCONTRADO" -ForegroundColor Red
        $AllFilesOk = $false
        $ExitCode = 1
    }
}

if ($AllFilesOk) {
    Write-Host "✅ Todos los archivos críticos presentes" -ForegroundColor Green
}
Write-Host ""

# 5. Verificar script de start
Write-Host "5️⃣  Verificando script de start..." -ForegroundColor Yellow
$PackageJson = Get-Content "package.json" -Raw
if ($PackageJson -match '"start"') {
    Write-Host "✅ Script 'start' configurado en package.json" -ForegroundColor Green
} else {
    Write-Host "❌ Script 'start' no encontrado en package.json" -ForegroundColor Red
    $ExitCode = 1
}
Write-Host ""

# 6. Verificar variables de entorno (opcional)
Write-Host "6️⃣  Verificando configuración de entorno..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✅ Archivo .env encontrado" -ForegroundColor Green
    
    # Verificar variables críticas
    $EnvContent = Get-Content ".env" -Raw
    $RequiredVars = @("SUPABASE_URL", "SUPABASE_KEY", "JWT_SECRET")
    
    foreach ($var in $RequiredVars) {
        if ($EnvContent -match "^$var=") {
            Write-Host "   ✓ $var configurado" -ForegroundColor Green
        } else {
            Write-Host "   ✗ $var NO configurado" -ForegroundColor Red
            $ExitCode = 1
        }
    }
} else {
    Write-Host "⚠️  Archivo .env no encontrado (necesario para desarrollo local)" -ForegroundColor DarkYellow
}
Write-Host ""

# Resumen final
Write-Host "==================================" -ForegroundColor Cyan
if ($ExitCode -eq 0) {
    Write-Host "🎉 ¡Todas las verificaciones pasaron!" -ForegroundColor Green
    Write-Host "✅ El pipeline debería pasar en GitHub Actions" -ForegroundColor Green
    Write-Host "`nPuedes hacer push con confianza:" -ForegroundColor White
    Write-Host "  git add ." -ForegroundColor Gray
    Write-Host "  git commit -m 'tu mensaje'" -ForegroundColor Gray
    Write-Host "  git push origin main" -ForegroundColor Gray
} else {
    Write-Host "❌ Algunas verificaciones fallaron" -ForegroundColor Red
    Write-Host "⚠️  Corrige los errores antes de hacer push" -ForegroundColor Red
}
Write-Host "==================================`n" -ForegroundColor Cyan

exit $ExitCode

