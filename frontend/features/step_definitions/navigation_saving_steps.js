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

// let baseUrl = "https://react-frontend-353408.as.r.appspot.com/";
let baseUrl = "http://localhost:3001/";

setDefaultTimeout(60 * 1000);

let driver;

Before(async function () {
  driver = initDriver();

  await driver.get(baseUrl);
  await driver.sleep(100);

  await driver.executeScript(function() {
      localStorage.setItem("user_id", "1");
  });

  spec = pactum.spec();
});

After(async function () {
  await driver.quit();
});


Given("I am on {string}", async function (page) {
  await driver.get(baseUrl + page);
  await driver.sleep(500);

  var actual_url = await driver.getCurrentUrl();
  actual_url = actual_url.split("/")[3];
  expect(actual_url).to.equal(page);
});

When("I click on the next button", async function () {
  const registration_button = await driver.findElement(By.className("next"));
  await registration_button.click();
  await driver.sleep(500);
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
  await driver.sleep(500);
});

Then("I should go back to the {string} page", async function (previous) {
  var expected_url = previous;
  var actual_url = await driver.getCurrentUrl();
  actual_url = actual_url.split("/")[3];
  expect(actual_url).to.equal(expected_url);
});

Given("I am on the passport page", function () {
  driver.get(baseUrl + "passport");
});

Given("I am on passport", function () {
  driver.get(baseUrl + "passport");
});

Given("I have filled in my {string}", function (full_name) {
  driver.findElement(By.className("full_name")).sendKeys(full_name);
});

Then("I should move forward to the review page", function () {
  driver.get(baseUrl + "review");
});

Then("my {string} should be shown", async function (full_name) {
  const fn = await driver.findElement(By.className("review_fn")).getText();
  expect(fn, full_name);
  await driver.sleep(500);
});

When("I restart the app", function () {
  driver.close();
  driver = initDriver();
});

Then(
  "I should be redirected back to {string} where I left off",
  async function (page) {
    expect(driver.getCurrentUrl, baseUrl + page);
  }
);

Given("I am on the restore page", function () {
  driver.get(baseUrl + "restore");
  driver.sleep(500);
});

When("I submit my {string} and OTP", function (number) {
  driver.findElement(By.className("mobile_no")).sendKeys(number);
  const continue_button = driver.findElement(By.className("continue_btn"));
  continue_button.click();
});
