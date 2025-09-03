# Use this script to verify files before building
$requiredFiles = @(
    "index.html",
    "src/main.jsx",
    "src/App.jsx",
    "src/index.css",
    "src/theme.css",
    "src/calendar.css",
    "src/fonts.css",
    "postcss.config.cjs",
    "vite.config.js",
    "tailwind.config.cjs"
)

$missingFiles = @()
foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "Missing required files:"
    $missingFiles | ForEach-Object { Write-Host "- $_" }
    exit 1
}

Write-Host "All required files present. Running build..."
npm run build
