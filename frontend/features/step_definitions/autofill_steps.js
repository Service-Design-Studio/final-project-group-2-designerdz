const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");

Then("my information should be auto-filled", async function () {
  await driver.sleep(5000);
  var fullName = await driver
    .findElement(By.className("full_name"))
    .getAttribute("value");

  assert.equal(fullName, "MCCABE NICOLE SANDRA");

  var passportNumber = await driver
    .findElement(By.className("passport_number"))
    .getAttribute("value");
  assert.equal(passportNumber, "L4041765");

  let passportExpiry = await driver
    .findElement(By.xpath("//input[@placeholder='Select Date']"))
    .getAttribute("value");
  assert.equal(passportExpiry, "05/2013");

  // TODO: How to get gender?
  // select element with class "Mui-selected" and get its value
  let selected_button = await driver.findElement(By.className("Mui-selected"));
  let curGender = await selected_button.getAttribute("value");
  assert.equal(curGender, "FEMALE");

  var nationality = await driver
    .findElement(By.className("nationality"))
    .getAttribute("value");
  assert.equal(nationality, "AUSTRALIAN");

  await driver.findElement(By.className("male")).click();

  let dateOfBirth = await driver
    .findElement(By.xpath("//input[@placeholder='Select Date of Birth']"))
    .getAttribute("value");
  assert.equal(dateOfBirth, "16/11/1982");
});

When("I edit my information", async function () {
  await driver.sleep(4000);
  let full_name = await driver.findElement(By.className("full_name"));
  await full_name.clear();
  await full_name.sendKeys("Da Yi Ma");
  await driver.sleep(500);
});

Then("my information should be overwritten", async function () {
  await driver.sleep(500);
  let full_name_elem = await driver.findElement(By.className("full_name"));
  let full_name_text = await full_name_elem.getAttribute("value");
  await driver.sleep(500);
  expect(full_name_text).to.equal("Da Yi Ma");
});

Then("I should be able to see it in the review page", async function () {
  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  assert.equal(await driver.getCurrentUrl(), baseUrl + "review");

  var reviewFN = await driver.findElement(By.className("review_fn")).getText();
  assert.equal(reviewFN, "Da Yi Ma");
});
