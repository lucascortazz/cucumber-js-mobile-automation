# 🛠️ Utils Directory

This directory contains utility scripts for the multilingual mobile automation framework.

## 📁 Files

### 🧠 `super-smart-parser.js`
**Main multilingual intelligent parser**
- **Purpose**: Primary automation engine with natural language processing
- **Languages**: English, Portuguese (Brazil), Spanish (Spain)
- **Features**: 
  - 70+ device support (iPhone 16 series, Galaxy S24, etc.)
  - Smart app file detection (.ipa/.app/.apk/.aab)
  - Multi-device testing capabilities
  - Environment auto-selection
- **Usage**: `node utils/super-smart-parser.js "iPhone 16 Pro Max with iOS 18"`

### 🧪 `test-super-smart-parser.js`
**Parser validation and testing utility**
- **Purpose**: Test parser logic without running actual tests
- **Features**:
  - App directory scanning
  - Smart selection logic validation
  - Intelligence feature overview
- **Usage**: `node utils/test-super-smart-parser.js`

### 🌍 `multilingual-demo.js`
**Multilingual capability demonstration**
- **Purpose**: Showcase multilingual features and examples
- **Features**:
  - Language detection examples
  - Device mapping demonstrations
  - Command examples in all supported languages
- **Usage**: `node utils/multilingual-demo.js`

## 🚀 Quick Commands

```bash
# Test parser logic
npm run test:parser

# Run multilingual demo
npm run test:multilingual

# Use smart parser
npm run test:smart
```

## 🎯 Architecture

```
utils/
├── super-smart-parser.js       # 🧠 Main intelligence (711 lines)
├── test-super-smart-parser.js  # 🧪 Testing utility (154 lines)
└── multilingual-demo.js        # 🌍 Demo utility
```

All utilities are designed to work together as a comprehensive multilingual mobile automation ecosystem! 🚀
