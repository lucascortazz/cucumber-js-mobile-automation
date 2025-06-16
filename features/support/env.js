const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const { remote } = require('webdriverio');

setDefaultTimeout(60000);  // ✅ Set 60 second timeout for each step

class CustomWorld {
  async initAppiumSession(caps) {
    this.driver = await remote({
      hostname: 'localhost',
      port: 4723,
      path: '/',  // ✅ Appium v2 fix
      capabilities: caps
    });
  }

  async quit() {
    if (this.driver) {
      await this.driver.deleteSession();
    }
  }
}

setWorldConstructor(CustomWorld);
