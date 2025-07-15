#!/usr/bin/env node

// Simple test of the parser without running actual tests
const deviceMappings = {
  'iphone 14 pro': 'iPhone 14 Pro',
  'iphone 14': 'iPhone 14',
  'iphone 13': 'iPhone 13',
  'iphone 12': 'iPhone 12',
  'samsung s20': 'Samsung Galaxy S20',
  'galaxy s20': 'Samsung Galaxy S20',
  'pixel 6': 'Google Pixel 6'
};

function parseDeviceFromSegment(segment) {
  let device = null;
  let osVersion = null;
  let platform = null;
  
  for (const [key, value] of Object.entries(deviceMappings)) {
    if (segment.includes(key)) {
      device = value;
      break;
    }
  }
  
  if (!device) return null;
  
  if (device.toLowerCase().includes('iphone')) {
    platform = 'iOS';
    osVersion = '16';
  } else {
    platform = 'Android';
    osVersion = '11';
  }
  
  // Look for "iOS 14", "android 11" patterns first
  const iosMatch = segment.match(/ios\s+(\d+)/);
  const androidMatch = segment.match(/android\s+(\d+)/);
  
  if (iosMatch) {
    osVersion = iosMatch[1];
  } else if (androidMatch) {
    osVersion = androidMatch[1];
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

function parseEnglishPrompt(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  const devices = [];
  
  const segments = lowerPrompt.split(/\band\b|\,/).map(s => s.trim());
  
  for (const segment of segments) {
    const deviceConfig = parseDeviceFromSegment(segment);
    if (deviceConfig) {
      devices.push(deviceConfig);
    }
  }
  
  return devices;
}

const prompt = process.argv.slice(2).join(' ');
console.log(`\n🧠 Parsing: "${prompt}"`);

const devices = parseEnglishPrompt(prompt);

console.log('\n📱 Detected Devices:');
console.log('━'.repeat(50));
devices.forEach((config, index) => {
  console.log(`${index + 1}. ${config.device}`);
  console.log(`   Platform: ${config.platform}`);
  console.log(`   OS Version: ${config.osVersion}`);
  console.log('');
});

console.log(`\n✅ Found ${devices.length} device(s) to test`);
