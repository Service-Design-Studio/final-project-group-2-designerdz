const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");

Given("I am on the passport page", async function() {
    
})

When("I upload a bad {string}", async function(image) {
})

Then("I should see {error}", async function(error) {
    const errorName = await driver.findElement(By.id("upload-error")).getText();
    assert.equal(errorName, error);
})