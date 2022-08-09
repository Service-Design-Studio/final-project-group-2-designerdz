const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

Given("I make a GET request to {string}", function (url) {
  spec.get(url);
});

Then("I will make a request to {string}", function (url) {
  spec.get(url);
});

When("I receive a response within 0.5 seconds", async function () {
  await spec.toss();
});

Then("response should have a status {int}", async function (code) {
  await spec.response().should.have.status(code);
});

Then("the fields I have filled up in {string} should remain", async function (page) {
    if (page == "details") {
      assert.equal(
        await driver
          .findElement(By.className("display_name"))
          .getAttribute("value"),
        "Sally Abbot"
      );
      assert.equal(
        await driver
          .findElement(By.className("phone_number"))
          .getAttribute("value"),
        parentNumber
      );
      assert.equal(
        await driver.findElement(By.className("email")).getAttribute("value"),
        "sally@gmail.com"
      );
    } else if (page == "passport") {
      assert.equal(
        await driver
          .findElement(By.className("full_name"))
          .getAttribute("value"),
        "Sally Abbot"
      );
      assert.equal(
        await driver
          .findElement(By.className("passport_number"))
          .getAttribute("value"),
        "E1234567S"
      );
      assert.equal(
        await driver
          .findElement(By.className("nationality"))
          .getAttribute("value"),
        "American"
      );
    }
  }
);
