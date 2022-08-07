const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");
  
When("I click on my icon", async function () {
    await driver.findElement(By.id("user_0")).click();
    await driver.sleep(500);
});

When("I click on my child icon", async function () {
    await driver.findElement(By.id("user_1")).click();
    await driver.sleep(500);
});

When("I click on the next button", async function () {
    const registration_button = await driver.findElement(By.className("next"));
    await registration_button.click();
    await driver.sleep(500);
  }); 
  
  When("I click on the back button", async function () {
    const registration_button = await driver.findElement(By.className("back"));
    await registration_button.click();
    await driver.sleep(500);
  });
  