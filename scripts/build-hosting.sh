#!/bin/bash

# Build script optimized for hosting environments
echo "🚀 Starting optimized build for hosting..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf .next
rm -rf out

# Set environment variables for hosting
export NEXT_SKIP_NATIVE_POSTINSTALL=1
export SWC_DISABLE_AST_CACHE=1
export NODE_OPTIONS="--no-deprecation --max-old-space-size=2048"
export NEXT_DISABLE_ESLINT=1
export NEXT_DISABLE_TYPECHECK=1
export NEXT_TELEMETRY_DISABLED=1

# URL буде автоматично визначатися, не потрібно встановлювати NEXT_PUBLIC_SITE_URL
echo "🌐 URL буде автоматично визначено при запуску"

# Install dependencies if needed
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile --production=false

# Build the application
echo "🔨 Building application..."
npx next build

# Check build result
if [ -f ".next/BUILD_ID" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build files created in .next directory"
    ls -la .next/
else
    echo "❌ Build failed!"
    exit 1
fi
