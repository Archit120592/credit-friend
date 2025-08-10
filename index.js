#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function pathExists(p) {
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
}

function hasPackageJson(dir) {
  return pathExists(path.join(dir, 'package.json'));
}

console.log('Credit Friend - Workspace health check');

const backendDir = path.join(__dirname, 'backend');
const frontendDir = path.join(__dirname, 'frontend');

const backendOk = pathExists(backendDir) && hasPackageJson(backendDir);
const frontendOk = pathExists(frontendDir) && hasPackageJson(frontendDir);

if (backendOk) {
  console.log('✔ backend/ found with package.json');
} else {
  console.log('✖ backend/ missing or lacks package.json');
}

if (frontendOk) {
  console.log('✔ frontend/ found with package.json');
} else {
  console.log('✖ frontend/ missing or lacks package.json');
}

if (!backendOk || !frontendOk) {
  console.log('\nNext steps:');
  console.log('- Please add the missing subproject(s) or generate them.');
  console.log('- See README.md for expected structure and setup.');
  console.log('- You can still run:');
  console.log('    npm run dev    # will skip missing parts gracefully');
  console.log('    npm run build  # will skip if frontend missing');
}

console.log('\nFor deployment guidance, read DEPLOYMENT.md');