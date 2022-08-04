const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert, Assertion } = require("chai");

Before(async function () {  
    console.log("Before");
});

After(async function () {
    console.log("After");
});


Given("I have registered till I am on {string}", async function() {
    await driver.get(baseUrl);
    await driver.sleep(500);
    const notACustomerYetButton = await driver.findElement(
      By.className("bg-red-500")
    );
    await notACustomerYetButton.click();
    await driver.sleep(500);
  
    await driver.findElement(By.className("family-next")).click();
    await driver.sleep(500);
  
    assert.equal(await driver.getCurrentUrl(), baseUrl + "details");
  
    await driver.findElement(By.className("display_name")).sendKeys("Sally Abbot");
    await driver.findElement(By.className("email")).sendKeys("sally@gmail.com");
    await driver.findElement(By.className("phone_number")).sendKeys(parentNumber);
    await driver.sleep(500);
  
    await driver.findElement(By.className("next")).click();
    await driver.sleep(500);
  
    assert.equal(await driver.getCurrentUrl(), baseUrl + "family");


});

When("I close and then reopen {string}", async function() {

    await driver.get("http:http://localhost:3000/family")


});

Then("I will find myself on {string}", async function() {
    assert.equal(await driver.getCurrentUrl(), baseUrl + page);
});


