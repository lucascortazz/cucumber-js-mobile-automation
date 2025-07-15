const { remote } = require('webdriverio');

async function inspectCalculatorElements() {
    console.log('🔍 Connecting to BrowserStack device...');
    
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
            project: 'Calculator Element Inspector',
            build: 'Debug Build 1.0',
            name: 'element_inspector',
            'browserstack.debug': 'true'
        }
    };

    const driver = await remote(opts);
    
    try {
        console.log('📱 App launched, waiting for elements to load...');
        await driver.pause(5000);
        
        // Try to find all clickable elements
        console.log('\n🔍 Looking for all clickable elements...');
        
        const allElements = await driver.$$('//*[@clickable="true"]');
        console.log(`Found ${allElements.length} clickable elements:`);
        
        for (let i = 0; i < allElements.length; i++) {
            const element = allElements[i];
            try {
                const text = await element.getText();
                const contentDesc = await element.getAttribute('content-desc');
                const resourceId = await element.getAttribute('resource-id');
                const className = await element.getAttribute('class');
                
                console.log(`\nElement ${i + 1}:`);
                console.log(`  Text: "${text}"`);
                console.log(`  Content-desc: "${contentDesc}"`);
                console.log(`  Resource-id: "${resourceId}"`);
                console.log(`  Class: "${className}"`);
                console.log('  ---');
            } catch (error) {
                console.log(`Element ${i + 1}: Error getting attributes - ${error.message}`);
            }
        }
        
        // Also try to find specific patterns
        console.log('\n🔍 Testing specific accessibility IDs...');
        const testPatterns = [
            'add', 'plus', '+', 'btn_plus', 'btn_add',
            'subtract', 'minus', '-', 'btn_minus', 'btn_subtract',
            'multiply', 'times', '*', 'btn_multiply', 'btn_times',
            'divide', 'div', '/', 'btn_divide', 'btn_div',
            'equals', 'equal', '=', 'btn_equals', 'btn_equal',
            'clear', 'C', 'btn_clear', 'btn_c'
        ];
        
        for (const pattern of testPatterns) {
            try {
                const element = await driver.$(`~${pattern}`);
                if (await element.isDisplayed()) {
                    console.log(`✅ Found accessible element: ~${pattern}`);
                    const text = await element.getText();
                    console.log(`   Text: "${text}"`);
                }
            } catch (error) {
                // Silent continue
            }
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await driver.deleteSession();
        console.log('✅ Session closed');
    }
}

inspectCalculatorElements();
