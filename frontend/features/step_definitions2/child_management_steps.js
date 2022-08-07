const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");
  
Then("I should see my child on the family page", async function () {
    const childName = await driver.findElement(By.id("name_0")).getText();
    assert.equal(childName, "Mr Salah Abbot");
});

When("I edit my child name", async function () {
    const edit_button = await driver.findElement(By.id("edit_0"));
    edit_button.click();
    await driver.sleep(500);

    const childName2 = await driver.findElement(By.className("display_name"));
    childName2.sendKeys(" Edited");

    const nextButton2 = await driver.findElement(By.className("next"));
    nextButton2.click();
    await driver.sleep(500);
});

Then("I should see my edited child name on the family page", async function () {
    const childName = await driver.findElement(By.id("name_0")).getText();
    assert.equal(childName, "Mr Salah Abbot Edited");
    });

    When("I click on remove button for my child", async function () {
    await driver.findElement(By.id("delete_0")).click();
    await driver.sleep(500);
});

Then("my child should be removed", async function () {
    try {
        const childNameDeleted = await driver.findElement(By.id("name_0"));
    } catch (error) {
        assert.equal(error.name, "NoSuchElementError");
    }
});
  
