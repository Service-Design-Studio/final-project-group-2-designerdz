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
const axios =  require("axios");

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

Given("I have filled in my details", async function() {
    await driver.get(base_url + "signup");
    await driver.sleep(1000);
    
    const detailsButton = await driver.findElement(By.className("family-next"));
    detailsButton.click();

    await driver.sleep(1000);

    var actual_url = await driver.getCurrentUrl();
    assert.equal(actual_url, base_url + "details");

    // FIXME: Clearing of local storage
    axios.delete(base_url.concat("api/v1/profile/delete")).then(function(res){}).catch(function (error){})

    const parentName = await driver.findElement(By.className("parent_display_name"));
    parentName.sendKeys("Sally Abbot");
    const parentEmail = await driver.findElement(By.className("parent_email"));
    parentEmail.sendKeys("sally_abbot@gmail.com");
    const parentPhone = await driver.findElement(By.className("parent_number"));
    parentPhone.sendKeys("96183292");

    const nextButton = await driver.findElement(By.className("next"));
    
    nextButton.click();
    await driver.sleep(1000);

    var actual_url = await driver.getCurrentUrl();
    assert.equal(actual_url, base_url + "family");
})

Given("I have added a child", async function() {  
    const addChildButton = await driver.findElement(By.className("add"));
    addChildButton.click();
    await driver.sleep(1000);
  
    const childName = await driver.findElement(By.className("child_display_name"));
    childName.sendKeys("Sarah Abbot");
  
    const autofillCheckbox = await driver.findElement(By.className("autofill"));
  
    if(!autofillCheckbox.isSelected()) {
      autofillCheckbox.click();
    }
  
    var checked = await autofillCheckbox.isSelected();
    assert.equal(checked, true);
  
    const nextButton = await driver.findElement(By.className("next"));
    nextButton.click();
  
    await driver.sleep(1000);
  
    var actual_url = await driver.getCurrentUrl();
    assert.equal(actual_url, base_url + "family");
})

When("I navigate to the passport page", async function() {
    const nextButton = await driver.findElement(By.className("next"));
    nextButton.click();
  
    await driver.sleep(1000);
  
    var actual_url = await driver.getCurrentUrl();
    assert.equal(actual_url, base_url + "passport");
})

Then("I should be able to see my child's and my name in the carousel", async function() {
    var parentNameValue = await driver.findElement(By.id("user0"));
    assert.equal(parentNameValue, "Sally Abbot");
    var childNameValue = await driver.findElement(By.id("user1"));
    assert.equal(childNameValue, "Sarah Abbot");
})


When("I fill in my passport details", async function() {
    const parentName = await driver.findElement(By.className("full_name"));
    parentName.sendKeys("Sally Abbot");
    const parentPassport = await driver.findElement(By.className("passport_number"));
    parentPassport.sendKeys("E1234567S");
    const parentNationality = await driver.findElement(By.className("nationality"));
    parentNationality.sendKeys("American");
})

When("I navigate to my child tab", async function() {
    const childButton = await driver.findElement(By.id("user1"));
    childButton.click();
})

When("I navigate back to my tab", async function() {
  const parentButton = await driver.findElement(By.id("user0"));
  parentButton.click();
})

Then("I should be able to view my own passport details", async function() {
    var parentNameValue = await driver.findElement(By.className("full_name"));
    assert.equal(parentNameValue, "Sally Abbot");
    var parentPassportValue = await childEmail.getAttribute("passport_number");
    assert.equal(parentPassportValue, "E1234567S");
    var parentNationalityValue = await childEmail.getAttribute("nationality");
    assert.equal(parentNationalityValue, "American");
})

Then("my child icon should be selected", async function() {
    const childIcon = await driver.findElement(By.id("user1"));
    var checked = await childIcon.isSelected();
    assert.equal(checked, true);
})