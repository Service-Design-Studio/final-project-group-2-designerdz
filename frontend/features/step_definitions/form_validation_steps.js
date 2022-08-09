const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");

Given("I have not filled in any fields", async function() {
  // TODO: check all the fields possible using try catches
})

Then("I should see {string}", async function (errors) {
  let error_elements = await driver.findElements(By.className("text-red-500"));
  let error_array = errors.split(",");

  if (error_elements.length == 7) {
    error_elements.shift();
  }
  expect(error_elements.length).to.equal(error_array.length);
  for (let i = 0; i < error_elements.length; i++) {
    let error_text = await error_elements[i].getText();
    expect(error_text).to.equal(error_array[i] + " is Required");
  }
});

Then(
  "I should see an icon on the carousel of the family member I just navigated away from",
  async function () {
    let found = await driver.findElements(By.id("incomplete_0"));
    expect(found.length).to.equal(1);
  }
);
