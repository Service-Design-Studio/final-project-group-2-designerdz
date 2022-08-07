const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

When(/^I click on (.*) icon$/, async function(type) {
  if (type == "my") {
    await driver.findElement(By.id("user_0")).click();
    await driver.sleep(500);
  } else if (type == "my child") {
    await driver.findElement(By.id("user_1")).click();
    await driver.sleep(500);
  }
})

When(/^I click on the (.*) button$/, async function(name) {
  await driver.findElement(By.className(name)).click();
  await driver.sleep(500);
})
  