📱 Cucumber Mobile Automation Framework (iOS & Android)
Welcome to the Mobile Automation Framework built with Cucumber, Appium, and Java for cross-platform testing on both iOS and Android devices.

This framework enables BDD-style automation, making test scenarios readable and maintainable across platforms.

📋 Project Structure
bash
Copy
Edit
.
├── src
│   ├── main
│   │    └── java
│   └── test
│        ├── java
│        └── resources
├── features               # Gherkin feature files
├── stepdefinitions        # Step definitions (glue code)
├── drivers                # Driver setup for iOS and Android
├── configs                # Platform-specific config files
├── utils                  # Utility and helper classes
└── pom.xml                # Maven project config
✅ Prerequisites
Before running tests, ensure you have the following installed:

Tool	Purpose
Java (JDK 11 or above)	Project execution
Maven	Build & dependency mgmt
Appium Server	Mobile automation backend
Node.js + NPM	Required for Appium
Xcode (for iOS)	iOS build & simulator
Android Studio (for Android)	Android Emulator & SDK tools

⚙️ Configuration
1. Android Setup
Device Options: Emulator or physical device (USB debugging enabled)

Android Config file:
Located at:

arduino
Copy
Edit
/configs/android-config.properties
Example Config:

ini
Copy
Edit
platformName=Android
platformVersion=11.0
deviceName=Pixel_3a_API_30
appPath=/path/to/app.apk
automationName=UiAutomator2
2. iOS Setup
Device Options: Simulator or real device (requires signing configs for real devices)

iOS Config file:
Located at:

arduino
Copy
Edit
/configs/ios-config.properties
Example Config:

ini
Copy
Edit
platformName=iOS
platformVersion=15.2
deviceName=iPhone 12
appPath=/path/to/app.app
automationName=XCUITest
🚀 Running Tests
Android Example:
bash
Copy
Edit
mvn clean test -Dplatform=android
iOS Example:
bash
Copy
Edit
mvn clean test -Dplatform=ios
The platform parameter dynamically loads the right driver and configuration for the target OS.

🧪 Sample Cucumber Command (Optional)
bash
Copy
Edit
mvn test -Dcucumber.filter.tags="@smoke" -Dplatform=android
You can filter by tags like @smoke, @regression, etc.

📂 Reporting
After test execution, a Cucumber HTML Report will be generated automatically.

Report Path:

bash
Copy
Edit
/target/cucumber-reports
💡 Additional Notes
Supports both local execution and remote (cloud device farm) runs.

Easily extendable for parallel execution and CI/CD pipeline integration.

For real devices, ensure Appium server and device settings are correctly configured.
