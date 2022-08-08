const { Given, When, Then } = require("@cucumber/cucumber");
const { By, Button } = require("selenium-webdriver");
const { expect, assert } = require("chai");

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

When("I fill in my passport details", async function () {
    await passportPage("Sally Abbot", "E1234567S", "American", "female", "14/07/1980", "01/09/2024");
});

Then(
    "I should be able to see my child's and my name in the carousel",
        async function () {
            var parentNameButton = await driver.findElement(By.id("user_0"));
            var parentName = await parentNameButton
            .findElement(By.className("user_0"))
            .getText();
            assert.equal(parentName, "Sally Abbot");

            var childNameButton = await driver.findElement(By.id("user_1"));
            var childName = await childNameButton
            .findElement(By.className("user_1"))
            .getText();
            assert.equal(childName, "Salah Abbot");
        }
);

Then("I should be able to view my own passport details", async function () {
    var parentPassportValue = await driver
        .findElement(By.className("passport_number"))
        .getAttribute("value");
    assert.equal(parentPassportValue, "E1234567S");

    var parentNameValue = await driver
        .findElement(By.className("full_name"))
        .getAttribute("value");
    assert.equal(parentNameValue, "Sally Abbot");

    var parentNationalityValue = await driver
        .findElement(By.className("nationality"))
        .getAttribute("value");
    assert.equal(parentNationalityValue, "American");
});


Then(/^(.*) icon should be selected$/, async function(type) {
    var icon;
    if (type == "my child") {
        icon = await driver.findElement(By.id("user_1"));
    } else if (type == "my") {
        icon = await driver.findElement(By.id("user_0"));
    }

    assert.equal(
        await icon.getAttribute("class"),
        "relative grid rounded outline-dashed grid-cols-1 justify-items-center h-24 w-24 p-2 text-sm overflow-hidden"
      );
  })