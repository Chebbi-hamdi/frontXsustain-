const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

async function testSignup() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navigate to the signup page
    await driver.get('http://localhost:3001/sign_up'); // Adjust the URL as necessary

    // Fill in the form fields
    await driver.findElement(By.name('name')).sendKeys('John');
    await driver.findElement(By.name('familyName')).sendKeys('Doe');
    await driver.findElement(By.name('email.primary')).sendKeys('testuser@example.com');
    await driver.findElement(By.name('phone.primary')).sendKeys('1234567890');
    await driver.findElement(By.name('password')).sendKeys('password123');
    await driver.findElement(By.id('agree')).click(); // Click the agree checkbox

    // Click the sign up button
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for the navigation to complete and check the URL
    await driver.wait(until.urlIs('http://localhost:3001/sign_in'), 5000);

    console.log('Signup test passed');
  } catch (error) {
    console.error('Signup test failed', error);
  } finally {
    await driver.quit();
  }
}

testSignup();
