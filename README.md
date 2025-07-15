# 🚀 Cucumber.js Mobile Automation with Smart English Parser

A powerful mobile automation testing framework using Cucumber.js, Appium, and BrowserStack with intelligent English language command parsing.

## ✨ Features

- 🧠 **Smart English Parser**: Test using natural language commands
- 📱 **Dynamic Device Selection**: Support for multiple iOS devices and versions
- ☁️ **BrowserStack Integration**: Cloud-based mobile testing
- 🥒 **Cucumber BDD**: Behavior-driven development with Gherkin syntax
- 🔄 **Multi-device Testing**: Run tests across different devices sequentially

## 🛠️ Setup

### Prerequisites
- Node.js (v16 or higher)
- BrowserStack account with valid credentials

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd cucumber-js-mobile-automation

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your BrowserStack credentials
```

### Environment Configuration
Create a `.env` file with your BrowserStack credentials:
```
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key
```

## 🎯 Usage

### Smart English Parser (Recommended)
```bash
# Single device
node smart-parser.js "Test on iPhone 14 Pro with iOS 16"

# Multiple devices
node smart-parser.js "iPhone 12 with iOS 14, iPhone 13 iOS 16"

# Complex requests
node smart-parser.js "Please execute this test case on iPhone 14 Pro device with iOS 16 version"
```

### Manual Execution
```bash
# Environment variables
DEVICE="iPhone 13" OS_VERSION="16" PLATFORM="iOS" npm test

# Default test
npm test
```

### Quick Validation
```bash
# Test parser without running actual tests
node test-parser.js "iPhone 12 iOS 14, iPhone 13 iOS 16"
```

## 📱 Supported Devices

### iOS Devices
- iPhone 14 Pro Max, iPhone 14 Pro, iPhone 14 Plus, iPhone 14
- iPhone 13 Pro Max, iPhone 13 Pro, iPhone 13 mini, iPhone 13
- iPhone 12 Pro Max, iPhone 12 Pro, iPhone 12 mini, iPhone 12
- iPhone 11 Pro Max, iPhone 11 Pro, iPhone 11
- iPhone SE 2022, iPhone XS Max, iPhone XS, iPhone XR, iPhone X
- iPhone 8 Plus, iPhone 8

### OS Versions
- iOS: 16, 15, 14, 13, 12

### Default Values
- Device: iPhone 14
- OS Version: 16
- Platform: iOS

## 🗂️ Project Structure

```
cucumber-js-mobile-automation/
├── features/
│   ├── demoApp.feature          # Main test scenarios
│   ├── step_definitions/
│   │   └── demoApp.js          # Step implementations
│   └── support/
│       └── env.js              # Test environment setup
├── smart-parser.js             # Smart English language parser
├── test-parser.js              # Parser validation tool
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
  "test:smart": "node smart-parser.js"
}
```

## 📖 Natural Language Examples

The smart parser understands various natural language patterns:

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
   node test-parser.js "iPhone 12 iOS 14, iPhone 13 iOS 16"
   ```

2. **Execute tests with smart parser:**
   ```bash
   node smart-parser.js "iPhone 12 iOS 14, iPhone 13 iOS 16"
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
