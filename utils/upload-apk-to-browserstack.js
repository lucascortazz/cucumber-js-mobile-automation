#!/usr/bin/env node

// Upload APK to BrowserStack and get the app URL
const fs = require('fs');
const path = require('path');
const https = require('https');
const FormData = require('form-data');

require('dotenv').config();

async function uploadAPKToBrowserStack() {
  const apkPath = path.join(__dirname, '..', 'app', 'Calculator_8.7 (735708245)_APKPure.apk');
  
  if (!fs.existsSync(apkPath)) {
    throw new Error(`APK file not found: ${apkPath}`);
  }
  
  const username = process.env.BROWSERSTACK_USERNAME;
  const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
  
  if (!username || !accessKey) {
    throw new Error('Please set BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY environment variables');
  }
  
  console.log('📱 Uploading Calculator APK to BrowserStack...');
  console.log(`📁 APK File: ${apkPath}`);
  console.log(`👤 Username: ${username}`);
  
  const form = new FormData();
  form.append('file', fs.createReadStream(apkPath));
  
  const options = {
    hostname: 'api-cloud.browserstack.com',
    port: 443,
    path: '/app-automate/upload',
    method: 'POST',
    auth: `${username}:${accessKey}`,
    headers: form.getHeaders()
  };
  
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.app_url) {
            console.log('✅ APK uploaded successfully!');
            console.log(`📱 App URL: ${response.app_url}`);
            console.log(`🆔 App ID: ${response.app_id || 'N/A'}`);
            console.log(`📊 File Size: ${response.file_size || 'N/A'} bytes`);
            
            // Save the app URL to a file for later use
            const configPath = path.join(__dirname, 'browserstack-app-config.json');
            const config = {
              app_url: response.app_url,
              app_id: response.app_id,
              uploaded_at: new Date().toISOString(),
              file_name: 'Calculator_8.7 (735708245)_APKPure.apk'
            };
            
            fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
            console.log(`💾 App configuration saved to: ${configPath}`);
            
            resolve(response.app_url);
          } else {
            console.error('❌ Upload failed:', response);
            reject(new Error(`Upload failed: ${response.error || 'Unknown error'}`));
          }
        } catch (error) {
          console.error('❌ Failed to parse response:', error);
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ Request error:', error);
      reject(error);
    });
    
    form.pipe(req);
  });
}

// Run the upload if this script is executed directly
if (require.main === module) {
  uploadAPKToBrowserStack()
    .then((appUrl) => {
      console.log('\n🎉 Upload completed successfully!');
      console.log(`📱 Use this app URL in your tests: ${appUrl}`);
      console.log('\n📋 Example usage:');
      console.log(`DEVICE="Samsung Galaxy S20 Ultra" OS_VERSION="13" PLATFORM="Android" APP_URL="${appUrl}" npm run test:calculator`);
    })
    .catch((error) => {
      console.error('\n❌ Upload failed:', error.message);
      process.exit(1);
    });
}

module.exports = { uploadAPKToBrowserStack };
