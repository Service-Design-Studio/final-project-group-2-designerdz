const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert, Assertion } = require("chai");

Then("I should be able to see that my information is correct", async function() {
    var parentDisplayName = await driver.findElement(By.className("display_name")).getText();
    assert.equal(parentDisplayName, "Sally Abbot");
  
    var parentNumberValue = await driver
      .findElement(By.className("phone_number"))
      .getText();
    assert.equal(parentNumberValue, parentNumber);
  
    var parentEmailValue = await driver
      .findElement(By.className("email"))
      .getText();
    assert.equal(parentEmailValue, "sally@gmail.com");
  
    var parentFNValue = await driver.findElement(By.className("review_fn")).getText();
    assert.equal(parentFNValue, "Sally Abbot");
  
    var parentPNValue = await driver.findElement(By.className("review_pn")).getText();
    assert.equal(parentPNValue, "E1234567S");
  
    var parentNationalityValue = await driver.findElement(By.className("review_nationality")).getText();
    assert.equal(parentNationalityValue, "American");
  
    var parentGenderValue = await driver.findElement(By.className("review_gender")).getText();
    assert.equal(parentGenderValue, "FEMALE");
  
    var parentPassportExpiry = await driver.findElement(By.className("review_pe")).getText();
    assert.equal(parentPassportExpiry, "Sep 1, 2024");
  
    var parentDOB = await driver.findElement(By.className("review_dob")).getText();
    assert.equal(parentDOB, "Jul 14, 1980");
  });
  
  Then("I should be able to see that my child information is correct", async function() {
    var childDisplayNameValue = await driver.findElement(By.className("display_name")).getText();
    assert.equal(childDisplayNameValue, "Salah Abbot");
  
    var childNumberValue = await driver
      .findElement(By.className("phone_number"))
      .getText();
    assert.equal(childNumberValue, parentNumber);
  
    var childEmailValue = await driver
      .findElement(By.className("email"))
      .getText();
    assert.equal(childEmailValue, "sally@gmail.com");
  
    var childFNValue = await driver.findElement(By.className("review_fn")).getText();
    assert.equal(childFNValue, "Sarah Abbot");
  
    var childPNValue = await driver.findElement(By.className("review_pn")).getText();
    assert.equal(childPNValue, "E34152315");
  
    var childNationalityValue = await driver.findElement(By.className("review_nationality")).getText();
    assert.equal(childNationalityValue, "American");
    
    var childGenderValue = await driver.findElement(By.className("review_gender")).getText();
    assert.equal(childGenderValue, "FEMALE");
  
    var childPassportExpiry = await driver.findElement(By.className("review_pe")).getText();
    assert.equal(childPassportExpiry, "Sep 1, 2030");
  
    var childDOB = await driver.findElement(By.className("review_dob")).getText();
    assert.equal(childDOB, "Jul 14, 2005");
  });
  
  When("I see that my child information is misfilled", async function() {
    var childDisplayNameValue = await driver.findElement(By.className("display_name")).getText();
    assert.equal(childDisplayNameValue, "Salah Abbot");
  });
  
  When("I correct my child information", async function() {
    await driver.findElement(By.className("basic_edit")).click();
    await driver.sleep(500);  
  
    await driver.findElement(By.className("display_name")).clear();
    await driver.findElement(By.className("display_name")).sendKeys("Sarah Abbot");
    await driver.findElement(By.className("next")).click();
  
    await driver.sleep(500);
  
    assert.equal(await driver.getCurrentUrl(), baseUrl + "review");
  });
  
  Then("I should be able to see that my child information has been corrected", async function() {
    await driver.sleep(500);
    await driver.findElement(By.id("user_1")).click();
    await driver.sleep(500);
  
    var childDisplayNameValue = await driver.findElement(By.className("display_name")).getText();
    assert.equal(childDisplayNameValue, "Sarah Abbot");
  
    var childNumberValue = await driver
      .findElement(By.className("phone_number"))
      .getText();
    assert.equal(childNumberValue, parentNumber);
  
    var childEmailValue = await driver
      .findElement(By.className("email"))
      .getText();
    assert.equal(childEmailValue, "sally@gmail.com");
  
    var childFNValue = await driver.findElement(By.className("review_fn")).getText();
    assert.equal(childFNValue, "Sarah Abbot");
  
    var childPNValue = await driver.findElement(By.className("review_pn")).getText();
    assert.equal(childPNValue, "E34152315");
  
    var childNationalityValue = await driver.findElement(By.className("review_nationality")).getText();
    assert.equal(childNationalityValue, "American");
    
    var childGenderValue = await driver.findElement(By.className("review_gender")).getText();
    assert.equal(childGenderValue, "FEMALE");
  
    var childPassportExpiry = await driver.findElement(By.className("review_pe")).getText();
    assert.equal(childPassportExpiry, "Sep 1, 2030");
  
    var childDOB = await driver.findElement(By.className("review_dob")).getText();
    assert.equal(childDOB, "Jul 14, 2005");
  });