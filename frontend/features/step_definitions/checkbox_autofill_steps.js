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
import { deleteAllData } from "../../services/axiosRequests.js";

let spec = pactum.spec();

let base_url = "http://localhost:3001/";

setDefaultTimeout(60 * 1000);

let driver;

Before(function () {
  driver = initDriver();
  spec = pactum.spec();
});

After(async function () {
  await driver.quit();
});

Given("that I have saved my details", async function () {
  await driver.get(base_url + "details");
  await driver.sleep(1000);

  const parentName = await driver.findElement(
    By.className("parent_display_name")
  );
  parentName.sendKeys("Sally Abbot");
  const parentEmail = await driver.findElement(By.className("parent_email"));
  parentEmail.sendKeys("sally_abbot@gmail.com");
  const parentPhone = await driver.findElement(By.className("parent_number"));
  parentPhone.sendKeys("96183292");

  const nextButton = await driver.findElement(By.className("next"));

  deleteAllData();
  // FIXME: Having issues with the alert
  // nextButton.click();

  await driver.sleep(1000);

  // var actual_url = await driver.getCurrentUrl();
  // assert.equal(actual_url, base_url + "family");
});

Given("I add a new child", async function () {
  // TODO: Remove once the top works
  await driver.get(base_url + "family");
  await driver.sleep(1000);
  // TODO: Remove from here

  const addChildButton = await driver.findElement(By.className("add"));
  await addChildButton.click();

  await driver.sleep(1000);

  var actual_url = await driver.getCurrentUrl();
  assert.equal(actual_url, base_url + "child");
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
  // FIXME: To show the number?
  const childNumber = await driver.findElement(By.className("child_number"));
  var childNumberValue = await childNumber.getAttribute("value");
  assert.equal(childNumberValue, "96183292");

  var childEmail = driver.findElement(By.className("child_email"));
  var childEmailValue = await childEmail.getAttribute("value");
  assert.equal(childEmailValue, "sally_abbot@gmail.com");
});

When("I uncheck the autofill checkbox", async function () {
  const autofillCheckbox = await driver.findElement(By.className("autofill"));

  if (autofillCheckbox.isSelected()) {
    autofillCheckbox.click();
  }

  var checked = await autofillCheckbox.isSelected();
  assert.equal(checked, false);
});

Then("I should see my child details as empty", async function () {
  const childNumber = await driver.findElement(By.className("child_number"));
  var childNumberValue = await childNumber.getAttribute("value");
  assert.equal(childNumberValue, "");

  var childEmail = driver.findElement(By.className("child_email"));
  var childEmailValue = await childEmail.getAttribute("value");
  assert.equal(childEmailValue, "");
});
