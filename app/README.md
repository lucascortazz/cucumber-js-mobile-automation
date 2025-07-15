# App Files Directory

This directory is intended to store mobile application files for testing.

## Supported File Types

### iOS Applications
- `.ipa` files - iOS application packages
- `.app` files - iOS application packages
- Place your iOS app files here

### Android Applications  
- `.apk` files - Android application packages
- `.aab` files - Android App Bundles
- Place your Android app files here

## Usage

1. **For iOS Testing:**
   ```bash
   # Place your .ipa file in this directory
   app/YourApp.ipa
   ```

2. **For Android Testing:**
   ```bash
   # Place your .apk or .aab file in this directory
   app/YourApp.apk
   app/YourApp.aab
   ```

## Important Notes

- ✅ **Folder Structure**: This folder and this README are tracked by Git
- 🚫 **Binary Files**: Actual .ipa, .apk, and .aab files are ignored by Git (see .gitignore)
- 🔒 **Security**: Binary app files won't be committed to version control
- 📁 **Organization**: Keeps your app files organized in one location

## BrowserStack Integration

When using BrowserStack, you can either:
1. Upload apps directly to BrowserStack and use the `bs://` URLs
2. Store local copies here for reference and local testing

---

**Note**: The actual app files (.ipa, .apk, .aab) in this directory are ignored by Git to prevent large binary files from being committed to the repository.
