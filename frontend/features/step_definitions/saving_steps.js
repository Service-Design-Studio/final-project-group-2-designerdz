const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");

When(/^I come back to the (.*) of the form with a different browser$/, async function(page) {
    await driver.executeScript(function () {
        localStorage.clear();
    });
    await driver.sleep(500);

    await driver.get(baseUrl + page);
    await driver.sleep(500);
})

When("I fill up my phone number", async function(){
    await driver.findElement(By.className("mobile_no")).sendKeys(parentNumber);
    await driver.sleep(1000);

    await driver.findElement(By.className("continue_btn")).click();
    await driver.sleep(1000);
})
