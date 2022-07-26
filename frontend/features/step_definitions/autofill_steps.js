const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

// Given("I am on passport page", async function() {
//     await driver.get(baseUrl);
//     await driver.sleep(500);
//     const notACustomerYetButton = await driver.findElement(
//         By.className("bg-red-500")
//     );
//     notACustomerYetButton.click();
//     await driver.sleep(500);

//     const familyButton = await driver.findElement(By.className("family-next"));
//     familyButton.click();
//     await driver.sleep(500);

//     await driver
//         .findElement(By.className("display_name"))
//         .sendKeys("John Doe Doe");
//     await driver
//         .findElement(By.className("phone_number"))
//         .sendKeys(Math.floor(Math.random() * 10000));
//     await driver.sleep(500);

//     await driver.findElement(By.className("next")).click();
//     await driver.sleep(500);
// });

// Given("I have uploaded a document", async function() {
    
// });

// Then("my information should be auto-filled", async function() {
    
// });

// When("I edit my information", async function() {

// });

// Then("my information should be overwritten", async function() {

// })