// Register tsconfig-paths with production configuration
const tsConfigPaths = require('tsconfig-paths');
const path = require('path');

// Load the base tsconfig.json
const baseUrl = path.join(__dirname, 'dist');

// Setup paths based on the dist folder structure
const cleanup = tsConfigPaths.register({
  baseUrl,
  paths: {
    '@/*': ['./*'],
    '@/config/*': ['./config/*'],
    '@/controllers/*': ['./controllers/*'],
    '@/middleware/*': ['./middleware/*'],
    '@/routes/*': ['./routes/*'],
    '@/services/*': ['./services/*'],
    '@/types/*': ['./types/*'],
    '@/utils/*': ['./utils/*'],
    '@/validators/*': ['./validators/*']
  }
});

// Now require the main app
require('./dist/app.js');
