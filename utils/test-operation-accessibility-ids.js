const { remote } = require('webdriverio');

async function testOperationAccessibilityIds() {
    console.log('🔍 Testing operation accessibility IDs...');
    
    const opts = {
        hostname: 'hub-cloud.browserstack.com',
        port: 80,
        path: '/wd/hub',
        capabilities: {
            platformName: 'Android',
            'browserstack.user': process.env.BROWSERSTACK_USERNAME,
            'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
            app: process.env.APP_URL,
            device: process.env.DEVICE || 'Samsung Galaxy S20 Ultra',
            os_version: process.env.OS_VERSION || '10',
            project: 'Operation Accessibility Test',
            build: 'Debug Build 1.0',
            name: 'accessibility_test',
            'browserstack.debug': 'true'
        }
    };

    const driver = await remote(opts);
    
    try {
        console.log('📱 App launched, testing accessibility IDs...');
        await driver.pause(5000);
        
        // Test common operation accessibility IDs
        const operationTests = [
            // Division patterns
            'divide', 'division', 'div', '÷', '/', 'DIVIDE', 'DIV',
            // Addition patterns  
            'add', 'addition', 'plus', '+', 'ADD', 'PLUS',
            // Subtraction patterns
            'subtract', 'subtraction', 'minus', '-', 'SUBTRACT', 'MINUS',
            // Multiplication patterns
            'multiply', 'multiplication', 'times', '*', '×', 'MULTIPLY', 'TIMES',
            // Equals patterns
            'equals', 'equal', '=', 'EQUALS', 'EQUAL',
            // Clear patterns
            'clear', 'C', 'CLEAR', 'AC', 'ALL_CLEAR'
        ];
        
        console.log('🔍 Testing accessibility IDs for operations...');
        
        for (const testId of operationTests) {
            try {
                const element = await driver.$(`~${testId}`);
                if (await element.isDisplayed()) {
                    console.log(`✅ Found: ~${testId}`);
                    
                    // Try to get more info about this element
                    try {
                        const text = await element.getText();
                        console.log(`   Text: "${text}"`);
                    } catch (e) {
                        console.log(`   Text: Unable to get text`);
                    }
                }
            } catch (error) {
                // Silent continue for not found elements
            }
        }
        
        console.log('\n🔍 Testing numbers that we know work...');
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        for (const num of numbers) {
            try {
                const element = await driver.$(`~${num}`);
                if (await element.isDisplayed()) {
                    console.log(`✅ Number found: ~${num}`);
                }
            } catch (error) {
                console.log(`❌ Number not found: ~${num}`);
            }
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await driver.deleteSession();
        console.log('✅ Session closed');
    }
}

testOperationAccessibilityIds();
