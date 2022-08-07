const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");

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

  await driver
    .findElement(By.className("display_name"))
    .sendKeys("John Doe Doe");
  await driver
    .findElement(By.className("phone_number"))
    .sendKeys(parentNumber);
  await driver.sleep(500);

  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  var actualUrl = await driver.getCurrentUrl();
  actualUrl = actualUrl.split("/")[3];
  expect(actualUrl).to.equal("family");

  await driver.findElement(By.className("add")).click();
  await driver.sleep(500);

  await driver
    .findElement(By.className("display_name"))
    .sendKeys("Salah Abbot");

  const autofillCheckbox = await driver.findElement(By.className("autofill"));

  if (!autofillCheckbox.isSelected()) {
    autofillCheckbox.click();
  }

  var checked = await autofillCheckbox.isSelected();
  assert.equal(checked, true);

  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  var actualUrl = await driver.getCurrentUrl();
  actualUrl = actualUrl.split("/")[3];
  expect(actualUrl).to.equal("family");
});

When("I am on the family page", async function () {
  var actualUrl = await driver.getCurrentUrl();
  assert.equal(actualUrl, baseUrl + "family");
});

Then("I should see my child on the family page", async function () {
  const childName = await driver.findElement(By.id("name_0")).getText();
  assert.equal(childName, "Mr Salah Abbot");
});

When("I edit my child name", async function () {
  const edit_button = await driver.findElement(By.id("edit_0"));
  edit_button.click();
  await driver.sleep(500);

  const childName2 = await driver.findElement(By.className("display_name"));
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
