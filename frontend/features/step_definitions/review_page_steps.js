const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert, Assertion } = require("chai");

Given("that I have filled all me and my child's details", async function() {
  await driver.get(baseUrl);
  await driver.sleep(500);
  const notACustomerYetButton = await driver.findElement(
    By.className("bg-red-500")
  );
  await notACustomerYetButton.click();
  await driver.sleep(500);

  await driver.findElement(By.className("family-next")).click();
  await driver.sleep(500);

  assert.equal(await driver.getCurrentUrl(), baseUrl + "details");

  await driver.findElement(By.className("display_name")).sendKeys("Sally Abbot");
  await driver.findElement(By.className("email")).sendKeys("sally@gmail.com");
  await driver.findElement(By.className("phone_number")).sendKeys(parentNumber);
  await driver.sleep(500);

  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  assert.equal(await driver.getCurrentUrl(), baseUrl + "family");

  await driver.findElement(By.className("add")).click();
  await driver.sleep(500);

  var actualUrl = await driver.getCurrentUrl();
  assert.equal(actualUrl, baseUrl + "child");

  await driver.findElement(By.className("display_name")).sendKeys("Salah Abbot");

  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  assert.equal(await driver.getCurrentUrl(), baseUrl + "family");

  // Move to passport page
  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  var actualUrl = await driver.getCurrentUrl();
  assert.equal(actualUrl, baseUrl + "passport");

  await driver.findElement(By.className("full_name")).sendKeys("Sally Abbot");
  await driver.findElement(By.className("passport_number")).sendKeys("E32521921");
  await driver.findElement(By.className("nationality")).sendKeys("American");
  await driver.findElement(By.className("female")).click();
  await driver.findElement(By.xpath("//input[@placeholder='Select Date of Birth']")).sendKeys("14/07/1980");
  await driver.findElement(By.xpath("//input[@placeholder='Select Date']")).sendKeys("09/2024");
  await driver.sleep(500);

  await driver.findElement(By.id("user_1")).click();
  await driver.sleep(500);

  await driver.findElement(By.className("full_name")).sendKeys("Sarah Abbot");
  await driver.findElement(By.className("passport_number")).sendKeys("E34152315");
  await driver.findElement(By.className("nationality")).sendKeys("American");
  await driver.findElement(By.className("female")).click();
  await driver.findElement(By.xpath("//input[@placeholder='Select Date of Birth']")).sendKeys("14/07/2005");
  await driver.findElement(By.xpath("//input[@placeholder='Select Date']")).sendKeys("09/2030");

  await driver.sleep(500)

  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  await driver.get(baseUrl + "review");
  await driver.sleep(500);

  assert.equal(await driver.getCurrentUrl(), baseUrl + "review");
});

Given("that I am on the review page", async function() {
  assert.equal(await driver.getCurrentUrl(), baseUrl + "review");
  await driver.sleep(1000);
});

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
  assert.equal(parentPNValue, "E32521921");

  var parentNationalityValue = await driver.findElement(By.className("review_nationality")).getText();
  assert.equal(parentNationalityValue, "American");

  var parentGenderValue = await driver.findElement(By.className("review_gender")).getText();
  assert.equal(parentGenderValue, "FEMALE");

  var parentPassportExpiry = await driver.findElement(By.className("review_pe")).getText();
  assert.equal(parentPassportExpiry, "Sep 2024");

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
  assert.equal(childPassportExpiry, "Sep 2030");

  var childDOB = await driver.findElement(By.className("review_dob")).getText();
  assert.equal(childDOB, "Jul 14, 2005");
});

When("I click on the {string} button", async function(button) {
  await driver.findElement(By.className(button)).click();
  await driver.sleep(1000);  
});

Then("I should be on {string}", async function(page) {
  assert.equal(await driver.getCurrentUrl(), baseUrl + page);
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
  assert.equal(childPassportExpiry, "Sep 2030");

  var childDOB = await driver.findElement(By.className("review_dob")).getText();
  assert.equal(childDOB, "Jul 14, 2005");
});

