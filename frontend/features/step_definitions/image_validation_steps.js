const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");

Given("I am on the passport page", async function() {
  await driver.get(baseUrl);
  await driver.sleep(2000);

  const notACustomerYetButton = await driver.findElement(
    By.className("bg-red-500")
  );
  notACustomerYetButton.click();
  await driver.sleep(1000);

  const goToDetailsButton = await driver.findElement(By.className("next"));
  goToDetailsButton.click();
  await driver.sleep(1000);

  await driver.findElement(By.className("display_name")).sendKeys("John");
  await driver.findElement(By.className("phone_number")).sendKeys(parentNumber);

  const goToPassportButton = await driver.findElement(By.className("next"));
  goToPassportButton.click();
  await driver.sleep(5000);
  expect(await driver.getCurrentUrl()).to.equal(baseUrl + "passport");
});

When("I upload a bad {string}", async function (image) {
  const uploadButton = await driver.findElement(By.className("btn_upload"));
  var path = process.cwd()+ '/features' + '/resources/'+ image;
  uploadButton.sendKeys(path);
  await driver.sleep(5000);

});

Then("I should observe {string}", async function (error) {
    const errorName = await driver.findElement(By.className("text-red-500")).getText();
    assert.equal(errorName, error);
});