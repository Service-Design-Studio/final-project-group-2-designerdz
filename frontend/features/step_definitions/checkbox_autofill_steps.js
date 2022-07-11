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

let base_url = "http://localhost:3001/";

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
  const parentName = driver.findElement(By.className("parent_display_name"));
  parentName.sendKeys("Sally Abbot");
  const parentEmail = driver.findElement(By.className("parent_email"));
  parentEmail.sendKeys("sally_abbot@gmail.com");
  const parentPhone = driver.findElement(By.className("parent_number"));
  parentPhone.sendKeys("96183292");

  const nextButton = driver.findElement(By.className("next"));
  nextButton.click();
})

Given("I add a new child", function() {
  const addChildButton = driver.findElement(By.className(""));
  addChildButton.click();
})

When("I check the autofill checkbox", function() {
  const autofillCheckbox = driver.findElement(By.className("autofill"));
  if(!autofillCheckbox.isSelected()) {
    autofillCheckbox.click();
  }
  assert.equal(autofillCheckbox.isSelected(), true);
})

Then("I should see my child details autofilled", function(){
  const childNumber = driver.findElement(By.className("child_number"));
  assert.equal(childNumber.getAttribute("value"), "96183292");
  const childEmail = driver.findElement(By.className("child_email"));
  assert.equal(childEmail.getAttribute("value"), "sally_abbot@gmail.com");  
})

When("I uncheck the autofill checkbox", function() {	
  const autofillCheckbox = driver.findElement(By.className("autofill"));

  if(autofillCheckbox.isSelected()) {
    autofillCheckbox.click();
  }
  assert.equal(autofillCheckbox.isSelected(), false);
})

Then("I should see my child details as empty", function(){
  driver.get(base_url + "family");
  const childNumber = driver.findElement(By.className("child_number"));
  assert(childNumber.isEmpty());
  const childEmail = driver.findElement(By.className("child_email"));
  assert(childEmail.isEmpty());
})
