const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

Then("my information should be auto-filled", async function() {
    // FIXME: Update the expected names
    var fullName = await driver.findElement(By.className("full_name")).getText();
    assert.equal(fullName, "");

    var passportNumber = await driver.findElement(By.className("passport_number")).getText();
    assert.equal(passportNumber, "");

    // TODO: How to get passport expiry

    var nationality = await driver.findElement(By.className("nationality")).getText();
    assert.equal(nationality, "")

    // TODO: How to get gender and DOB?
});

When("I edit my information", async function() {
    await driver.findElement(By.className("full_name")).sendKeys("Da Yi Ma");
    await driver.sleep(500);
});

Then("my information should be overwritten", async function() {
    var fullName = await driver.findElement(By.className("full_name")).getText();
    assert.equal(fullName, "Da Yi Ma");
});

Then("I should be able to see it in the review page", async function() {
    // FIXME: make sure can continue to next page
    await driver.findElement(By.className("next")).click();
    await driver.sleep(500);

    assert.equal(driver.getCurrentUrl(), baseUrl + "review");

    var reviewFN = await driver.findElement(By.className("review_fn")).getText();
    assert.equal(reviewFN, "Da Yi Ma");
});