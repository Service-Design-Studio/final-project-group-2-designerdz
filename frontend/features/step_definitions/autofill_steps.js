const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

Then("my information should be auto-filled", async function() {
    // FIXME: Update the expected names
    var fullName = await driver.findElement(By.className("full_name")).getText();
    assert.equal(fullName, "");

    var passportNumber = await driver.findElement(By.className("passport_number")).getText();
    assert.equal(passportNumber, "");

    let passportExpiry = await driver.findElement(By.xpath("//input[@placeholder='Select Date']").getText();
    assert.equal(passport_expiry_input, "");

    // TODO: How to get gender?

    var nationality = await driver.findElement(By.className("nationality")).getText();
    assert.equal(nationality, "")

    await driver.findElement(By.className("male")).click();

    let dob_input = await driver.findElement(By.xpath("//input[@placeholder='Select Date of Birth']"))
    await dob_input.sendKeys("14/07/1980")
    await driver.sleep(1000)

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