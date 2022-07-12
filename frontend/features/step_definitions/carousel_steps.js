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
  await driver.get(base_url);
  await driver.sleep(1000);
  const notACustomerYetButton = await driver.findElement(By.className("bg-red-500"))
  notACustomerYetButton.click();
  await driver.sleep(1000);

  const familyButton = await driver.findElement(By.className("family-next"))
  familyButton.click();
  await driver.sleep(1000);

  const displayNameField = await driver.findElement(By.className("parent_display_name"))
  displayNameField.sendKeys("Sally Abbot");
  await driver.sleep(1000);

  const detailsNextButton = await driver.findElement(By.className("next"))
  detailsNextButton.click();
  await driver.sleep(1000)

})

Given("I have added a child", async function() {
  const addChildButton = await driver.findElement(By.className("add"))
  addChildButton.click();
  await driver.sleep(1000);

  const childName = await driver.findElement(By.className("child_display_name"));
  childName.sendKeys("Salah Abbot");

  const nextButton = await driver.findElement(By.className("next"));
  nextButton.click();
  await driver.sleep(1000);

  assert.equal(await driver.getCurrentUrl(), base_url + "family");  
})


When("I navigate to the passport page", async function() {
    const nextButton = await driver.findElement(By.className("next"));
    nextButton.click();
  
    await driver.sleep(1000);
  
    var actual_url = await driver.getCurrentUrl();
    assert.equal(actual_url, base_url + "passport");
})

Then("I should be able to see my child's and my name in the carousel", async function() {
    var parentNameButton = await driver.findElement(By.id("user_0"));
    var parentName = await parentNameButton.findElement(By.css("p")).getText();
    assert.equal(parentName, "Sally Abbot");

    var childNameButton = await driver.findElement(By.id("user_1"));
    var childName = await childNameButton.findElement(By.css("p")).getText();
    assert.equal(childName, "Salah Abbot");
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
    const childButton = await driver.findElement(By.id("user_1"));
    await childButton.click();
})

When("I navigate back to my tab", async function() {
  const parentButton = await driver.findElement(By.id("user_0"));
  await parentButton.click();
})

Then("I should be able to view my own passport details", async function() {
    var parentNameValue = await driver.findElement(By.className("full_name")).getAttribute("value");
    assert.equal(parentNameValue, "Sally Abbot");

    var parentPassportValue = await driver.findElement(By.className("passport_number")).getAttribute("value");
    assert.equal(parentPassportValue, "E1234567S");

    var parentNationalityValue = await driver.findElement(By.className("nationality")).getAttribute("value")
    assert.equal(parentNationalityValue, "American");
})

Then("my child icon should be selected", async function() {
    const childIcon = await driver.findElement(By.id("user_1"));
    await childIcon.click()
    await driver.sleep(1000);
    const childIcon2 = await driver.findElement(By.id("user_1"));
    assert.equal(await childIcon2.getAttribute("class"), "grid rounded outline-dashed grid-cols-1 justify-items-center h-24 w-24 p-2");


})