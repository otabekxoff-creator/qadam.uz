const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Simple build script that transpiles TypeScript without type checking
console.log('🔨 Building backend...');

try {
  // Generate Prisma client first
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Use tsc with transpile-only mode
  console.log('🔧 Transpiling TypeScript (skipping type check)...');
  execSync('npx tsc --noEmitOnError --skipLibCheck', { stdio: 'inherit' });
  
  console.log('✅ Build completed!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
