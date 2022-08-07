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
    await driver.findElement(By.className("dismiss")).click();
    await driver.sleep(500);
    await driver.findElement(By.xpath("//input[@placeholder='Enter Passport Expiry date']")).sendKeys(passportExpiry);
    await driver.findElement(By.className("dismiss")).click();
    await driver.sleep(500);
}

Given(/^I am signing up for (.*)$/, async function(type) {
    await driver.get(baseUrl);
    await driver.sleep(1000);
  
    await driver.findElement(By.className("bg-red-500")).click();
    await driver.sleep(1000);

    if (type == "myself") {
        await driver.findElement(By.className("next")).click();
        await driver.sleep(1000);
    } else if (type == "my family") {
        await driver.findElement(By.className("family-next")).click();
        await driver.sleep(1000);
    }
})

Given("I have filled in my details", async function () {
    await detailsPage("Sally Abbot", parentNumber, "sally@gmail.com");
  
    await driver.findElement(By.className("next")).click();
    await driver.sleep(1000);
});

// have added = go to next step
Given(/^I (.*) a child$/, async function(next) {
    await driver.findElement(By.className("add")).click();
    await driver.sleep(500);

    await driver
        .findElement(By.className("display_name"))
        .sendKeys("Salah Abbot");

    if (next == "have added"){
        await driver.findElement(By.className("next")).click();
        await driver.sleep(1000);
    
        assert.equal(await driver.getCurrentUrl(), baseUrl + "family");
    }
})

When("I fill in my passport details", async function () {
    await passportPage("Sally Abbot", "E1234567S", "American", "female", "14/07/1980", "01/09/2024");
});

When(/^I have uploaded the document (.*)$/, async function (filePath) {
    const uploadButton = await driver.findElement(By.className("btn_upload"));
    var path = process.cwd()+'/features/resources/' + filePath;
    uploadButton.sendKeys(path);
    await driver.sleep(5000);
});