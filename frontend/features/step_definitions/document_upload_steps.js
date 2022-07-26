const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");

Given("I am on passport page", async function () {
  await driver.get(baseUrl);
  await driver.sleep(2000);

  const notACustomerYetButton = await driver.findElement(
    By.className("bg-red-500")
  );
  notACustomerYetButton.click();
  await driver.sleep(1000);

  const goToDetailsButton = await driver.findElement(By.className("next"));
  goToDetailsButton.click();
  await driver.sleep(1000);

  await driver.findElement(By.className("display_name")).sendKeys("John");
  await driver.findElement(By.className("phone_number")).sendKeys(parentNumber);

  const goToPassportButton = await driver.findElement(By.className("next"));
  goToPassportButton.click();
  await driver.sleep(1000);
  expect(await driver.getCurrentUrl()).to.equal(baseUrl + "passport");
});

When("I have uploaded a document", async function () {
  const uploadButton = await driver.findElement(By.className("btn_upload"));
  // FIXME: update path
  uploadButton.sendKeys("/Users/yida/Desktop/passport_aussie.jpg");
});

Then("I should see a loading indicator", async function () {
  // find element with classname of status_loading
  const loadingIndicator = await driver.findElement(
    By.className("status_loading")
  );

  // get all classNames of loadingIndicator
  const classNames = await loadingIndicator.getAttribute("class");

  // check that element does not have classname of hidden
  expect(classNames).to.not.include("hidden");
});

Then("I should see a preview of the document", async function () {
  const passport_img = await driver.findElement(By.className("img_passport"));
  await driver.sleep(1000);
  expect(passport_img).to.exist;
});

When("I click on the delete button", async function () {
  // select the delete button
  await driver.sleep(3000);
  const deleteButton = await driver.findElement(By.className("btn_delete"));
  deleteButton.click();
  await driver.sleep(1000);
});

Then("I should no longer see the image preview", async function () {
  const passport_img = await driver.findElement(By.className("img_passport"));
  await driver.sleep(1000);
  let src_attribute = await passport_img.getAttribute("src");
  expect(src_attribute).to.equal(null);
});
