// const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
// const {
//   Builder,
//   By,
//   Capabilities,
//   Key,
//   Button,
//   ChromiumWebDriver,
// } = require("selenium-webdriver");
// const { initDriver } = require("../support/driverUtil");
// const { expect, assert } = require("chai");
// const { setDefaultTimeout } = require("@cucumber/cucumber");
// const pactum = require("pactum");

// let spec = pactum.spec();

// // let base_url = "https://react-frontend-353408.as.r.appspot.com/";
// let base_url = "http://localhost:3001/";

// setDefaultTimeout(60 * 1000);

// let driver;

// Before(function () {
//   driver = initDriver();
//   spec = pactum.spec();
// });

// After(async function () {
//   await driver.quit();
// });

// Given("I have filled up the necessary information before", async function () {
//   await driver.get(base_url);
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

//   assert.equal(await driver.getCurrentUrl(), base_url + "details");

//   const nextButton = await driver.findElement(By.className("next"));
//   await nextButton.click();
//   await driver.sleep(1000);

//   assert.equal(await driver.getCurrentUrl(), base_url + "family");
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
