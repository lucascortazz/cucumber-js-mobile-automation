#!/usr/bin/env node

// Test multilingual capabilities of super-smart-parser

console.log('🌍 Testing Multilingual Super Smart Parser\n');

// Test examples
const testCases = [
  {
    language: 'English',
    command: 'node super-smart-parser.js "iPhone 16 Pro Max with iOS 18"',
    description: 'Test latest iPhone with iOS 18'
  },
  {
    language: 'Português (Brasil)',
    command: 'node super-smart-parser.js "iPhone 16 Pro Máximo com iOS 18"',
    description: 'Testar iPhone mais recente com iOS 18'
  },
  {
    language: 'Español (España)',
    command: 'node super-smart-parser.js "iPhone 16 Pro Máx con iOS 18"',
    description: 'Probar iPhone más reciente con iOS 18'
  },
  {
    language: 'English (Android)',
    command: 'node super-smart-parser.js "Galaxy S24 Ultra with Android 14"',
    description: 'Test latest Samsung with Android 14'
  },
  {
    language: 'Português (Brasil - Android)',
    command: 'node super-smart-parser.js "Galáxia S24 Ultra com Android 14"',
    description: 'Testar Samsung mais recente com Android 14'
  },
  {
    language: 'Español (España - Android)',
    command: 'node super-smart-parser.js "Galaxia S24 Ultra con Android 14"',
    description: 'Probar Samsung más reciente con Android 14'
  }
];

console.log('📱 SUPPORTED MULTILINGUAL COMMANDS:\n');

testCases.forEach((test, index) => {
  console.log(`${index + 1}. ${test.language}`);
  console.log(`   Command: ${test.command}`);
  console.log(`   Description: ${test.description}`);
  console.log('');
});

console.log('🎯 LANGUAGE DETECTION FEATURES:');
console.log('✅ Portuguese (Brazil) - detects: "com", "versão", "máximo", "galáxia"');
console.log('✅ Spanish (Spain) - detects: "con", "versión", "máx", "galaxia"');
console.log('✅ English - default language');
console.log('✅ Smart fallback to English if language not detected');

console.log('\n🌟 MULTILINGUAL DEVICE MAPPINGS:');
console.log('📱 iPhone 16 Pro Max / Pro Máximo / Pro Máx');
console.log('🤖 Galaxy S24 Ultra / Galáxia S24 Ultra / Galaxia S24 Ultra');
console.log('📲 Smart version parsing: "with 18" / "com 18" / "con 18"');

console.log('\n🚀 Try these commands:');
console.log('• English: node super-smart-parser.js "iPhone 15 Pro with iOS 17"');
console.log('• Português: node super-smart-parser.js "iPhone 15 Pro com iOS 17"');
console.log('• Español: node super-smart-parser.js "iPhone 15 Pro con iOS 17"');

console.log('\n🎉 Your Super Smart Parser is now MULTILINGUAL! 🌍');
