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

// TODO: Fix this wonky step that works half the time
When("I go from the family page to the review page", async function () {
    await driver.findElement(By.className("next")).click();
    await driver.sleep(500);
    
    var actualUrl = await driver.getCurrentUrl();
    assert.equal(actualUrl, baseUrl + "family");

    // Move to passport page
    await driver.findElement(By.className("next")).click();
    await driver.sleep(500);

    var actualUrl = await driver.getCurrentUrl();
    assert.equal(actualUrl, baseUrl + "passport");

    await passportPage("Sally Abbot", "E1234567S", "American", "female", "14/07/1980", "01/09/2024");

    await driver.findElement(By.id("user_1")).click();
    await driver.sleep(1000);

    await passportPage("Sarah Abbot", "E34152315", "American", "female", "14/07/2005", "01/09/2030");

    // Move to review page
    await driver.findElement(By.className("next")).click();
    await driver.sleep(2000);

    var actualUrl = await driver.getCurrentUrl();
    assert.equal(actualUrl, baseUrl + "review");
});

Given("that I have filled up {string} and have navigated to {string}", async function (page1, page2) {
    await driver.get(baseUrl + "signup");
    await driver.sleep(500);

    // Navigate into single user details
    await driver.findElement(By.className("next")).click();
    await driver.sleep(500);
    assert.equal(await driver.getCurrentUrl(), baseUrl + "details");

    await detailsPage("Yi Ma", parentNumber, "dayima@gmail.com");  

    // Navigate to passport page
    await driver.findElement(By.className("next")).click();
    await driver.sleep(500);

    if (page2 == "review") {
        await passportPage("Da Yi Ma", "E32136512", "China", "male", "14/07/1980", "09/2022");

        // Move to review page
        await driver.findElement(By.className("next")).click();
        await driver.sleep(500);
    }

    assert.equal(await driver.getCurrentUrl(), baseUrl + page2);
});