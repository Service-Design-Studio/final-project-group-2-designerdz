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

Given("I have added a child", function () { 
  //CODE
});

When("I navigate to the next page", function () { 
  const next_button = driver.findElement(By.className("next"));
  next_button.click();
  driver.sleep(1000);
});

Then("I should be able to see my child's and my name in the carousel", function () { 
  //CODE
});

Then("I should be able to fill in my passport details", function () { 
  //CODE
});

When("I click on my child name", function () { 
  const child_name_button = driver.findElement(By.className(" ")
  child_name_button.click();
  driver.sleep(1000);
});

Then("I should be able to fill in my child details", function () { 
  //CODE
});

When("I fill in my passport details", function () { 
  driver.get(base_url + "passport");
  const parentName = driver.findElement(By.id("parent_display_name"));
  parentName.sendKeys("Sarah Abbot1");
  const passportNumber = driver.findElement(By.id("parent_passport_number"));
  passportNumber.sendKeys("E1234567S");
  const nationality = driver.findElement(By.id("nationality"));
  nationality.sendKeys("American");
});

When("I click on my name", function () { 
  //CODE
});

Then("I should be able to view my own passport details", function () { 
  //CODE
});