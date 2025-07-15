const { Given, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I launch the BrowserStack demo app', async function () {
  // Get device and OS version from environment variables or use defaults
  const device = process.env.DEVICE || 'iPhone 14';
  const osVersion = process.env.OS_VERSION || '16';
  const platform = process.env.PLATFORM || 'iOS';
  const appFile = process.env.APP_FILE || null;
  const appType = process.env.APP_TYPE || null;
  const testEnvironment = process.env.TEST_ENVIRONMENT || 'browserstack';
  
  console.log(`Running test on: ${device} with ${platform} ${osVersion}`);
  console.log(`App file: ${appFile || 'Default demo app'}`);
  console.log(`Test environment: ${testEnvironment}`);
  
  // For now, only iOS is supported with the current BrowserStack demo app
  if (platform !== 'iOS') {
    throw new Error('Only iOS platform is currently supported. Please use iOS devices for testing.');
  }
  
  // Handle different app types and environments
  let appUrl;
  if (appFile && appType) {
    if (testEnvironment === 'browserstack' && appType === 'ipa') {
      // For .ipa files, you would need to upload to BrowserStack first
      // For now, using the demo app URL as placeholder
      console.log(`📱 Using .ipa file: ${appFile} (would need BrowserStack upload)`);
      appUrl = 'bs://e6758a82077a5e804dba0d409d23788c79d53a82';  // Demo app fallback
    } else if (testEnvironment === 'simulator' && appType === 'app') {
      // For .app files, would use local simulator
      console.log(`📲 Using .app file: ${appFile} (would use local simulator)`);
      appUrl = 'bs://e6758a82077a5e804dba0d409d23788c79d53a82';  // Demo app fallback
    } else {
      console.log(`🔄 Using default demo app (app type: ${appType} not fully implemented)`);
      appUrl = 'bs://e6758a82077a5e804dba0d409d23788c79d53a82';  // Demo app
    }
  } else {
    console.log(`🎯 Using default BrowserStack demo app`);
    appUrl = 'bs://e6758a82077a5e804dba0d409d23788c79d53a82';  // Demo app
  }
  
  const caps = {
    'platformName': platform,
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
    'app': appUrl,
    'device': device,
    'os_version': osVersion,
    'project': 'Smart Mobile App Test',
    'build': 'Super Smart Build',
    'name': `smart_test_${device}_${osVersion}_${appFile || 'demo'}`,
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
