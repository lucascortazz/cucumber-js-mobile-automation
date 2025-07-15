require('dotenv').config();
const { setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const { remote } = require('webdriverio');

setDefaultTimeout(60000);  // ✅ Set 60 second timeout for each step

class CustomWorld {
  async initAppiumSession(caps) {
    this.driver = await remote({
      protocol: 'https',
      hostname: 'hub-cloud.browserstack.com',
      port: 443,
      path: '/wd/hub',
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
