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

Given("I have filled in my details", function() {
  await driver.get(base_url + "signup");
  await driver.sleep(1000);
  
  const detailsButton = await driver.findElement(By.className("next"));
  detailsButton.click();

  await driver.sleep(1000);

  var actual_url = await driver.getCurrentUrl();
  assert.equal(actual_url, base_url + "details");

  const parentName = await driver.findElement(
    By.className("parent_display_name")
  );
  parentName.sendKeys("Sally Abbot");
  const parentEmail = await driver.findElement(By.className("parent_email"));
  parentEmail.sendKeys("sally_abbot@gmail.com");
  const parentPhone = await driver.findElement(By.className("parent_number"));
  parentPhone.sendKeys("96183292");

  const nextButton = await driver.findElement(By.className("next"));

  // FIXME: Clearing of local storage
  
  axios.delete(base_url.concat("api/v1/profile/delete")).then(function(res){}).catch(function (error){})
  
  // nextButton.click();
  // await driver.sleep(1000);

  // var actual_url = await driver.getCurrentUrl();
  // assert.equal(actual_url, base_url + "family");
})

Given("I have added a child", function () { 
  driver.get(base_url + "child");
  const childName = driver.findElement(By.id("child_name"));
  childName.sendKeys("Sarah Abbot");
  const parentEmail = driver.findElement(By.id("child_email"));
  parentEmail.sendKeys("sally_abbot@gmail.com");
  const parentPhone = driver.findElement(By.id("child_number"));
  parentPhone.sendKeys("96183292");
});

When("I navigate to the next page", function () { 
  const next_button = driver.findElement(By.className("next"));
  next_button.click();
  driver.sleep(1000);
});

Then("I should be able to see my child's and my name in the carousel", function () { 
  driver.get(base_url + "passport"); //unsure how to check if it's in carousel
  const parentName = driver.findElement(By.className("parent_name"));
  assert.equal(parentName.getAttribute("value"), "Sally Abbot");
  const childName = driver.findElement(By.className("child_name"));
  assert.equal(childName.getAttribute("value"), "Sarah Abbot");
});

Then("I should be able to fill in my passport details", function () { 
  //CODE
});

When("I click on my child name", function () { 
  const ____ = driver.findElement(By.className("child_name"));
  child_name_button.click();
  driver.sleep(1000);
});

Then("I should be able to fill in my child details", function () { 
  //CODE
});

When("I fill in my passport details", function () { 
  driver.get(base_url + "passport");
  const parentName = driver.findElement(By.id("parent_display_name"));
  parentName.sendKeys("Sarah Abbot");
  const parentPassportNumber = driver.findElement(By.id("parent_passport_number"));
  parentPassportNumber.sendKeys("E1234567S");
  const nationality = driver.findElement(By.id("nationality"));
  nationality.sendKeys("American");
});

When("I click on my name", function () { 
  const ____ = driver.findElement(By.className("parent_name"));
  child_name_button.click();
  driver.sleep(1000);
});

Then("I should be able to view my own passport details", function () { 
  const parentName = driver.findElement(By.className("parent_name"));
  assert.equal(childNumber.getAttribute("value"), "Sally Abbot");
  const parentPassportNumber = driver.findElement(By.className("parent_passport_number"));
  assert.equal(parentPassportNumber.getAttribute("value"), "E1234567S");
  const parentNationality = driver.findElement(By.className("parent_passport_number"));
  assert.equal(parentNationality.getAttribute("value"), "American");
});