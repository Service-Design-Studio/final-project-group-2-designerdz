const {
  Given,
  When,
  Then,
  Before,
  AfterAll,
  After,
  And,
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

Given("I have successfully added a child", async function() {
  await driver.get(base_url + "family");
  await driver.sleep(1000);

  const addChildButton = await driver.findElement(By.className("add"));
  addChildButton.click();
  await driver.sleep(1000);

  const childName = await driver.findElement(By.className("child_display_name"));
  childName.sendKeys("Salah Abbot");

  const autofillCheckbox = await driver.findElement(By.className("autofill"));

  if(!autofillCheckbox.isSelected()) {
    autofillCheckbox.click();
  }

  var checked = await autofillCheckbox.isSelected();
  assert.equal(checked, true);

  const nextButton = await driver.findElement(By.className("next"));
  nextButton.click();

  await driver.sleep(1000);

  var actual_url = await driver.getCurrentUrl();
  assert.equal(actual_url, base_url + "family");
})

Given("that I am on the family page", async function() {
  await driver.get(base_url + "family");
  await driver.sleep(1000);

  var actual_url = await driver.getCurrentUrl();
  assert.equal(actual_url, base_url + "family");
})

Then("I should see my child on the family page", async function() {
  var actual_url = await driver.getCurrentUrl();
  assert.equal(actual_url, base_url + "family");

  // FIXME:
  // assert.equal("Sally Abbot", source_code_test);
})

When("I edit my child name", async function() {
  //FIXME: Button cannot be found

  var edit_button = await driver.findElement(By.id("edit_0"));

  await edit_button.click();
  await driver.sleep(1000);

  var actual_url = await driver.getCurrentUrl();
  assert.equal(actual_url, base_url + "child");


})

Then("I should see my edited child name on the family page", async function() {
  //TODO: Should mimic the above function but with a different name  

  const childName = await driver.findElement(By.className("child_display_name"));
  childName.sendKeys("Sally Abbot");

  const autofillCheckbox = await driver.findElement(By.className("autofill"));

  if(!autofillCheckbox.isSelected()) {
    autofillCheckbox.click();
  }

  var checked = await autofillCheckbox.isSelected();
  assert.equal(checked, true);

  const nextButton = await driver.findElement(By.className("next"));
  nextButton.click();

  await driver.sleep(1000);

  var actual_url = await driver.getCurrentUrl();
  assert.equal(actual_url, base_url + "family");
})

When("I click on remove button for my child", async function() {
  var remove_button = await driver.findElement(By.className("child_remove"));
  await remove_button.click();
  await driver.sleep(1000);
})

Then("my child should be removed", async function() {
  // TODO: should mimic the above functionality but assert for not containing
})



