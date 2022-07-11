const {
  Given,
  When,
  Then,
  Before,
  AfterAll,
  After,
} = require("@cucumber/cucumber");
const {
  Builder,
  By,
  Capabilities,
  Key,
  Button,
  ChromiumWebDriver,
} = require("selenium-webdriver");
const { initDriver } = require("../support/driverUtil");
const { expect, assert } = require("chai");
const { setDefaultTimeout } = require("@cucumber/cucumber");
const pactum = require("pactum");

let spec = pactum.spec();

base_url = "https://react-frontend-353408.as.r.appspot.com/";

setDefaultTimeout(60 * 1000);

let driver;

Before(function () {
  driver = initDriver();
  spec = pactum.spec();
});

After(async function () {
  await driver.quit();
});


Given("I am on family page", async function () {
  await driver.get(base_url + "family");
  await driver.sleep(1000);
});

When("I click on the add children button", async function () {
  //CODE
})


Then("A child should be added", async function (next) { 
  //CODE
});

Given("I am on family page", async function () {
  await driver.get(base_url + "family");
  await driver.sleep(1000);
});

And("a child has been added", async function () {
  //CODE
})

When("I click on the edit button", async function () {
  //CODE
})


Then("I should be navigated to the details page for that child", async function (next) { 
  //CODE
});

When("I click on the remove button", async function () {
  //CODE
})


Then("the child should be removed", async function (next) { 
  //CODE
});

Given("I am on child page", async function () {
  await driver.get(base_url + "child");
  await driver.sleep(1000);
});


When("I check the autofill checkbox", async function () {
  //CODE
})


Then("the details should be autofilled", async function (next) { 
  //CODE
});

Given("I am on child page", async function () {
  await driver.get(base_url + "child");
  await driver.sleep(1000);
});

And("the auotfill checkbox is check", async function () {
  //CODE
});

When("I click the autofill checkbox", async function () {
  //CODE
})


Then("the details should be empty", async function (next) { 
  //CODE
});

Given("I am on passport page", async function () {
  await driver.get(base_url + "child");
  await driver.sleep(1000);
});

And("I have at least one child", async function () {
  //CODE
});

When("I click on another child account in the Carousel", async function () {
  const registration_button = await driver.findElement(By.className("next"));
  await registration_button.click();
  await driver.sleep(1000);
})


Then("I should be navigated to the details page for that child", async function (next) { 
  //CODE
});




