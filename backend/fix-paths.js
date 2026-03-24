const fs = require('fs');
const path = require('path');

// Path mapping from tsconfig.json
const pathMappings = {
  '@/*': '.',
  '@/config/*': './config',
  '@/controllers/*': './controllers',
  '@/middleware/*': './middleware',
  '@/routes/*': './routes',
  '@/services/*': './services',
  '@/types/*': './types',
  '@/utils/*': './utils',
  '@/validators/*': './validators'
};

// Function to resolve alias to relative path
function resolveAlias(importPath, fileDir) {
  // Check each mapping
  for (const [alias, target] of Object.entries(pathMappings)) {
    if (importPath.startsWith(alias.replace('*', ''))) {
      // Get the specific path after the alias
      const aliasPrefix = alias.replace('/*', '');
      const specificPath = importPath.substring(aliasPrefix.length);
      
      // Calculate relative path from file location to target
      const relativePath = path.relative(fileDir, target).replace(/\\/g, '/');
      const prefix = relativePath.startsWith('.') ? relativePath : './' + relativePath;
      
      return prefix + specificPath;
    }
  }
  return null;
}

// Function to process a single file
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const fileDir = path.dirname(filePath);
  let modified = false;

  // Match require statements with aliases
  const requireRegex = /require\(['"](@[^'"]+)['"]\)/g;
  content = content.replace(requireRegex, (match, importPath) => {
    const resolved = resolveAlias(importPath, fileDir);
    if (resolved) {
      modified = true;
      return `require('${resolved}')`;
    }
    return match;
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Fixed paths in ${path.relative(process.cwd(), filePath)}`);
  }
}

// Recursively process all JS files in dist
function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (item.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

console.log('🔧 Fixing path aliases in dist folder...');
try {
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    processDirectory(distPath);
    console.log('✅ Path aliases fixed successfully!');
  } else {
    console.error('❌ dist folder not found');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error fixing paths:', error);
  process.exit(1);
}
