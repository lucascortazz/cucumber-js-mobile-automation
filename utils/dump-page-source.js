const { remote } = require('webdriverio');

async function dumpPageSource() {
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
            project: 'Page Source Inspector',
            build: 'Debug Build 1.0',
            name: 'page_source_dump',
            'browserstack.debug': 'true'
        }
    };

    const driver = await remote(opts);
    
    try {
        console.log('📱 App launched, getting page source...');
        await driver.pause(5000); // Wait for app to load
        
        const pageSource = await driver.getPageSource();
        console.log('📄 Page Source:');
        console.log('='.repeat(80));
        console.log(pageSource);
        console.log('='.repeat(80));
        
        // Also try to find all buttons
        console.log('\n🔍 Finding all buttons...');
        const buttons = await driver.$$('//android.widget.Button');
        console.log(`Found ${buttons.length} buttons:`);
        
        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            try {
                const text = await button.getText();
                const contentDesc = await button.getAttribute('content-desc');
                const resourceId = await button.getAttribute('resource-id');
                
                console.log(`Button ${i + 1}:`);
                console.log(`  Text: "${text}"`);
                console.log(`  Content-desc: "${contentDesc}"`);
                console.log(`  Resource-id: "${resourceId}"`);
                console.log('  ---');
            } catch (error) {
                console.log(`Button ${i + 1}: Error getting attributes - ${error.message}`);
            }
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await driver.deleteSession();
        console.log('✅ Session closed');
    }
}

dumpPageSource();
