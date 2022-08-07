const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");

When("I have uploaded a document", async function () {
  const uploadButton = await driver.findElement(By.className("btn_upload"));
  var path = process.cwd()+'/features/resources/good_passport.png';
  uploadButton.sendKeys(path);
  await driver.sleep(5000);
});

Then("I should see a loading indicator", async function () {
  // find element with classname of status_loading
  const loadingIndicator = await driver.findElement(
    By.className("status_loading")
  );

  // get all classNames of loadingIndicator
  const classNames = await loadingIndicator.getAttribute("class");

  
  // check that element does not have classname of hidden
  expect(classNames).to.not.include("pop");
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
