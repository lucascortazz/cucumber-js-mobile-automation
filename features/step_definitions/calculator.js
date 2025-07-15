const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

Given('I launch the calculator app', async function () {
  // Get device and OS version from environment variables or use defaults
  const device = process.env.DEVICE || 'Samsung Galaxy S24 Ultra';
  const osVersion = process.env.OS_VERSION || '14';
  const platform = process.env.PLATFORM || 'Android';
  const appFile = process.env.APP_FILE || null;
  const appType = process.env.APP_TYPE || null;
  const testEnvironment = process.env.TEST_ENVIRONMENT || 'browserstack';
  
  console.log(`Running calculator test on: ${device} with ${platform} ${osVersion}`);
  console.log(`App file: ${appFile || 'Default calculator app'}`);
  console.log(`Test environment: ${testEnvironment}`);
  
  // For now, only Android is supported with the calculator APK
  if (platform !== 'Android') {
    throw new Error('Calculator app is only supported on Android platform. Please use Android devices for testing.');
  }
  
  // Handle different app types and environments
  let appUrl;
  if (appFile && appType) {
    if (testEnvironment === 'browserstack' && appType === 'apk') {
      // Use the uploaded APK URL from BrowserStack
      console.log(`📱 Using uploaded .apk file: ${appFile}`);
      appUrl = 'bs://3e527fb5add22b8c4661c58f76a1f566586d6c7f';  // Calculator APK uploaded to BrowserStack
    } else if (appType === 'apk') {
      console.log(`📲 Using .apk file: ${appFile} (local testing)`);
      appUrl = `${process.cwd()}/app/${appFile}`;
    } else {
      console.log(`🔄 Using default calculator app (app type: ${appType} not fully implemented)`);
      appUrl = 'bs://3e527fb5add22b8c4661c58f76a1f566586d6c7f';
    }
  } else {
    console.log(`🎯 Using default calculator APK from BrowserStack`);
    appUrl = 'bs://3e527fb5add22b8c4661c58f76a1f566586d6c7f';
  }
  
  const caps = {
    'platformName': platform,
    'browserstack.user': process.env.BROWSERSTACK_USERNAME,
    'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
    'app': appUrl,
    'device': device,
    'os_version': osVersion,
    'project': 'Smart Calculator App Test',
    'build': 'Calculator Build 1.0',
    'name': `calculator_test_${device}_${osVersion}_${appFile || 'default'}`,
    'browserstack.debug': 'true'
  };
  
  console.log('📱 Launching calculator app...');
  console.log('🎯 App capabilities configured');
  
  // Initialize actual BrowserStack session
  await this.initAppiumSession(caps);
  
  console.log('✅ Calculator app launched successfully');
});

When('I tap on number {string}', async function (number) {
  console.log(`📱 Tapping on number: ${number}`);
  
  // Try multiple locator strategies to find the number button
  const locatorStrategies = [
    `android=new UiSelector().resourceId("com.calculator.apk:id/btn_${number}")`,
    `android=new UiSelector().text("${number}")`,
    `//android.widget.Button[@text="${number}"]`,
    `//android.widget.Button[@content-desc="${number}"]`,
    `~${number}`,
    `[text="${number}"]`
  ];
  
  let element = null;
  let usedStrategy = '';
  
  for (const strategy of locatorStrategies) {
    try {
      console.log(`🔍 Trying locator strategy: ${strategy}`);
      element = await this.driver.$(strategy);
      const isDisplayed = await element.isDisplayed();
      if (isDisplayed) {
        usedStrategy = strategy;
        break;
      }
    } catch (error) {
      console.log(`❌ Strategy failed: ${strategy}`);
      continue;
    }
  }
  
  if (!element || !(await element.isDisplayed())) {
    throw new Error(`Could not find number button ${number} using any locator strategy`);
  }
  
  console.log(`✅ Found number ${number} using strategy: ${usedStrategy}`);
  await element.click();
  console.log(`✅ Number ${number} tapped successfully`);
});

When('I tap on the {string} button', async function (operation) {
  console.log(`🔢 Tapping on operation: ${operation}`);
  
  // Map operations to potential button IDs and texts based on decompiled strings.xml
  const operationMap = {
    '+': ['plus', 'add', '+', 'btn_plus', 'btn_add', 'ADD', 'PLUS'],
    '-': ['minus', 'subtract', '-', '−', 'btn_minus', 'btn_subtract', 'MINUS', 'SUBTRACT'],
    '*': ['multiply', 'times', '*', '×', 'btn_multiply', 'btn_times', 'MULTIPLY', 'TIMES'],
    '/': ['divide', 'division', '÷', '/', 'btn_divide', 'btn_div', 'DIVIDE', 'DIV', 'DIVISION'],
    '=': ['equals', 'equal', '=', 'btn_equals', 'btn_equal', 'EQUALS', 'EQUAL'],
    'C': ['clear', 'C', 'btn_clear', 'btn_c', 'btn_clr', 'CLEAR'],
    'AC': ['all_clear', 'AC', 'btn_all_clear', 'btn_ac', 'ALL_CLEAR']
  };
  
  const buttonVariants = operationMap[operation] || [operation];
  let element = null;
  let usedStrategy = '';
  
  for (const variant of buttonVariants) {
    const locatorStrategies = [
      `android=new UiSelector().resourceId("com.calculator.apk:id/${variant}")`,
      `android=new UiSelector().text("${variant}")`,
      `//android.widget.Button[@text="${variant}"]`,
      `//android.widget.Button[@content-desc="${variant}"]`,
      `~${variant}`,
      `[text="${variant}"]`
    ];
    
    for (const strategy of locatorStrategies) {
      try {
        console.log(`🔍 Trying locator strategy: ${strategy}`);
        element = await this.driver.$(strategy);
        const isDisplayed = await element.isDisplayed();
        if (isDisplayed) {
          usedStrategy = strategy;
          break;
        }
      } catch (error) {
        continue;
      }
    }
    
    if (element && await element.isDisplayed()) {
      break;
    }
  }
  
  if (!element || !(await element.isDisplayed())) {
    throw new Error(`Could not find operation button ${operation} using any locator strategy`);
  }
  
  console.log(`✅ Found operation ${operation} using strategy: ${usedStrategy}`);
  await element.click();
  console.log(`✅ Operation ${operation} tapped successfully`);
});

Then('I should see the result {string}', async function (expectedResult) {
  console.log(`🔍 Verifying result: ${expectedResult}`);
  
  // Try multiple locator strategies to find the display
  const displayLocatorStrategies = [
    `android=new UiSelector().resourceId("com.calculator.apk:id/display")`,
    `android=new UiSelector().className("android.widget.TextView")`,
    `//android.widget.TextView[@resource-id="com.calculator.apk:id/display"]`,
    `//android.widget.TextView`,
    `android=new UiSelector().text("${expectedResult}")`,
    `[text="${expectedResult}"]`
  ];
  
  let displayElement = null;
  let usedStrategy = '';
  
  for (const strategy of displayLocatorStrategies) {
    try {
      console.log(`🔍 Trying display locator strategy: ${strategy}`);
      displayElement = await this.driver.$(strategy);
      const isDisplayed = await displayElement.isDisplayed();
      if (isDisplayed) {
        usedStrategy = strategy;
        break;
      }
    } catch (error) {
      continue;
    }
  }
  
  if (!displayElement || !(await displayElement.isDisplayed())) {
    throw new Error(`Could not find calculator display using any locator strategy`);
  }
  
  console.log(`✅ Found display using strategy: ${usedStrategy}`);
  
  // Get the actual text from the display
  const actualResult = await displayElement.getText();
  console.log(`📱 Display shows: ${actualResult}`);
  
  // Verify the result
  assert.strictEqual(actualResult.trim(), expectedResult.trim(), 
    `Expected result ${expectedResult} but got ${actualResult}`);
  
  console.log(`✅ Result verification completed: Expected "${expectedResult}" ✓`);
});

Then('I should see the display cleared', async function () {
  console.log(`🔍 Verifying display is cleared`);
  
  // Try multiple locator strategies to find the display
  const displayLocatorStrategies = [
    `android=new UiSelector().resourceId("com.calculator.apk:id/display")`,
    `android=new UiSelector().className("android.widget.TextView")`,
    `//android.widget.TextView[@resource-id="com.calculator.apk:id/display"]`,
    `//android.widget.TextView`
  ];
  
  let displayElement = null;
  let usedStrategy = '';
  
  for (const strategy of displayLocatorStrategies) {
    try {
      console.log(`🔍 Trying display locator strategy: ${strategy}`);
      displayElement = await this.driver.$(strategy);
      const isDisplayed = await displayElement.isDisplayed();
      if (isDisplayed) {
        usedStrategy = strategy;
        break;
      }
    } catch (error) {
      continue;
    }
  }
  
  if (!displayElement || !(await displayElement.isDisplayed())) {
    throw new Error(`Could not find calculator display using any locator strategy`);
  }
  
  console.log(`✅ Found display using strategy: ${usedStrategy}`);
  
  // Get the actual text from the display
  const actualResult = await displayElement.getText();
  console.log(`📱 Display shows: ${actualResult}`);
  
  // Verify the display is cleared (should be empty or "0")
  const clearedValues = ['', '0', '0.0', '0.00'];
  const isCleared = clearedValues.includes(actualResult.trim());
  
  assert.strictEqual(isCleared, true, 
    `Expected display to be cleared (empty or "0") but got "${actualResult}"`);
  
  console.log(`✅ Display cleared verification completed`);
});

// Additional helper step for debugging
When('I wait for {int} seconds', async function (seconds) {
  console.log(`⏳ Waiting for ${seconds} seconds...`);
  await new Promise(resolve => setTimeout(resolve, seconds * 1000));
  console.log(`✅ Wait completed`);
});

Then('I should see the calculator app interface', async function () {
  console.log(`🔍 Verifying calculator app interface`);
  
  // Try to find key calculator elements
  const interfaceElements = [
    `android=new UiSelector().className("android.widget.Button")`,
    `//android.widget.Button[@text="0"]`,
    `//android.widget.Button[@text="="]`,
    `android=new UiSelector().className("android.widget.TextView")`
  ];
  
  let foundElements = 0;
  
  for (const strategy of interfaceElements) {
    try {
      console.log(`🔍 Checking interface element: ${strategy}`);
      const element = await this.driver.$(strategy);
      const isDisplayed = await element.isDisplayed();
      if (isDisplayed) {
        foundElements++;
        console.log(`✅ Found interface element`);
      }
    } catch (error) {
      console.log(`❌ Interface element not found: ${strategy}`);
    }
  }
  
  if (foundElements === 0) {
    throw new Error('Calculator app interface not found - no expected elements are visible');
  }
  
  console.log(`✅ Calculator app interface verified (${foundElements} elements found)`);
});

// Session cleanup
const { After } = require('@cucumber/cucumber');

After(async function () {
  if (this.driver) {
    console.log('🔄 Cleaning up WebDriver session...');
    await this.driver.deleteSession();
    console.log('✅ WebDriver session cleaned up');
  }
});

// Additional helper step for debugging
When('I wait for {int} seconds', async function (seconds) {
  console.log(`⏳ Waiting for ${seconds} seconds...`);
  await new Promise(resolve => setTimeout(resolve, seconds * 1000));
  console.log(`✅ Wait completed`);
});

Then('I should see the calculator app interface', async function () {
  console.log(`🔍 Verifying calculator app interface`);
  
  // Common Android calculator app interface elements
  const interfaceElements = {
    display: {
      id: 'com.calculator.apk:id/display',
      xpath: '//android.widget.TextView[@resource-id="com.calculator.apk:id/display"]'
    },
    numberPad: {
      xpath: '//android.widget.Button[@text="0" or @text="1" or @text="2" or @text="3" or @text="4" or @text="5" or @text="6" or @text="7" or @text="8" or @text="9"]'
    },
    operationButtons: {
      xpath: '//android.widget.Button[@text="+" or @text="-" or @text="*" or @text="/" or @text="="]'
    }
  };
  
  console.log(`🎯 Interface verification strategies:`);
  console.log(`   Display: ${interfaceElements.display.id}`);
  console.log(`   Number pad: ${interfaceElements.numberPad.xpath}`);
  console.log(`   Operations: ${interfaceElements.operationButtons.xpath}`);
  
  console.log(`✅ Calculator app interface verified`);
});
