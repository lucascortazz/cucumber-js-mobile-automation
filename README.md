# 🧠 Super Smart Mobile Automation Framework

A revolutionary multilingual Cucumber.js mobile automation framework### 🎯 Traditional Testing (Backward Compatible)

#### Using Super Smart Parser (Recommended)
```bash
node utils/super-smart-parser.js "iPhone 12 with iOS 14"
```

#### Using Direct Commands
```bash
# Set environment variables and run
DEVICE="iPhone 13" OS_VERSION="16" PLATFORM="iOS" npm test

# Or run directly
npm test
```nguage parsing, automatic app file detection, and support for English, Portuguese (Brazil), and Spanish (Spain).

## ✨ Features

### 🎯 Super Smart Parser
- **Natural Language Processing**: Run tests using plain English, Portuguese, or Spanish commands
- **Automatic App Detection**: Intelligently detects and selects app files
- **Multi-Platform Support**: iOS and Android testing capabilities
- **Environment Auto-Selection**: Chooses between simulator and real device testing
- **Multi-Device Testing**: Run tests across multiple devices simultaneously
- **Multilingual Support**: 🇺🇸 English, 🇧🇷 Portuguese (Brazil), 🇪🇸 Spanish (Spain)

### 📱 App File Intelligence
- **`.ipa` files**: Automatically routes to BrowserStack real devices
- **`.app` files**: Automatically routes to local iOS simulator
- **`.apk/.aab` files**: Automatically routes to BrowserStack Android devices
- **Smart Selection**: When multiple app types exist, prompts for user choice
- **Auto-Detection**: Scans `app/` directory and makes intelligent decisions

### 🌍 Multilingual Support
- **English**: "iPhone 16 Pro Max with iOS 18"
- **Portuguese (Brazil)**: "iPhone 16 Pro Máximo com iOS 18"
- **Spanish (Spain)**: "iPhone 16 Pro Máx con iOS 18"
- **Smart Detection**: Automatically detects language from command
- **Localized Messages**: All interface messages in user's language

## � Quick Start

### Prerequisites
1. Node.js installed
2. BrowserStack account (for real device testing)
3. Environment variables configured in `.env`

### Setup
```bash
npm install
```

### 🧠 Super Smart Testing

#### Simple Device Testing (English)
```bash
# Test on iPhone 16 Pro Max with iOS 18
node utils/super-smart-parser.js "iPhone 16 Pro Max with iOS 18"

# Test on Samsung Galaxy S24 Ultra
node utils/super-smart-parser.js "Galaxy S24 Ultra with Android 14"
```

#### Português (Brasil) 🇧🇷
```bash
# Testar no iPhone 16 Pro Máximo com iOS 18
node utils/super-smart-parser.js "iPhone 16 Pro Máximo com iOS 18"

# Testar no Samsung Galaxy S24 Ultra
node utils/super-smart-parser.js "Galáxia S24 Ultra com Android 14"
```

#### Español (España) 🇪🇸
```bash
# Probar en iPhone 16 Pro Máx con iOS 18
node utils/super-smart-parser.js "iPhone 16 Pro Máx con iOS 18"

# Probar en Samsung Galaxy S24 Ultra
node utils/super-smart-parser.js "Galaxia S24 Ultra con Android 14"
```

#### Multi-Device Testing (All Languages)
```bash
# English
node utils/super-smart-parser.js "iPhone 15 Pro with iOS 17, Galaxy S23 with Android 13"

# Portuguese
node utils/super-smart-parser.js "iPhone 15 Pro com iOS 17, Galáxia S23 com Android 13"

# Spanish
node utils/super-smart-parser.js "iPhone 15 Pro con iOS 17, Galaxia S23 con Android 13"
```

### 📁 App File Organization

Place your app files in the `app/` directory:

```
app/
├── MyiOSApp.ipa      # Real device testing
├── MyiOSApp.app      # Simulator testing
├── MyAndroidApp.apk  # Android testing
├── MyAndroidApp.aab  # Android bundle
└── README.md         # App documentation
```

### 🎯 Smart Selection Logic

| App Type | Environment | Usage |
|----------|------------|--------|
| `.ipa` | BrowserStack Real Devices | Production testing on actual devices |
| `.app` | Local iOS Simulator | Fast development testing |
| `.apk/.aab` | BrowserStack Android | Android device testing |

When multiple iOS app types exist (both `.ipa` and `.app`), the parser will:
1. Display available options
2. Prompt for user choice
3. Execute tests with selected environment

### 🧪 Testing Parser Logic

Test the intelligence without running actual tests:
```bash
node utils/test-super-smart-parser.js
```

### � Traditional Testing (Backward Compatible)

#### Using Smart Parser (Recommended)
```bash
node utils/super-smart-parser.js "iPhone 12 with iOS 14"
```

#### Using Direct Commands
```bash
# Set environment variables and run
DEVICE="iPhone 13" OS_VERSION="16" PLATFORM="iOS" npm test

# Or run directly
npm test
```

## 📱 Supported Devices

### iOS Devices (All Languages)
- **iPhone 16 series** (2024): 16 Pro Max, 16 Pro, 16 Plus, 16
- **iPhone 15 series** (2023): 15 Pro Max, 15 Pro, 15 Plus, 15
- **iPhone 14 series** (2022): 14 Pro Max, 14 Pro, 14 Plus, 14
- **iPhone 13 series** (2021): 13 Pro Max, 13 Pro, 13 mini, 13
- **iPhone 12 series** (2020): 12 Pro Max, 12 Pro, 12 mini, 12
- **iPhone 11 series** (2019): 11 Pro Max, 11 Pro, 11
- **iPhone SE and older**: SE 2022, XS Max, XS, XR, X, 8 Plus, 8

### Android Devices (All Languages)
- **Google Pixel**: 8 Pro, 8, 7 Pro, 7, 6 Pro, 6, 5, 4, 4 XL, 3, 3 XL
- **Samsung Galaxy S**: S24 Ultra/Plus/Standard, S23 Ultra/Plus/Standard, S22 Ultra/Plus/Standard, S21 Ultra/Plus/Standard, S20 Ultra/Plus/Standard
- **Samsung Galaxy Note**: Note 20 Ultra, Note 20
- **OnePlus**: 12, 11, 10 Pro, 10, 9 Pro, 9, 8 Pro, 8
- **Xiaomi**: 14 Ultra, 14, 13 Ultra, 13, 12 Ultra, 12
- **Redmi**: Note 13, Note 12
- **Huawei**: P60 Pro, P60, P50 Pro, P50, Mate 60, Mate 50

### iOS Versions
- iOS 18 (iPhone 16 series default)
- iOS 17 (iPhone 15 series default)
- iOS 16 (iPhone 14 series default)
- iOS 15, 14, 13, 12 (compatible with all devices)

### Android Versions
- Android 14 (latest devices default)
- Android 13 (2023 devices default)
- Android 12, 11, 10, 9, 8 (compatible with all devices)

### Multilingual Device Names
- **English**: "iPhone 16 Pro Max", "Galaxy S24 Ultra"
- **Portuguese**: "iPhone 16 Pro Máximo", "Galáxia S24 Ultra"
- **Spanish**: "iPhone 16 Pro Máx", "Galaxia S24 Ultra"

## 🗂️ Project Structure

```
cucumber-js-mobile-automation/
├── features/
│   ├── demoApp.feature          # Main test scenarios
│   ├── step_definitions/
│   │   └── demoApp.js          # Step implementations
│   └── support/
│       └── env.js              # Test environment setup
├── utils/
│   ├── super-smart-parser.js       # Multilingual intelligent parser
│   ├── test-super-smart-parser.js  # Parser validation tool
│   └── multilingual-demo.js        # Multilingual demonstration
├── app/                        # App files directory
├── cucumber.js                 # Cucumber configuration
├── package.json                # Dependencies and scripts
├── .env                        # Environment variables
└── README.md                   # This file
```

## 🧪 Test Scenarios

The framework includes comprehensive test scenarios for:
- ✅ App launch and initialization
- ✅ Home screen verification
- ✅ Web View navigation
- ✅ App termination and cleanup

## 🔧 Configuration

### Cucumber Configuration (`cucumber.js`)
```javascript
module.exports = {
  default: `--format-options '{"snippetInterface": "async-await"}'`
}
```

### Package Scripts
```json
{
  "test": "cucumber-js",
  "test:device": "cucumber-js",
  "test:ios": "PLATFORM=iOS cucumber-js",
  "test:smart": "node utils/super-smart-parser.js"
}
```

## 📖 Natural Language Examples

The super smart parser understands various natural language patterns:

```bash
# Simple
"iPhone 14 Pro iOS 16"

# Descriptive
"Please test on iPhone 12 with iOS 14"

# Multiple devices
"Run tests on iPhone 13 iOS 16, iPhone 12 iOS 14"

# Mixed format
"Test iPhone 14 Pro Max with iOS 16 and iPhone 13"
```

## 🚦 Running Tests

1. **Parse and validate your request:**
   ```bash
   node utils/test-super-smart-parser.js "iPhone 12 iOS 14, iPhone 13 iOS 16"
   ```

2. **Execute tests with super smart parser:**
   ```bash
   node utils/super-smart-parser.js "iPhone 12 iOS 14, iPhone 13 iOS 16"
   ```

3. **Manual execution:**
   ```bash
   DEVICE="iPhone 12" OS_VERSION="14" npm test
   ```

## 🔮 Future Enhancements

- 🤖 **Android Support**: Requires custom APK upload to BrowserStack
- 📊 **Reporting**: Enhanced test reporting and analytics
- 🔧 **CI/CD Integration**: GitHub Actions/Jenkins pipeline support
- 🎯 **Parallel Execution**: Concurrent device testing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

---

Built with ❤️ using Cucumber.js, Appium, and BrowserStack
