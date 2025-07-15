require('dotenv').config();
const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const { remote } = require('webdriverio');

// ⚡ Optimized timeout settings for BrowserStack
setDefaultTimeout(120000);  // 2 minutes for each step (was 60s)

class CustomWorld {
  async initAppiumSession(caps) {
    // ⚡ Add BrowserStack-specific timeout configurations
    const optimizedCaps = {
      ...caps,
      'browserstack.idleTimeout': 60,  // Session idle timeout (60s)
      'browserstack.networkProfile': '4g-lte-good',  // Better network profile
      'browserstack.appiumVersion': '1.22.0',  // Stable Appium version
      'newCommandTimeout': 60,  // Appium command timeout (60s)
      'commandTimeout': 60000,  // WebDriver command timeout (60s)
      'wdaLaunchTimeout': 60000,  // iOS WebDriverAgent timeout
      'wdaConnectionTimeout': 60000,  // iOS WebDriverAgent connection timeout
    };

    this.driver = await remote({
      protocol: 'https',
      hostname: 'hub-cloud.browserstack.com',
      port: 443,
      path: '/wd/hub',
      capabilities: optimizedCaps,
      // ⚡ WebDriverIO timeout settings
      connectionRetryTimeout: 90000,  // 90s connection retry
      connectionRetryCount: 3,  // 3 connection attempts
      waitforTimeout: 10000,  // 10s implicit wait
      logLevel: 'info',  // Reduce log verbosity
    });

    // ⚡ Set implicit wait to reduce element lookup time
    await this.driver.setImplicitTimeout(5000);  // 5s implicit wait
    
    console.log('✅ Optimized BrowserStack session initialized');
  }

  async quit() {
    if (this.driver) {
      try {
        await this.driver.deleteSession();
        console.log('✅ Session cleaned up successfully');
      } catch (error) {
        console.log('⚠️ Session cleanup warning:', error.message);
      }
    }
  }
}

setWorldConstructor(CustomWorld);
