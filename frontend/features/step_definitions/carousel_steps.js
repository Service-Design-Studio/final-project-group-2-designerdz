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

Given("I have filled in my details", async function() {
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

Given("I have added a child", async function() {
    await driver.get(base_url + "family");
    await driver.sleep(1000);
  
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

