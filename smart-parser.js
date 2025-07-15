#!/usr/bin/env node

const { spawn } = require('child_process');

// Device mappings for natural language parsing
const deviceMappings = {
  // iPhone variations
  'iphone 14 pro max': 'iPhone 14 Pro Max',
  'iphone 14 pro': 'iPhone 14 Pro',
  'iphone 14 plus': 'iPhone 14 Plus',
  'iphone 14': 'iPhone 14',
  'iphone 13 pro max': 'iPhone 13 Pro Max',
  'iphone 13 pro': 'iPhone 13 Pro',
  'iphone 13 mini': 'iPhone 13 mini',
  'iphone 13': 'iPhone 13',
  'iphone 12 pro max': 'iPhone 12 Pro Max',
  'iphone 12 pro': 'iPhone 12 Pro',
  'iphone 12 mini': 'iPhone 12 mini',
  'iphone 12': 'iPhone 12',
  'iphone 11 pro': 'iPhone 11 Pro',
  'iphone 11': 'iPhone 11',
  'iphone se': 'iPhone SE 2022',
  'iphone xs': 'iPhone XS',
  'iphone xr': 'iPhone XR',
  'iphone x': 'iPhone X',
  'iphone 8 plus': 'iPhone 8 Plus',
  'iphone 8': 'iPhone 8',
  
  // Android variations
  'pixel 7': 'Google Pixel 7',
  'pixel 6': 'Google Pixel 6',
  'pixel 5': 'Google Pixel 5',
  'pixel 4': 'Google Pixel 4',
  'galaxy s23': 'Samsung Galaxy S23',
  'galaxy s22': 'Samsung Galaxy S22',
  'galaxy s21': 'Samsung Galaxy S21',
  'galaxy s20': 'Samsung Galaxy S20',
  'samsung s23': 'Samsung Galaxy S23',
  'samsung s22': 'Samsung Galaxy S22',
  'samsung s21': 'Samsung Galaxy S21',
  'samsung s20': 'Samsung Galaxy S20',
  'galaxy note 20': 'Samsung Galaxy Note 20',
  'oneplus 9': 'OnePlus 9',
  'oneplus 8': 'OnePlus 8'
};

function parseEnglishPrompt(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  const devices = [];
  
  // Split by common conjunctions to find multiple device requests
  const segments = lowerPrompt.split(/\band\b|\,|\;/).map(s => s.trim());
  
  for (const segment of segments) {
    const deviceConfig = parseDeviceFromSegment(segment);
    if (deviceConfig) {
      devices.push(deviceConfig);
    }
  }
  
  // If no devices found, try parsing the whole prompt as one device
  if (devices.length === 0) {
    const deviceConfig = parseDeviceFromSegment(lowerPrompt);
    if (deviceConfig) {
      devices.push(deviceConfig);
    }
  }
  
  return devices;
}

function parseDeviceFromSegment(segment) {
  let device = null;
  let osVersion = null;
  let platform = null;
  
  // Find device name
  for (const [key, value] of Object.entries(deviceMappings)) {
    if (segment.includes(key)) {
      device = value;
      break;
    }
  }
  
  if (!device) return null;
  
  // Determine platform based on device
  if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('ipad')) {
    platform = 'iOS';
    osVersion = '16'; // default iOS version
  } else if (device.toLowerCase().includes('pixel') || 
             device.toLowerCase().includes('galaxy') || 
             device.toLowerCase().includes('samsung') ||
             device.toLowerCase().includes('oneplus')) {
    platform = 'Android';
    osVersion = '11'; // default Android version
  }
  
  // Look for "iOS 14", "android 11" patterns first
  const iosMatch = segment.match(/ios\s+(\d+)/);
  const androidMatch = segment.match(/android\s+(\d+)/);
  
  if (iosMatch) {
    osVersion = iosMatch[1];
    platform = 'iOS';
  } else if (androidMatch) {
    osVersion = androidMatch[1];
    platform = 'Android';
  } else {
    // Look for "with 14", "version 16" patterns
    const withMatch = segment.match(/with\s+(\d+)/);
    if (withMatch) {
      const version = parseInt(withMatch[1]);
      if (platform === 'iOS' && version >= 12 && version <= 17) {
        osVersion = withMatch[1];
      } else if (platform === 'Android' && version >= 8 && version <= 14) {
        osVersion = withMatch[1];
      }
    }
  }
  
  return { device, osVersion, platform };
}

function displayDeviceList(devices) {
  console.log('\n📱 Parsed Device Configuration:');
  console.log('━'.repeat(50));
  devices.forEach((config, index) => {
    const supportStatus = config.platform === 'iOS' ? '✅ Supported' : '⚠️  iOS Only (Android support coming soon)';
    console.log(`${index + 1}. ${config.device}`);
    console.log(`   Platform: ${config.platform}`);
    console.log(`   OS Version: ${config.osVersion}`);
    console.log(`   Status: ${supportStatus}`);
    console.log('');
  });
  
  // Filter to only iOS devices for actual testing
  const iosDevices = devices.filter(device => device.platform === 'iOS');
  if (iosDevices.length < devices.length) {
    console.log('📝 Note: Only iOS devices will be tested in this session.');
    console.log('   Android support requires uploading a custom APK to BrowserStack.\n');
  }
  
  return iosDevices;
}

function askForConfirmation() {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    readline.question('🚀 Proceed with testing on these devices? (y/n): ', (answer) => {
      readline.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

async function runTestsOnDevices(devices) {
  console.log('\n🔄 Starting test execution on BrowserStack...\n');
  
  for (let i = 0; i < devices.length; i++) {
    const config = devices[i];
    console.log(`\n🚀 Test ${i + 1}/${devices.length}: ${config.device} (${config.platform} ${config.osVersion})`);
    console.log('━'.repeat(60));
    
    await runSingleTest(config);
    
    if (i < devices.length - 1) {
      console.log('\n⏱️  Waiting 3 seconds before next test...\n');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log('\n🎉 All tests completed!');
}

function runSingleTest(config) {
  return new Promise((resolve) => {
    const env = {
      ...process.env,
      DEVICE: config.device,
      OS_VERSION: config.osVersion,
      PLATFORM: config.platform
    };
    
    const cucumber = spawn('npm', ['test'], {
      env: env,
      stdio: 'inherit'
    });
    
    cucumber.on('close', (code) => {
      const status = code === 0 ? '✅ PASSED' : '❌ FAILED';
      console.log(`\n${status} - ${config.device} (${config.platform} ${config.osVersion})\n`);
      resolve(code === 0);
    });
  });
}

async function main() {
  const prompt = process.argv.slice(2).join(' ');
  
  if (!prompt) {
    console.log('Usage: node smart-parser.js "Please execute this test case on iPhone 12 with iOS 14, iPhone 13 iOS 16 and Samsung S20 Android 11"');
    process.exit(1);
  }
  
  console.log(`\n🧠 Parsing prompt: "${prompt}"`);
  
  const devices = parseEnglishPrompt(prompt);
  
  if (devices.length === 0) {
    console.log('❌ No valid devices found in the prompt. Please specify device names and OS versions.');
    process.exit(1);
  }
  
  const iosDevices = displayDeviceList(devices);
  
  if (iosDevices.length === 0) {
    console.log('❌ No supported iOS devices found in the prompt.');
    console.log('   Please specify iPhone devices for testing.');
    process.exit(1);
  }
  
  const confirmed = await askForConfirmation();
  
  if (confirmed) {
    await runTestsOnDevices(iosDevices);
  } else {
    console.log('❌ Test execution cancelled.');
  }
}

main().catch(console.error);
