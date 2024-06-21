const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

async function testLogin() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navigate to the login page
    await driver.get('http://localhost:3001/sign_in'); // Adjust the URL as necessary

    // Fill in the email field
    await driver.findElement(By.name('email')).sendKeys('testuser@example.com');

    // Fill in the password field
    await driver.findElement(By.name('password')).sendKeys('password123');

    // Click the sign in button
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for the navigation to complete and check the URL
    await driver.wait(until.urlIs('http://localhost:3001/profile'), 5000);

    console.log('Login test passed');
  } catch (error) {
    console.error('Login test failed', error);
  } finally {
    await driver.quit();
  }
}

testLogin();
