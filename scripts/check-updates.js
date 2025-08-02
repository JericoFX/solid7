#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

const GITHUB_API = 'https://api.github.com/repos/khang-nd/7.css/releases/latest';
const PACKAGE_JSON_PATH = path.join(__dirname, '..', 'package.json');

function fetchLatestVersion() {
  return new Promise((resolve, reject) => {
    https.get(GITHUB_API, {
      headers: {
        'User-Agent': 'solid-7css-updater'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const release = JSON.parse(data);
          resolve(release.tag_name.replace(/^v/, ''));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  return packageJson.dependencies['7.css'].replace(/^[\^~]/, '');
}

function updatePackageJson(newVersion) {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  packageJson.dependencies['7.css'] = `^${newVersion}`;
  fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2) + '\n');
}

async function main() {
  try {
    console.log('🔍 Checking for 7.css updates...');
    
    const latestVersion = await fetchLatestVersion();
    const currentVersion = getCurrentVersion();
    
    console.log(`📦 Current version: ${currentVersion}`);
    console.log(`🆕 Latest version: ${latestVersion}`);
    
    if (latestVersion !== currentVersion) {
      console.log('⚡ Update available!');
      
      if (process.argv.includes('--auto-update')) {
        updatePackageJson(latestVersion);
        console.log('✅ Updated package.json');
        console.log('💡 Run "npm install" to install the new version');
        
        // Create update report
        const report = {
          timestamp: new Date().toISOString(),
          previousVersion: currentVersion,
          newVersion: latestVersion,
          autoUpdated: true
        };
        
        fs.writeFileSync(
          path.join(__dirname, '..', 'LAST_UPDATE.json'),
          JSON.stringify(report, null, 2)
        );
      } else {
        console.log('💡 Run with --auto-update to automatically update package.json');
      }
      
      process.exit(1); // Exit with error code to indicate update needed
    } else {
      console.log('✅ Already up to date');
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Error checking for updates:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}