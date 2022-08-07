const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");
// const { initDriver } = require("../support/driverUtil");

Given("I am on {string}", async function (page) {
  await driver.executeScript(function () {
    localStorage.setItem("user_id", "0");
  });
  await driver.get(baseUrl + page);
  await driver.sleep(500);
  var actualUrl = await driver.getCurrentUrl();
  actualUrl = actualUrl.split("/")[3];
  expect(actualUrl).to.equal(page);
});

When("I click on the next button", async function () {
  const registration_button = await driver.findElement(By.className("next"));
  await registration_button.click();
  await driver.sleep(500);
});

Then("I should move forward to the {string} page", async function (next) {
  var expectedUrl = next;
  var actualUrl = await driver.getCurrentUrl();
  actualUrl = actualUrl.split("/")[3];
  expect(actualUrl).to.equal(expectedUrl);
});

When("I click on the back button", async function () {
  const registration_button = await driver.findElement(By.className("back"));
  await registration_button.click();
  await driver.sleep(500);
});

Then("I should go back to the {string} page", async function (previous) {
  var expectedUrl = previous;
  var actualUrl = await driver.getCurrentUrl();
  actualUrl = actualUrl.split("/")[3];
  expect(actualUrl).to.equal(expectedUrl);
});