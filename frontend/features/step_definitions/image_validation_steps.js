const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");

Then("I should observe {string}", async function (error) {
    const errorName = await driver.findElement(By.className("text-red-500")).getText();
    assert.equal(errorName, error);
});