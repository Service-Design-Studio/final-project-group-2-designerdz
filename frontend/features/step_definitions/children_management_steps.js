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
  await driver.sleep(500);
  await driver.executeScript(function () {
    localStorage.clear();
  });
  spec = pactum.spec();
});

After(async function () {
  await driver.quit();
});

Given("I have successfully added a child", async function () {
  await driver.get(baseUrl);
  await driver.sleep(500);
  const notACustomerYetButton = await driver.findElement(
    By.className("bg-red-500")
  );
  notACustomerYetButton.click();
  await driver.sleep(500);

  const familyButton = await driver.findElement(By.className("family-next"));
  familyButton.click();
  await driver.sleep(500);

  await driver.findElement(By.className("display_name")).sendKeys("John Doe Doe");
  await driver.findElement(By.className("phone_number")).sendKeys(Math.floor(Math.random() * 10000));
  await driver.sleep(500);

  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  var actual_url = await driver.getCurrentUrl();
  actual_url = actual_url.split("/")[3];
  expect(actual_url).to.equal("family");

  await driver.findElement(By.className("add")).click();
  await driver.sleep(500);

  await driver.findElement(By.className("display_name")).sendKeys("Salah Abbot");

  const autofillCheckbox = await driver.findElement(By.className("autofill"));

  if (!autofillCheckbox.isSelected()) {
    autofillCheckbox.click();
  }

  var checked = await autofillCheckbox.isSelected();
  assert.equal(checked, true);

  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  var actual_url = await driver.getCurrentUrl();
  actual_url = actual_url.split("/")[3];
  expect(actual_url).to.equal("family");
});

When("I am on the family page", async function () {
  var actual_url = await driver.getCurrentUrl();
  assert.equal(actual_url, baseUrl + "family");
});

Then("I should see my child on the family page", async function () {
  const childName = await driver.findElement(By.id("name_0")).getText();
  assert.equal(childName, "Mr Salah Abbot");
});

When("I edit my child name", async function () {
  const edit_button = await driver.findElement(By.id("edit_0"));
  edit_button.click();
  await driver.sleep(500);

  const childName2 = await driver.findElement(
    By.className("display_name")
  );
  childName2.sendKeys(" Edited");

  const nextButton2 = await driver.findElement(By.className("next"));
  nextButton2.click();
  await driver.sleep(500);
});

Then("I should see my edited child name on the family page", async function () {
  const childName = await driver.findElement(By.id("name_0")).getText();
  assert.equal(childName, "Mr Salah Abbot Edited");
});

When("I click on remove button for my child", async function () {
  await driver.findElement(By.id("delete_0")).click();
  await driver.sleep(500);
});

Then("my child should be removed", async function () {
  try {
    const childNameDeleted = await driver.findElement(By.id("name_0"));
  } catch (error) {
    assert.equal(error.name, "NoSuchElementError");
  }
});
