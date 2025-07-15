const { Given, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I launch the BrowserStack demo app', async function () {
  // Get device and OS version from environment variables or use defaults
  const device = process.env.DEVICE || 'iPhone 14';
  const osVersion = process.env.OS_VERSION || '16';
  const platform = process.env.PLATFORM || 'iOS';
  
  console.log(`Running test on: ${device} with ${platform} ${osVersion}`);
  
  // For now, only iOS is supported with the current BrowserStack demo app
  if (platform !== 'iOS') {
    throw new Error('Only iOS platform is currently supported. Please use iOS devices for testing.');
  }
  
  const caps = {
    'platformName': platform,
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
    'app': 'bs://e6758a82077a5e804dba0d409d23788c79d53a82',  // iOS demo app
    'device': device,
    'os_version': osVersion,
    'project': 'BrowserStack Demo App Test',
    'build': 'Demo App Build',
    'name': `demo_test_run_${device}_${osVersion}`,
    'browserstack.debug': true
  };
  await this.initAppiumSession(caps);
});

Then('I should see the demo app home screen', async function () {
  const textButton = await this.driver.$('~Text Button');
  const isDisplayed = await textButton.isDisplayed();
  assert.strictEqual(isDisplayed, true, 'Text Button should be visible on the home screen');
});

Then('I tap on the Web View button', async function () {
  const webViewButton = await this.driver.$('~Web View');
  await webViewButton.click();
});

Then('I should see the Web View page open', async function () {
  const webContainer = await this.driver.$('//XCUIElementTypeWebView');
  const isDisplayed = await webContainer.isDisplayed();
  assert.strictEqual(isDisplayed, true, 'Web View container should be visible');
});

Then('I close the app', async function () {
  await this.driver.terminateApp('com.browserstack.Sample-iOS');
});

Then('I should see the app closed', async function () {
  const appState = await this.driver.queryAppState('com.browserstack.Sample-iOS');
  assert.strictEqual(appState, 1, 'App should be closed (not running)');
});
