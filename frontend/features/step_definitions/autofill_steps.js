const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");

Then("my information should be auto-filled", async function () {
  // FIXME: Update the expected names
  var fullName = await driver.findElement(By.className("full_name")).getText();
  assert.equal(fullName, "");

  var passportNumber = await driver
    .findElement(By.className("passport_number"))
    .getText();
  assert.equal(passportNumber, "");

  let passportExpiry = await driver
    .findElement(By.xpath("//input[@placeholder='Select Date']"))
    .getText();
  assert.equal(passportExpiry, "");

  // TODO: How to get gender?

  var nationality = await driver
    .findElement(By.className("nationality"))
    .getText();
  assert.equal(nationality, "");

  await driver.findElement(By.className("male")).click();

  let dateOfBirth = await driver
    .findElement(By.xpath("//input[@placeholder='Select Date of Birth']"))
    .getText();
  assert.equal(dateOfBirth, "");
});

When("I edit my information", async function () {
  await driver.sleep(4000);
  let full_name = await driver.findElement(By.className("full_name"));
  await full_name.clear();
  await full_name.sendKeys("Da Yi Ma");
  //   await driver.findElement(By.className("full_name")).clear();
  //   await driver.sleep(2000);
  //   await driver.findElement(By.className("full_name")).sendKeys("Da Yi Ma");
  await driver.sleep(500);
});

Then("my information should be overwritten", async function () {
  await driver.sleep(500);
  let full_name_elem = await driver.findElement(By.className("full_name"));
  // get the text of the element
  let full_name_text = await full_name_elem.getAttribute("value");
  await driver.sleep(500);
  expect(full_name_text).to.equal("Da Yi Ma");
});

Then("I should be able to see it in the review page", async function () {
  // FIXME: make sure can continue to next page
  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  assert.equal(await driver.getCurrentUrl(), baseUrl + "review");

  var reviewFN = await driver.findElement(By.className("review_fn")).getText();
  assert.equal(reviewFN, "Da Yi Ma");
});
