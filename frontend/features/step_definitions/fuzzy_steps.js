const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");
const randexp = require('randexp').randexp;

When(/^I have filled in the (.*) field for (.*)$/, async function(type, field) {
    await driver.navigate().refresh();
    
    if (type == "wrong"){
        // TODO: make this wrong
        if (field == "number") {
            const phoneNumber = randexp(/^[A-Z]*$/);
            await driver.findElement(By.className("phone_number")).sendKeys(phoneNumber);
            // console.log(number);
            // const randexp = new RandExp(/^[0-9]*$/).gen();
        } else if (field == "full_name") {
            const fullName = randexp(/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/);
            // console.log(fullName);
        } else if (field == "passport_number") {
            const passportNumber = randexp(/^(?!^0+$)[a-zA-Z0-9]{3,20}$/);
            console.log(passportNumber);
        } else if (field == "nationality") {
            const nationality = randexp(/^[^-\s][a-zA-Z_\s-]+$/);
            // console.log(nationality);
        }
    } else if (type == "correct") {
        if (field == "number") {
            const phoneNumber = randexp(/^[A-Z]*$/);
            await driver.findElement(By.className("phone_number")).sendKeys(phoneNumber);
            await driver.findElement(By.className("next")).click();;
        } else if (field == "full_name") {
            const fullName = randexp(/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/);
            // console.log(fullName);
            // await driver.findElement(By.className("full_name")).sendKeys(fullName);
        } else if (field == "passport_number") {
            const passportNumber = randexp(/^(?!^0+$)[a-zA-Z0-9]{3,20}$/);
            // await driver.findElement(By.className("passport_number")).sendKeys(passportNumber);
        } else if (field == "nationality") {
            const nationality = randexp(/^[^-\s][a-zA-Z_\s-]+$/);
            // await driver.findElement(By.className("nationality")).sendKeys(nationality);
        }

        await driver.sleep(5000);
    }
});

Then(/^I should (.*) see the error (.*)$/, async function() {

})

Then("I should not see {string}", async function (errors) {
    let error_elements = await driver.findElements(By.className("text-red-500"));
    let error_array = errors.split(",");
  
    if (error_elements.length == 7) {
      error_elements.shift();
    }

    expect(error_elements.length).to.equal(error_array.length);
    for (let i = 0; i < error_elements.length; i++) {
      let error_text = await error_elements[i].getText();
      expect(error_text).to.equal(error_array[i]);
    }
  });