const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");
const { RandExp } = require("randexp");

When(/^I have filled in the (.*) field for (.*)$/, async function(type, field) {
    await driver.navigate().refresh();
    
    if (type == "wrong"){
        // TODO: make this wrong
        if (field == "number") {
            const randexp = new RandExp(/^[0-9]*$/).gen();
        } else if (field == "full_name") {
            const randexp = new RandExp(/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/).gen();
        } else if (field == "passport_number") {
            const randexp = new RandExp(/^(?!^0+$)[a-zA-Z0-9]{3,20}$/).gen();
        } else if (field == "nationality") {
            const randexp = new RandExp(/^[^-\s][a-zA-Z_\s-]+$/).gen();
        }
    } else if (type == "correct") {
        if (field == "number") {
            const randexp = new RandExp(/^[0-9]*$/).gen();
        } else if (field == "full_name") {
            const randexp = new RandExp(/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/).gen();
        } else if (field == "passport_number") {
            const randexp = new RandExp(/^(?!^0+$)[a-zA-Z0-9]{3,20}$/).gen();
        } else if (field == "nationality") {
            const randexp = new RandExp(/^[^-\s][a-zA-Z_\s-]+$/).gen();
        }
    }
});

Then("I should not see {string}", async function (errors) {
    let error_elements = await driver.findElements(By.className("text-red-500"));
    let error_array = errors.split(",");
  
    if (error_elements.length == 7) {
      error_elements.shift();
    }

    expect(error_elements.length).to.equal(error_array.length);
    for (let i = 0; i < error_elements.length; i++) {
      let error_text = await error_elements[i].getText();
      expect(error_text).to.equal(error_array[i] + " is Required");
    }
  });