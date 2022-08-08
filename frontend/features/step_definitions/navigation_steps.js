const { Given, When, Then } = require("@cucumber/cucumber");
const { By, Button } = require("selenium-webdriver");
const { expect, assert } = require("chai");

async function detailsPage(displayName, phoneNumber = "", email = "") {
  await driver.findElement(By.className("display_name")).sendKeys(displayName);
  await driver.findElement(By.className("phone_number")).sendKeys(phoneNumber);
  await driver.findElement(By.className("email")).sendKeys(email);
  await driver.sleep(500);
}

async function passportPage(fullName, passportNumber, nationality, gender, dob, passportExpiry){
  await driver.findElement(By.className("full_name")).sendKeys(fullName);
  await driver.findElement(By.className("passport_number")).sendKeys(passportNumber);
  await driver.findElement(By.className("nationality")).sendKeys(nationality);
  await driver.findElement(By.className(gender)).click();
  await driver.findElement(By.xpath("//input[@placeholder='Select Date of Birth']")).sendKeys(dob);
  await driver.sleep(1000);
  await driver.findElement(By.className("dismiss")).click();
  await driver.findElement(By.className("dismiss")).click();
  await driver.sleep(1000);
  await driver.findElement(By.xpath("//input[@placeholder='Enter Passport Expiry date']")).sendKeys(passportExpiry);
  await driver.sleep(1000);
  await driver.findElement(By.className("dismiss")).click();
  await driver.findElement(By.className("dismiss")).click();
  await driver.sleep(1000);
  await driver.findElement(By.className("full_name")).click();
  await driver.sleep(1000);
}

Then(/^I should be on the (.*) page$/, async function(page) {
  if (page == "landing") {
    page = "";
  }

  var actualUrl = await driver.getCurrentUrl();
  actualUrl = actualUrl.split("/")[3];
  expect(actualUrl).to.equal(page);
})

Given(/^I have filled up the (.*) page$/, async function(page) {
  if (page == "details") {
    await detailsPage("Sally Abbot", parentNumber, "sally@gmail.com");
  } else if (page == "passport") {
    await passportPage("Sally Abbot", "E1234567S", "American", "female", "14/07/1980", "01/09/2024");
  }

  // Do nothing for review page
})