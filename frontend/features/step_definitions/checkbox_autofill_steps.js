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

After(function () {
  driver.quit();
});

Given("that I have saved my details", function() {
  driver.get(base_url + "details");
  const parentName = driver.findElement(By.id("parent_display_name"));
  parentName.sendKeys("Sarah Abbot1");
  const parentEmail = driver.findElement(By.id("parent_email"));
  parentEmail.sendKeys("sarah_abbot@gmail.com");
  const parentPhone = driver.findElement(By.id("parent_number"));
  parentPhone.sendKeys("96183292");
})

Given("I navigate to child details page", function() {
  const nextButton = driver.findElement(By.id("next"));
  nextButton.click();
  assert.equal(driver.getCurrentUrl(), base_url + "child");
})

When("I check the autofill checkbox", function() {
  const autofillCheckbox = driver.findElement(By.id("autofill"));
  autofillCheckbox.click();
})
