const { Given, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I launch the Reminders app on iOS', async function () {
  const caps = {
    platformName: 'iOS',
    'appium:platformVersion': '18.2',
    'appium:deviceName': 'iPhone 16 Pro',
    'appium:automationName': 'XCUITest',
    'appium:bundleId': 'com.apple.reminders'
  };
  await this.initAppiumSession(caps);
});

Then('I should see the Reminders app open', async function () {
  const appState = await this.driver.queryAppState('com.apple.reminders');
  // App state 4 means "running in foreground"
  assert.strictEqual(appState, 4);
});
