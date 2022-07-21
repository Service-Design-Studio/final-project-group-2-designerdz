// const { Given, When, Then } = require("@cucumber/cucumber");
// const { By } = require("selenium-webdriver");
// const { expect, assert } = require("chai");

// Given("I have filled up the necessary information before", async function () {
//   await driver.get(baseUrl);
//   await driver.sleep(1000);
//   const notACustomerYetButton = await driver.findElement(
//     By.className("bg-red-500")
//   );
//   await notACustomerYetButton.click();
//   await driver.sleep(1000);

//   const familyButton = await driver.findElement(By.className("family-next"));
//   await familyButton.click();
//   await driver.sleep(1000);

//   const displayNameField = await driver.findElement(
//     By.className("parent_display_name")
//   );
//   displayNameField.sendKeys("Sally Abbotaa");
//   await driver.sleep(1000);

//   const parentEmail = await driver.findElement(By.className("parent_email"));
//   parentEmail.sendKeys("sally@gmail.comabc");
//   await driver.sleep(1000);

//   const parentPhone = await driver.findElement(By.className("parent_number"));
//   parentPhone.sendKeys("999999999");
//   await driver.sleep(1000);

//   assert.equal(await driver.getCurrentUrl(), baseUrl + "details");

//   const nextButton = await driver.findElement(By.className("next"));
//   await nextButton.click();
//   await driver.sleep(1000);

//   assert.equal(await driver.getCurrentUrl(), baseUrl + "family");
// });

// //Scenario: Summary of information provided thus far on review page
// When("I am on the review page", async function () {
//   //check if on the review page using assert?
// });

// Then(
//   "I should see all {string} of {string} I have entered",
//   async function (enteredInfo, field) {
//     //
//   }
// );

// //Scenario: Redirect to respective pages on click of edit button on review page
// When(
//   "I am on {string} page and I want to edit my {details}",
//   async function () {
//     //
//   }
// );

// When("I click {string}", async function (buttonName) {
//   //
// });

// Then("I should be on {string} page", async function (page) {
//   //check if on the page
// });

// //Scenario: Updating of correct information at relevant pages after clicking edit button
// When("I am on {string}", async function (page) {
//   //check if at correct page
// });

// When("I have updated my {string} on the relevant pages", async function (info) {
//   //update new info
// });

// When("I click on the {string} button", async function (buttonName) {
//   //click on the button
// });

// When(
//   "I should see my information updated with {string} as well",
//   async function (info) {
//     //check review page if got the same info not
//   }
// );
