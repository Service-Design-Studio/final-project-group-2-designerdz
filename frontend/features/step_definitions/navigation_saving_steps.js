const {
  Given,
  When,
  Then,
  Before,
  AfterAll,
  After,
} = require("@cucumber/cucumber");
const {
  Builder,
  By,
  Capabilities,
  Key,
  Button,
  ChromiumWebDriver,
} = require("selenium-webdriver");
const { initDriver } = require("../support/driverUtil");
const { expect, assert } = require("chai");
const { setDefaultTimeout } = require("@cucumber/cucumber");
const pactum = require("pactum");

let spec = pactum.spec();

let base_url = "https://react-frontend-353408.as.r.appspot.com/";

setDefaultTimeout(60 * 1000);

let driver;

Before(function () {
  driver = initDriver();
  spec = pactum.spec();
});

After(async function () {
  await driver.quit();
});

Given("I am on {string}", async function (page) {
  await driver.get(base_url + page);
  await driver.sleep(1000);
});

When("I click on the next button", async function () {
  const registration_button = await driver.findElement(By.className("next"));
  await registration_button.click();
  await driver.sleep(1000);
});

Then("I should move forward to the {string} page", async function (next) {
  var expected_url = next;
  var actual_url = await driver.getCurrentUrl();
  actual_url = actual_url.split("/")[3];
  expect(actual_url).to.equal(expected_url);
});

When("I click on the back button", async function () {
  const registration_button = await driver.findElement(By.className("back"));
  await registration_button.click();
  await driver.sleep(1000);
});

Then("I should go back to the {string} page", async function (previous) {
  var expected_url = previous;
  var actual_url = await driver.getCurrentUrl();
  actual_url = actual_url.split("/")[3];
  expect(actual_url).to.equal(expected_url);
});

Given("I am on the passport page", function () {
  driver.get(base_url + "passport");
});

Given("I am on passport", function () {
  driver.get(base_url + "passport");
});

Given("I have filled in my {string}", function (full_name) {
  driver.findElement(By.className("full_name")).sendKeys(full_name);
});

Then("I should move forward to the review page", function () {
  driver.get(base_url + "review");
});

Then("my {string} should be shown", async function (full_name) {
  const fn = await driver.findElement(By.className("review_fn")).getText();
  expect(fn, full_name);
  await driver.sleep(1000);
});

When("I restart the app", function () {
  driver.close();
  driver = initDriver();
});

Then(
  "I should be redirected back to {string} where I left off",
  async function (page) {
    expect(driver.getCurrentUrl, base_url + page);
  }
);

Given("I am on the restore page", function () {
  driver.get(base_url + "restore");
  driver.sleep(1000);
});

When("I submit my {string} and OTP", function (number) {
  driver.findElement(By.className("mobile_no")).sendKeys(number);
  const continue_button = driver.findElement(By.className("continue_btn"));
  continue_button.click();
});
