const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

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

When("I go from the family page to the review page", async function () {
    var actualUrl = await driver.getCurrentUrl();
    assert.equal(actualUrl, baseUrl + "family");

    // Move to passport page
    await driver.findElement(By.className("next")).click();
    await driver.sleep(500);

    var actualUrl = await driver.getCurrentUrl();
    assert.equal(actualUrl, baseUrl + "passport");

    await driver.sleep(2000);
    
    await passportPage("Sally Abbot", "E1234567S", "American", "female", "14/07/1980", "01/09/2024");


    await passportPage("Sally Abbot", "E1234567S", "American", "female", "14/07/1980", "05/09/2024");


    await driver.findElement(By.id("user_1")).click();
    await driver.sleep(2000);

    await passportPage("Sarah Abbot", "E34152315", "American", "female", "14/07/2005", "05/09/2030");

    // Move to review page
    await driver.findElement(By.className("next")).click();
    await driver.sleep(5000);

    var actualUrl = await driver.getCurrentUrl();
    assert.equal(actualUrl, baseUrl + "review");
});