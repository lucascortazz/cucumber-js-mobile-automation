#!/usr/bin/env node

// Test the super smart parser without actually running tests
const fs = require('fs');
const path = require('path');

// Mock the main components from super-smart-parser.js
function scanAppDirectory() {
  const appDir = path.join(__dirname, '..', 'app');
  const apps = {
    ios: {
      ipa: [],
      app: []
    },
    android: {
      apk: [],
      aab: []
    }
  };

  if (!fs.existsSync(appDir)) {
    return apps;
  }

  const files = fs.readdirSync(appDir);
  
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(appDir, file);
    
    if (fs.statSync(filePath).isFile()) {
      switch (ext) {
        case '.ipa':
          apps.ios.ipa.push(file);
          break;
        case '.app':
          apps.ios.app.push(file);
          break;
        case '.apk':
          apps.android.apk.push(file);
          break;
        case '.aab':
          apps.android.aab.push(file);
          break;
      }
    }
  });

  return apps;
}

function selectAppForPlatform(apps, platform) {
  if (platform === 'iOS') {
    const hasIpa = apps.ios.ipa.length > 0;
    const hasApp = apps.ios.app.length > 0;
    
    if (!hasIpa && !hasApp) {
      return { status: 'no_app', message: 'No iOS app files found' };
    }
    
    if (hasIpa && hasApp) {
      return { status: 'multiple', message: 'Both .ipa and .app files found - user choice needed' };
    }
    
    if (hasIpa) {
      return { status: 'ipa', file: apps.ios.ipa[0], environment: 'browserstack' };
    }
    
    if (hasApp) {
      return { status: 'app', file: apps.ios.app[0], environment: 'simulator' };
    }
  }
  
  if (platform === 'Android') {
    const hasApk = apps.android.apk.length > 0;
    const hasAab = apps.android.aab.length > 0;
    
    if (!hasApk && !hasAab) {
      return { status: 'no_app', message: 'No Android app files found' };
    }
    
    const appFile = hasApk ? apps.android.apk[0] : apps.android.aab[0];
    const appType = hasApk ? 'apk' : 'aab';
    
    return { status: appType, file: appFile, environment: 'browserstack' };
  }
  
  return { status: 'unknown', message: 'Unknown platform' };
}

function testScenarios() {
  console.log('🧪 Testing Super Smart Parser Logic\n');
  
  // Scan actual app directory
  const apps = scanAppDirectory();
  
  console.log('📁 Current App Directory Contents:');
  console.log('━'.repeat(50));
  
  if (apps.ios.ipa.length > 0) {
    console.log(`📱 iOS (.ipa): ${apps.ios.ipa.join(', ')}`);
  }
  if (apps.ios.app.length > 0) {
    console.log(`📲 iOS (.app): ${apps.ios.app.join(', ')}`);
  }
  if (apps.android.apk.length > 0) {
    console.log(`🤖 Android (.apk): ${apps.android.apk.join(', ')}`);
  }
  if (apps.android.aab.length > 0) {
    console.log(`📦 Android (.aab): ${apps.android.aab.join(', ')}`);
  }
  
  if (apps.ios.ipa.length === 0 && apps.ios.app.length === 0 && 
      apps.android.apk.length === 0 && apps.android.aab.length === 0) {
    console.log('📭 No app files found');
  }
  
  console.log('\n🎯 Smart Selection Logic:');
  console.log('━'.repeat(50));
  
  // Test iOS selection
  const iosChoice = selectAppForPlatform(apps, 'iOS');
  console.log(`📱 iOS Platform: ${iosChoice.status}`);
  if (iosChoice.file) {
    console.log(`   File: ${iosChoice.file}`);
    console.log(`   Environment: ${iosChoice.environment}`);
  } else {
    console.log(`   Message: ${iosChoice.message}`);
  }
  
  // Test Android selection
  const androidChoice = selectAppForPlatform(apps, 'Android');
  console.log(`🤖 Android Platform: ${androidChoice.status}`);
  if (androidChoice.file) {
    console.log(`   File: ${androidChoice.file}`);
    console.log(`   Environment: ${androidChoice.environment}`);
  } else {
    console.log(`   Message: ${androidChoice.message}`);
  }
  
  console.log('\n💡 Smart Parser Intelligence:');
  console.log('━'.repeat(50));
  console.log('✅ .ipa files → BrowserStack real devices');
  console.log('✅ .app files → Local iOS simulator');
  console.log('✅ .apk/.aab files → BrowserStack Android devices');
  console.log('✅ Multiple iOS types → User choice prompt');
  console.log('✅ Auto-detection and smart defaults');
  
  console.log('\n🚀 Ready to test! Use:');
  console.log('node super-smart-parser.js "iPhone 12 with iOS 14"');
}

testScenarios();
