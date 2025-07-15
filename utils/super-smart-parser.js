#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Device mappings for natural language parsing (English, Portuguese BR, Spanish ES)
const deviceMappings = {
  // iPhone variations - Latest to Oldest
  // iPhone 16 series (2024) - English
  'iphone 16 pro max': 'iPhone 16 Pro Max',
  'iphone 16 pro': 'iPhone 16 Pro',
  'iphone 16 plus': 'iPhone 16 Plus',
  'iphone 16': 'iPhone 16',
  
  // iPhone 16 series - Portuguese (Brazil)
  'iphone 16 pro máximo': 'iPhone 16 Pro Max',
  'iphone 16 pro maximo': 'iPhone 16 Pro Max',
  'iphone 16 pro': 'iPhone 16 Pro',
  'iphone 16 plus': 'iPhone 16 Plus',
  'iphone 16': 'iPhone 16',
  
  // iPhone 16 series - Spanish (Spain)
  'iphone 16 pro máx': 'iPhone 16 Pro Max',
  'iphone 16 pro max': 'iPhone 16 Pro Max',
  'iphone 16 pro': 'iPhone 16 Pro',
  'iphone 16 plus': 'iPhone 16 Plus',
  'iphone 16': 'iPhone 16',
  
  // iPhone 15 series (2023) - English
  'iphone 15 pro max': 'iPhone 15 Pro Max',
  'iphone 15 pro': 'iPhone 15 Pro',
  'iphone 15 plus': 'iPhone 15 Plus',
  'iphone 15': 'iPhone 15',
  
  // iPhone 15 series - Portuguese (Brazil)
  'iphone 15 pro máximo': 'iPhone 15 Pro Max',
  'iphone 15 pro maximo': 'iPhone 15 Pro Max',
  'iphone 15 pro': 'iPhone 15 Pro',
  'iphone 15 plus': 'iPhone 15 Plus',
  'iphone 15': 'iPhone 15',
  
  // iPhone 15 series - Spanish (Spain)
  'iphone 15 pro máx': 'iPhone 15 Pro Max',
  'iphone 15 pro max': 'iPhone 15 Pro Max',
  'iphone 15 pro': 'iPhone 15 Pro',
  'iphone 15 plus': 'iPhone 15 Plus',
  'iphone 15': 'iPhone 15',
  
  // iPhone 14 series (2022) - English
  'iphone 14 pro max': 'iPhone 14 Pro Max',
  'iphone 14 pro': 'iPhone 14 Pro',
  'iphone 14 plus': 'iPhone 14 Plus',
  'iphone 14': 'iPhone 14',
  
  // iPhone 14 series - Portuguese (Brazil)
  'iphone 14 pro máximo': 'iPhone 14 Pro Max',
  'iphone 14 pro maximo': 'iPhone 14 Pro Max',
  'iphone 14 pro': 'iPhone 14 Pro',
  'iphone 14 plus': 'iPhone 14 Plus',
  'iphone 14': 'iPhone 14',
  
  // iPhone 14 series - Spanish (Spain)
  'iphone 14 pro máx': 'iPhone 14 Pro Max',
  'iphone 14 pro max': 'iPhone 14 Pro Max',
  'iphone 14 pro': 'iPhone 14 Pro',
  'iphone 14 plus': 'iPhone 14 Plus',
  'iphone 14': 'iPhone 14',
  
  // iPhone 13 series (2021)
  'iphone 13 pro max': 'iPhone 13 Pro Max',
  'iphone 13 pro': 'iPhone 13 Pro',
  'iphone 13 mini': 'iPhone 13 mini',
  'iphone 13': 'iPhone 13',
  
  // iPhone 12 series (2020)
  'iphone 12 pro max': 'iPhone 12 Pro Max',
  'iphone 12 pro': 'iPhone 12 Pro',
  'iphone 12 mini': 'iPhone 12 mini',
  'iphone 12': 'iPhone 12',
  
  // iPhone 11 series (2019)
  'iphone 11 pro max': 'iPhone 11 Pro Max',
  'iphone 11 pro': 'iPhone 11 Pro',
  'iphone 11': 'iPhone 11',
  
  // iPhone SE and older models
  'iphone se 2022': 'iPhone SE 2022',
  'iphone se': 'iPhone SE 2022',
  'iphone xs max': 'iPhone XS Max',
  'iphone xs': 'iPhone XS',
  'iphone xr': 'iPhone XR',
  'iphone x': 'iPhone X',
  'iphone 8 plus': 'iPhone 8 Plus',
  'iphone 8': 'iPhone 8',
  
  // Android variations - Latest to Oldest
  // Google Pixel series - English
  'pixel 8 pro': 'Google Pixel 8 Pro',
  'pixel 8': 'Google Pixel 8',
  'pixel 7 pro': 'Google Pixel 7 Pro',
  'pixel 7': 'Google Pixel 7',
  'pixel 6 pro': 'Google Pixel 6 Pro',
  'pixel 6': 'Google Pixel 6',
  'pixel 5': 'Google Pixel 5',
  'pixel 4': 'Google Pixel 4',
  'pixel 4 xl': 'Google Pixel 4 XL',
  'pixel 3': 'Google Pixel 3',
  'pixel 3 xl': 'Google Pixel 3 XL',
  
  // Samsung Galaxy S series - English
  'galaxy s24 ultra': 'Samsung Galaxy S24 Ultra',
  'galaxy s24 plus': 'Samsung Galaxy S24 Plus',
  'galaxy s24': 'Samsung Galaxy S24',
  'samsung s24 ultra': 'Samsung Galaxy S24 Ultra',
  'samsung s24 plus': 'Samsung Galaxy S24 Plus',
  'samsung s24': 'Samsung Galaxy S24',
  'galaxy s23 ultra': 'Samsung Galaxy S23 Ultra',
  'galaxy s23 plus': 'Samsung Galaxy S23 Plus',
  'galaxy s23': 'Samsung Galaxy S23',
  'samsung s23 ultra': 'Samsung Galaxy S23 Ultra',
  'samsung s23 plus': 'Samsung Galaxy S23 Plus',
  'samsung s23': 'Samsung Galaxy S23',
  
  // Samsung Galaxy - Portuguese (Brazil)
  'galaxy s24 ultra': 'Samsung Galaxy S24 Ultra',
  'galáxia s24 ultra': 'Samsung Galaxy S24 Ultra',
  'samsung s24 ultra': 'Samsung Galaxy S24 Ultra',
  'galaxy s23 ultra': 'Samsung Galaxy S23 Ultra',
  'galáxia s23 ultra': 'Samsung Galaxy S23 Ultra',
  'samsung s23 ultra': 'Samsung Galaxy S23 Ultra',
  
  // Samsung Galaxy - Spanish (Spain)
  'galaxia s24 ultra': 'Samsung Galaxy S24 Ultra',
  'samsung galaxia s24': 'Samsung Galaxy S24',
  'galaxia s23 ultra': 'Samsung Galaxy S23 Ultra',
  'samsung galaxia s23': 'Samsung Galaxy S23',
  'galaxy s22 ultra': 'Samsung Galaxy S22 Ultra',
  'galaxy s22 plus': 'Samsung Galaxy S22 Plus',
  'galaxy s22': 'Samsung Galaxy S22',
  'samsung s22 ultra': 'Samsung Galaxy S22 Ultra',
  'samsung s22 plus': 'Samsung Galaxy S22 Plus',
  'samsung s22': 'Samsung Galaxy S22',
  'galaxy s21 ultra': 'Samsung Galaxy S21 Ultra',
  'galaxy s21 plus': 'Samsung Galaxy S21 Plus',
  'galaxy s21': 'Samsung Galaxy S21',
  'samsung s21 ultra': 'Samsung Galaxy S21 Ultra',
  'samsung s21 plus': 'Samsung Galaxy S21 Plus',
  'samsung s21': 'Samsung Galaxy S21',
  'galaxy s20 ultra': 'Samsung Galaxy S20 Ultra',
  'galaxy s20 plus': 'Samsung Galaxy S20 Plus',
  'galaxy s20': 'Samsung Galaxy S20',
  'samsung s20 ultra': 'Samsung Galaxy S20 Ultra',
  'samsung s20 plus': 'Samsung Galaxy S20 Plus',
  'samsung s20': 'Samsung Galaxy S20',
  
  // Samsung Galaxy Note series
  'galaxy note 20 ultra': 'Samsung Galaxy Note 20 Ultra',
  'galaxy note 20': 'Samsung Galaxy Note 20',
  'samsung note 20 ultra': 'Samsung Galaxy Note 20 Ultra',
  'samsung note 20': 'Samsung Galaxy Note 20',
  
  // OnePlus series
  'oneplus 12': 'OnePlus 12',
  'oneplus 11': 'OnePlus 11',
  'oneplus 10 pro': 'OnePlus 10 Pro',
  'oneplus 10': 'OnePlus 10',
  'oneplus 9 pro': 'OnePlus 9 Pro',
  'oneplus 9': 'OnePlus 9',
  'oneplus 8 pro': 'OnePlus 8 Pro',
  'oneplus 8': 'OnePlus 8',
  
  // Xiaomi series
  'xiaomi 14 ultra': 'Xiaomi 14 Ultra',
  'xiaomi 14': 'Xiaomi 14',
  'xiaomi 13 ultra': 'Xiaomi 13 Ultra',
  'xiaomi 13': 'Xiaomi 13',
  'xiaomi 12 ultra': 'Xiaomi 12 Ultra',
  'xiaomi 12': 'Xiaomi 12',
  'redmi note 13': 'Redmi Note 13',
  'redmi note 12': 'Redmi Note 12',
  
  // Huawei series
  'huawei p60 pro': 'Huawei P60 Pro',
  'huawei p60': 'Huawei P60',
  'huawei p50 pro': 'Huawei P50 Pro',
  'huawei p50': 'Huawei P50',
  'huawei mate 60': 'Huawei Mate 60',
  'huawei mate 50': 'Huawei Mate 50'
};

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
    // Set default iOS version based on device generation
    if (device.includes('16')) {
      osVersion = '18'; // iPhone 16 series comes with iOS 18
    } else if (device.includes('15')) {
      osVersion = '17'; // iPhone 15 series comes with iOS 17
    } else if (device.includes('14')) {
      osVersion = '16'; // iPhone 14 series comes with iOS 16
    } else {
      osVersion = '16'; // Default for older devices
    }
  } else if (device.toLowerCase().includes('pixel') || 
             device.toLowerCase().includes('galaxy') || 
             device.toLowerCase().includes('samsung') ||
             device.toLowerCase().includes('oneplus') ||
             device.toLowerCase().includes('xiaomi') ||
             device.toLowerCase().includes('redmi') ||
             device.toLowerCase().includes('huawei')) {
    platform = 'Android';
    // Set default Android version based on device generation
    if (device.includes('24') || device.includes('8 Pro') || device.includes('8')) {
      osVersion = '14'; // Latest devices come with Android 14
    } else if (device.includes('23') || device.includes('7')) {
      osVersion = '13'; // 2023 devices come with Android 13
    } else {
      osVersion = '12'; // Default for older devices
    }
  }
  
  // Look for "iOS 14", "android 11" patterns first (multilingual)
  const iosMatch = segment.match(/ios\s+(\d+)|i?os\s+(\d+)/);
  const androidMatch = segment.match(/android\s+(\d+)|androide?\s+(\d+)/);
  
  if (iosMatch) {
    osVersion = iosMatch[1] || iosMatch[2];
    platform = 'iOS';
  } else if (androidMatch) {
    osVersion = androidMatch[1] || androidMatch[2];
    platform = 'Android';
  } else {
    // Look for multilingual patterns: "with 14", "com 16", "con 15"
    const withMatch = segment.match(/(?:with|com|con)\s+(\d+)|versão\s+(\d+)|versión\s+(\d+)/);
    if (withMatch) {
      const version = parseInt(withMatch[1] || withMatch[2] || withMatch[3]);
      if (platform === 'iOS' && version >= 12 && version <= 18) {
        osVersion = String(version);
      } else if (platform === 'Android' && version >= 8 && version <= 15) {
        osVersion = String(version);
      }
    }
  }
  
  return { device, osVersion, platform };
}

// Multilingual messages
const messages = {
  en: {
    noIosApps: '❌ No iOS app files found. Please add .ipa or .app files to the app/ directory',
    noAndroidApps: '❌ No Android app files found. Please add .apk or .aab files to the app/ directory',
    multipleIosApps: '🤔 Multiple iOS app types found:',
    ipaFiles: '📱 .ipa files (BrowserStack real devices):',
    appFiles: '📲 .app files (Local simulator):',
    usingIpa: '📱 Using .ipa file for BrowserStack real device testing',
    usingApp: '📲 Using .app file for local simulator testing',
    usingAndroid: '🤖 Using {type} file for BrowserStack Android testing',
    smartAnalysis: '🧠 Smart Analysis Results:',
    appDirectory: '📁 App Directory Scan:',
    deviceConfig: '📱 Device Configuration:',
    multipleApps: '❓ Multiple app types available - will ask for choice',
    noCompatible: '❌ No compatible app found',
    proceedTesting: '🚀 Proceed with testing? (y/n): ',
    chooseTesting: '🤔 Choose testing environment for {device}:',
    browserStackReal: '📱 BrowserStack Real Device (.ipa): {file}',
    localSimulator: '📲 Local Simulator (.app): {file}',
    enterChoice: '\nEnter your choice (number): ',
    invalidChoice: 'Invalid choice, using first option',
    startingTests: '🔄 Starting intelligent test execution...',
    testProgress: '🚀 Test {current}/{total}: {device} ({platform} {version})',
    appFile: '📱 App: {file}',
    environment: '🎯 Environment: {env}',
    waiting: '⏱️  Waiting 3 seconds before next test...',
    allComplete: '🎉 All intelligent tests completed!',
    passed: '✅ PASSED',
    failed: '❌ FAILED',
    cancelled: '❌ Test execution cancelled.',
    noDevices: '❌ No valid devices found in the prompt. Please specify device names and OS versions.',
    noTestableDevices: '❌ No devices can be tested with available apps.',
    addApps: '💡 Please add appropriate app files to the app/ directory.'
  },
  pt_BR: {
    noIosApps: '❌ Nenhum arquivo de app iOS encontrado. Adicione arquivos .ipa ou .app ao diretório app/',
    noAndroidApps: '❌ Nenhum arquivo de app Android encontrado. Adicione arquivos .apk ou .aab ao diretório app/',
    multipleIosApps: '🤔 Múltiplos tipos de app iOS encontrados:',
    ipaFiles: '📱 Arquivos .ipa (dispositivos reais BrowserStack):',
    appFiles: '📲 Arquivos .app (Simulador local):',
    usingIpa: '📱 Usando arquivo .ipa para testes em dispositivo real BrowserStack',
    usingApp: '📲 Usando arquivo .app para testes no simulador local',
    usingAndroid: '🤖 Usando arquivo {type} para testes Android no BrowserStack',
    smartAnalysis: '🧠 Resultados da Análise Inteligente:',
    appDirectory: '📁 Escaneamento do Diretório de Apps:',
    deviceConfig: '📱 Configuração de Dispositivos:',
    multipleApps: '❓ Múltiplos tipos de app disponíveis - perguntaremos sua escolha',
    noCompatible: '❌ Nenhum app compatível encontrado',
    proceedTesting: '🚀 Prosseguir com os testes? (s/n): ',
    chooseTesting: '🤔 Escolha o ambiente de teste para {device}:',
    browserStackReal: '📱 Dispositivo Real BrowserStack (.ipa): {file}',
    localSimulator: '📲 Simulador Local (.app): {file}',
    enterChoice: '\nDigite sua escolha (número): ',
    invalidChoice: 'Escolha inválida, usando primeira opção',
    startingTests: '🔄 Iniciando execução inteligente de testes...',
    testProgress: '🚀 Teste {current}/{total}: {device} ({platform} {version})',
    appFile: '📱 App: {file}',
    environment: '🎯 Ambiente: {env}',
    waiting: '⏱️  Aguardando 3 segundos antes do próximo teste...',
    allComplete: '🎉 Todos os testes inteligentes concluídos!',
    passed: '✅ PASSOU',
    failed: '❌ FALHOU',
    cancelled: '❌ Execução de testes cancelada.',
    noDevices: '❌ Nenhum dispositivo válido encontrado no comando. Especifique nomes de dispositivos e versões do SO.',
    noTestableDevices: '❌ Nenhum dispositivo pode ser testado com os apps disponíveis.',
    addApps: '💡 Adicione arquivos de app apropriados ao diretório app/.'
  },
  es_ES: {
    noIosApps: '❌ No se encontraron archivos de app iOS. Agregue archivos .ipa o .app al directorio app/',
    noAndroidApps: '❌ No se encontraron archivos de app Android. Agregue archivos .apk o .aab al directorio app/',
    multipleIosApps: '🤔 Se encontraron múltiples tipos de app iOS:',
    ipaFiles: '📱 Archivos .ipa (dispositivos reales BrowserStack):',
    appFiles: '📲 Archivos .app (Simulador local):',
    usingIpa: '📱 Usando archivo .ipa para pruebas en dispositivo real BrowserStack',
    usingApp: '📲 Usando archivo .app para pruebas en simulador local',
    usingAndroid: '🤖 Usando archivo {type} para pruebas Android en BrowserStack',
    smartAnalysis: '🧠 Resultados del Análisis Inteligente:',
    appDirectory: '📁 Escaneo del Directorio de Apps:',
    deviceConfig: '📱 Configuración de Dispositivos:',
    multipleApps: '❓ Múltiples tipos de app disponibles - preguntaremos su elección',
    noCompatible: '❌ No se encontró app compatible',
    proceedTesting: '🚀 ¿Proceder con las pruebas? (s/n): ',
    chooseTesting: '🤔 Elija el entorno de prueba para {device}:',
    browserStackReal: '📱 Dispositivo Real BrowserStack (.ipa): {file}',
    localSimulator: '📲 Simulador Local (.app): {file}',
    enterChoice: '\nIngrese su elección (número): ',
    invalidChoice: 'Elección inválida, usando primera opción',
    startingTests: '🔄 Iniciando ejecución inteligente de pruebas...',
    testProgress: '🚀 Prueba {current}/{total}: {device} ({platform} {version})',
    appFile: '📱 App: {file}',
    environment: '🎯 Entorno: {env}',
    waiting: '⏱️  Esperando 3 segundos antes de la siguiente prueba...',
    allComplete: '🎉 ¡Todas las pruebas inteligentes completadas!',
    passed: '✅ PASÓ',
    failed: '❌ FALLÓ',
    cancelled: '❌ Ejecución de pruebas cancelada.',
    noDevices: '❌ No se encontraron dispositivos válidos en el comando. Especifique nombres de dispositivos y versiones del SO.',
    noTestableDevices: '❌ Ningún dispositivo puede ser probado con las apps disponibles.',
    addApps: '💡 Agregue archivos de app apropiados al directorio app/.'
  }
};

// Detect language from prompt
function detectLanguage(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  
  // Portuguese indicators
  if (lowerPrompt.includes('com ios') || lowerPrompt.includes('com android') || 
      lowerPrompt.includes('versão') || lowerPrompt.includes('máximo') ||
      lowerPrompt.includes('galáxia') || lowerPrompt.includes('testar')) {
    return 'pt_BR';
  }
  
  // Spanish indicators  
  if (lowerPrompt.includes('con ios') || lowerPrompt.includes('con android') ||
      lowerPrompt.includes('versión') || lowerPrompt.includes('máx') ||
      lowerPrompt.includes('galaxia') || lowerPrompt.includes('probar')) {
    return 'es_ES';
  }
  
  // Default to English
  return 'en';
}

// Message formatter
function getMessage(key, lang = 'en', replacements = {}) {
  let message = messages[lang][key] || messages.en[key];
  
  // Replace placeholders
  Object.keys(replacements).forEach(placeholder => {
    message = message.replace(`{${placeholder}}`, replacements[placeholder]);
  });
  
  return message;
}

function selectAppForPlatform(apps, platform, devices, lang = 'en') {
  if (platform === 'iOS') {
    const hasIpa = apps.ios.ipa.length > 0;
    const hasApp = apps.ios.app.length > 0;
    
    if (!hasIpa && !hasApp) {
      console.log(getMessage('noIosApps', lang));
      return null;
    }
    
    if (hasIpa && hasApp) {
      // Ask user to choose
      console.log(`\n${getMessage('multipleIosApps', lang)}`);
      console.log(`   ${getMessage('ipaFiles', lang)} ${apps.ios.ipa.join(', ')}`);
      console.log(`   ${getMessage('appFiles', lang)} ${apps.ios.app.join(', ')}`);
      return 'ASK_USER';
    }
    
    if (hasIpa) {
      console.log(getMessage('usingIpa', lang));
      return { type: 'ipa', file: apps.ios.ipa[0], environment: 'browserstack' };
    }
    
    if (hasApp) {
      console.log(getMessage('usingApp', lang));
      return { type: 'app', file: apps.ios.app[0], environment: 'simulator' };
    }
  }
  
  if (platform === 'Android') {
    const hasApk = apps.android.apk.length > 0;
    const hasAab = apps.android.aab.length > 0;
    
    if (!hasApk && !hasAab) {
      console.log(getMessage('noAndroidApps', lang));
      return null;
    }
    
    // For Android, prefer APK over AAB, use BrowserStack
    const appFile = hasApk ? apps.android.apk[0] : apps.android.aab[0];
    const appType = hasApk ? 'apk' : 'aab';
    
    console.log(getMessage('usingAndroid', lang, { type: appType }));
    return { type: appType, file: appFile, environment: 'browserstack' };
  }
  
  return null;
}

function displaySmartAnalysis(devices, apps, lang = 'en') {
  console.log(`\n${getMessage('smartAnalysis', lang)}`);
  console.log('━'.repeat(60));
  
  // Show detected apps
  console.log(getMessage('appDirectory', lang));
  if (apps.ios.ipa.length > 0) console.log(`   📱 iOS (.ipa): ${apps.ios.ipa.join(', ')}`);
  if (apps.ios.app.length > 0) console.log(`   📲 iOS (.app): ${apps.ios.app.join(', ')}`);
  if (apps.android.apk.length > 0) console.log(`   🤖 Android (.apk): ${apps.android.apk.join(', ')}`);
  if (apps.android.aab.length > 0) console.log(`   📦 Android (.aab): ${apps.android.aab.join(', ')}`);
  
  console.log(`\n${getMessage('deviceConfig', lang)}`);
  devices.forEach((config, index) => {
    const appChoice = selectAppForPlatform(apps, config.platform, devices, lang);
    
    console.log(`${index + 1}. ${config.device} (${config.platform} ${config.osVersion})`);
    
    if (appChoice === 'ASK_USER') {
      console.log(`   ${getMessage('multipleApps', lang)}`);
    } else if (appChoice) {
      console.log(`   ✅ App: ${appChoice.file}`);
      console.log(`   🎯 Environment: ${appChoice.environment}`);
    } else {
      console.log(`   ${getMessage('noCompatible', lang)}`);
    }
    console.log('');
  });
  
  // Return all devices that can be tested (including those needing user choice)
  return devices.filter(device => {
    const appChoice = selectAppForPlatform(apps, device.platform, devices, lang);
    return appChoice; // Include both valid apps and 'ASK_USER' scenarios
  });
}

function askForChoice(question, choices) {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    console.log(`\n${question}`);
    choices.forEach((choice, index) => {
      console.log(`${index + 1}. ${choice}`);
    });
    
    readline.question('\nEnter your choice (number): ', (answer) => {
      readline.close();
      const choiceIndex = parseInt(answer) - 1;
      if (choiceIndex >= 0 && choiceIndex < choices.length) {
        resolve(choiceIndex);
      } else {
        console.log('Invalid choice, using first option');
        resolve(0);
      }
    });
  });
}

function askForConfirmation(lang = 'en') {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    readline.question(getMessage('proceedTesting', lang), (answer) => {
      readline.close();
      const affirmative = lang === 'pt_BR' ? ['s', 'sim', 'y', 'yes'] : 
                         lang === 'es_ES' ? ['s', 'si', 'sí', 'y', 'yes'] : 
                         ['y', 'yes'];
      resolve(affirmative.includes(answer.toLowerCase()));
    });
  });
}

async function runTestsOnDevices(devices, apps) {
  console.log('\n🔄 Starting intelligent test execution...\n');
  
  for (let i = 0; i < devices.length; i++) {
    const config = devices[i];
    let appChoice = selectAppForPlatform(apps, config.platform, devices);
    
    // Handle user choice for iOS when both .ipa and .app exist
    if (appChoice === 'ASK_USER') {
      const choices = [
        `📱 BrowserStack Real Device (.ipa): ${apps.ios.ipa[0]}`,
        `📲 Local Simulator (.app): ${apps.ios.app[0]}`
      ];
      
      const choiceIndex = await askForChoice(
        `🤔 Choose testing environment for ${config.device}:`,
        choices
      );
      
      if (choiceIndex === 0) {
        appChoice = { type: 'ipa', file: apps.ios.ipa[0], environment: 'browserstack' };
      } else {
        appChoice = { type: 'app', file: apps.ios.app[0], environment: 'simulator' };
      }
    }
    
    console.log(`\n🚀 Test ${i + 1}/${devices.length}: ${config.device} (${config.platform} ${config.osVersion})`);
    console.log(`📱 App: ${appChoice.file}`);
    console.log(`🎯 Environment: ${appChoice.environment}`);
    console.log('━'.repeat(60));
    
    await runSingleTest(config, appChoice);
    
    if (i < devices.length - 1) {
      console.log('\n⏱️  Waiting 3 seconds before next test...\n');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  
  console.log('\n🎉 All intelligent tests completed!');
}

function runSingleTest(config, appChoice) {
  return new Promise((resolve) => {
    const env = {
      ...process.env,
      DEVICE: config.device,
      OS_VERSION: config.osVersion,
      PLATFORM: config.platform,
      APP_FILE: appChoice.file,
      APP_TYPE: appChoice.type,
      TEST_ENVIRONMENT: appChoice.environment
    };
    
    const cucumber = spawn('npm', ['test'], {
      env: env,
      stdio: 'inherit'
    });
    
    cucumber.on('close', (code) => {
      const status = code === 0 ? '✅ PASSED' : '❌ FAILED';
      console.log(`\n${status} - ${config.device} (${config.platform} ${config.osVersion}) using ${appChoice.file}\n`);
      resolve(code === 0);
    });
  });
}

async function main() {
  const prompt = process.argv.slice(2).join(' ');
  
  if (!prompt) {
    console.log('Usage: node super-smart-parser.js "iPhone 12 with iOS 14, iPhone 13 iOS 16"');
    console.log('       node super-smart-parser.js "iPhone 12 com iOS 14, iPhone 13 iOS 16"');
    console.log('       node super-smart-parser.js "iPhone 12 con iOS 14, iPhone 13 iOS 16"');
    process.exit(1);
  }
  
  // Detect language from prompt
  const language = detectLanguage(prompt);
  
  console.log(`\n🧠 Super Smart Parser - Analyzing: "${prompt}"`);
  if (language !== 'en') {
    console.log(`🌍 Language detected: ${language === 'pt_BR' ? 'Português (Brasil)' : 'Español (España)'}`);
  }
  
  // Scan app directory
  const apps = scanAppDirectory();
  
  // Parse devices from prompt
  const devices = parseEnglishPrompt(prompt);
  
  if (devices.length === 0) {
    console.log(getMessage('noDevices', language));
    process.exit(1);
  }
  
  // Display smart analysis
  const validDevices = displaySmartAnalysis(devices, apps, language);
  
  if (validDevices.length === 0) {
    console.log(getMessage('noTestableDevices', language));
    console.log(getMessage('addApps', language));
    process.exit(1);
  }
  
  const confirmed = await askForConfirmation(language);
  
  if (confirmed) {
    await runTestsOnDevices(validDevices, apps, language);
  } else {
    console.log(getMessage('cancelled', language));
  }
}

main().catch(console.error);
