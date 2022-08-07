const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");

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