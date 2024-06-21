const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

async function testSignInWithGoogle() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the sign-in page
    await driver.get("http://localhost:3001/sign_in"); // Adjust the URL as necessary

    // Click the Google sign-in button
    const googleButton = await driver.wait(until.elementLocated(By.name("google_sign_in")), 10000);
    await googleButton.click();

    // Wait for the new window and switch to it
    await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2, 10000);
    const windows = await driver.getAllWindowHandles();
    await driver.switchTo().window(windows[1]);

    // Wait for the email input field to be present in the DOM
    const emailInput = await driver.wait(until.elementLocated(By.id("identifierId")), 10000);
    await emailInput.sendKeys("chebbihamdioff@gmail.com");

    const nextButton = await driver.wait(until.elementLocated(By.id("identifierNext")), 10000);
    await nextButton.click();

    const passwordInput = await driver.wait(until.elementLocated(By.name("password")), 10000);
    await passwordInput.sendKeys("@A1z2e3#r4t5y6@");

    const passwordNextButton = await driver.wait(until.elementLocated(By.id("passwordNext")), 10000);
    await passwordNextButton.click();

    // Switch back to the original window after successful login
    await driver.wait(async () => (await driver.getAllWindowHandles()).length === 1, 10000);
    await driver.switchTo().window(windows[0]);

    // Verify the user is redirected to the profile page
    await driver.wait(until.urlIs("http://localhost:3001/profile"), 10000);

    console.log("Google sign-in test passed");
  } catch (error) {
    console.error("Google sign-in test failed", error);
  } finally {
    await driver.quit();
  }
}

// Run the test
testSignInWithGoogle();