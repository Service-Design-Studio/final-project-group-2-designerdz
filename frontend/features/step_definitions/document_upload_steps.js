const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");

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

Then("I should no longer see the image preview", async function () {
  const passport_img = await driver.findElement(By.className("img_passport"));
  await driver.sleep(1000);
  let src_attribute = await passport_img.getAttribute("src");
  expect(src_attribute).to.equal(null);
});
