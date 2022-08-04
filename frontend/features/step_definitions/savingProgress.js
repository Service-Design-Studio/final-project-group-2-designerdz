const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert, Assertion } = require("chai");



Given("I have registered till I am on the Family page", async function() {
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
    await driver.sleep(1000);
  
    assert.equal(await driver.getCurrentUrl(), baseUrl + "family");
    

});

When("I close my browser and then reopen it to Family page", async function() {
    await driver.executeScript(function () {
        localStorage.clear();
    });
    
    await driver.get("http://localhost:3000/family")





});

Then("I will find myself on Landing page", async function() {
    assert.equal(await driver.getCurrentUrl(), baseUrl + "landing");
});


