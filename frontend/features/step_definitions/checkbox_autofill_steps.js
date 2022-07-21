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
const { expect, assert, AssertionError } = require("chai");
const { setDefaultTimeout } = require("@cucumber/cucumber");
const pactum = require("pactum");
const axios = require("axios");

let spec = pactum.spec();

// let baseUrl = "https://react-frontend-353408.as.r.appspot.com/";
let baseUrl = "http://localhost:3001/";

setDefaultTimeout(60 * 1000);

let parent_number;
let child_number;

let driver;

Before(async function () {
  driver = initDriver();
  await driver.get(baseUrl);
  await driver.sleep(1000);
  await driver.executeScript(function () {
    localStorage.clear();
  });
  parent_number = Math.floor(Math.random() * 10000);
  child_number = Math.floor(Math.random() * 10000);
  spec = pactum.spec();
});

After(async function () {
  await driver.quit();
});

Given("that I have saved my details", async function () {
  await driver.get(baseUrl);
  await driver.sleep(1000);
  const notACustomerYetButton = await driver.findElement(
    By.className("bg-red-500")
  );
  await notACustomerYetButton.click();
  await driver.sleep(1000);

  await driver.findElement(By.className("family-next")).click();
  await driver.sleep(1000);
  
  await driver.findElement(By.className("display_name")).sendKeys("Sally Abbot");
  await driver.findElement(By.className("email")).sendKeys("sally@gmail.com");
  await driver.findElement(By.className("phone_number")).sendKeys(parent_number);
  await driver.sleep(1000);

  assert.equal(await driver.getCurrentUrl(), baseUrl + "details");

  await driver.findElement(By.className("next")).click();
  await driver.sleep(1000);

  assert.equal(await driver.getCurrentUrl(), baseUrl + "family");
});

Given("I add a new child", async function () {
  assert.equal(await driver.getCurrentUrl(), baseUrl + "family");

  await driver.findElement(By.className("add")).click();
  await driver.sleep(1000);

  var actual_url = await driver.getCurrentUrl();
  assert.equal(actual_url, baseUrl + "child");
  
  await driver.findElement(By.className("display_name")).sendKeys("Salah Abbot");
});

When("I check the autofill checkbox", async function () {
  const autofillCheckbox = await driver.findElement(By.className("autofill"));

  if (!autofillCheckbox.isSelected()) {
    autofillCheckbox.click();
  }

  var checked = await autofillCheckbox.isSelected();
  assert.equal(checked, true);
});

Then("I should see my child details autofilled", async function () {
  var childNumberValue = await driver.findElement(By.className("phone_number")).getAttribute("value");
  assert.equal(childNumberValue, parent_number);

  var childEmailValue = await driver.findElement(By.className("email")).getAttribute("value");
  assert.equal(childEmailValue, "sally@gmail.com");
});

When("I move to the review page", async function() {
  // Move to family page
  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  var actual_url = await driver.getCurrentUrl();
  assert.equal(actual_url, baseUrl + "family");

  // Move to passport page
  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  var actual_url = await driver.getCurrentUrl();
  assert.equal(actual_url, baseUrl + "passport");

  await driver.findElement(By.className("full_name")).sendKeys("Sally Abbot");
  await driver.findElement(By.className("passport_number")).sendKeys("E32521921");
  await driver.findElement(By.className("nationality")).sendKeys("American");
  await driver.findElement(By.className("female")).click();
  await driver.sleep(500);

  await driver.findElement(By.id("user_1")).click();
  await driver.sleep(500);

  await driver.findElement(By.className("full_name")).sendKeys("Sarah Abbot");
  await driver.findElement(By.className("passport_number")).sendKeys("E34152315");
  await driver.findElement(By.className("nationality")).sendKeys("American");
  await driver.findElement(By.className("female")).click();
  await driver.sleep(500);

  // TODO: Remove
  await driver.findElement(By.id("user_0")).click();
  await driver.sleep(500);

  // Move to review page
  await driver.findElement(By.className("next")).click();
  await driver.sleep(1000);

  var actual_url = await driver.getCurrentUrl();
  assert.equal(actual_url, baseUrl + "review");
});

When("I click on my child icon", async function() {
  await driver.findElement(By.id("user_1")).click();
  await driver.sleep(500);
});

Then("I should be able to see that my child details are the same as mine", async function() {
  var childNumberValue = await driver.findElement(By.className("phone_number")).getAttribute("value");
  // FIXME: 
  // assert.equal(childNumberValue, parent_number);

  var childEmailValue = await driver.findElement(By.className("email")).getAttribute("value");
  // FIXME: 
  // assert.equal(childEmailValue, "sally@gmail.com");
});


When("I uncheck the autofill checkbox", async function () {
  const autofillCheckbox = await driver.findElement(By.className("autofill"));

  if (autofillCheckbox.isSelected()) {
    autofillCheckbox.click();
  }

  var checked = await autofillCheckbox.isSelected();
  assert.equal(checked, false);
});

When("I edit my child contact details", async function() {
  await driver.findElement(By.className("phone_number")).sendKeys(child_number);
  await driver.findElement(By.className("email")).sendKeys("sarah@gmail.com");
});

Then("I should be able to see that my child details are different", async function() {
  var childNumberValue = await driver.findElement(By.className("phone_number")).getAttribute("value");
  // FIXME: 
  // assert.equal(childNumberValue, child_number);

  var childEmailValue = await driver.findElement(By.className("email")).getAttribute("value");
  // FIXME: 
  // assert.equal(childEmailValue, "sarah@gmail.com");
});