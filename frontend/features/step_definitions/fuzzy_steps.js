const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { expect, assert } = require("chai");
const randexp = require("randexp").randexp;

When(
  /^I have filled in the (.*) field for (.*), I should (.*) the error (.*)$/,
  async function (typeField, field, typeError, error) {
    for (let i = 0; i < 1000; i++) {
      await driver.findElement(By.className(field)).clear();

      if (typeField == "wrong") {
        if (field == "phone_number") {
          const phoneNumber = randexp(
            /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,15}$/
          );
          await driver
            .findElement(By.className("phone_number"))
            .sendKeys(phoneNumber);
        } else if (field == "full_name") {
          const fullName = randexp(/^(?=.{8,30}$)\D*\d/);
          await driver
            .findElement(By.className("full_name"))
            .sendKeys(fullName);
        } else if (field == "passport_number") {
          const passportNumber = randexp(/^([$-/:-?{-~!"^_`\[\]]).{10,25}/);
          console.log(passportNumber);
          await driver
            .findElement(By.className("passport_number"))
            .sendKeys(passportNumber);
        } else if (field == "nationality") {
          const nationality = randexp(/^(?=.{5,15}$)\D*\d/);
          await driver
            .findElement(By.className("nationality"))
            .sendKeys(nationality);
        }
      } else if (typeField == "correct") {
        if (field == "phone_number") {
          const phoneNumber = randexp(/^[1-9]{8,15}$/);
          await driver
            .findElement(By.className("phone_number"))
            .sendKeys(phoneNumber);
        } else if (field == "full_name") {
          const fullName = randexp(/^[A-Za-z]{8,15}$/);
          await driver
            .findElement(By.className("full_name"))
            .sendKeys(fullName);
        } else if (field == "passport_number") {
          const passportNumber = randexp(/^(?!^0+$)[a-zA-Z0-9]{3,20}$/);
          await driver
            .findElement(By.className("passport_number"))
            .sendKeys(passportNumber);
        } else if (field == "nationality") {
          const nationality = randexp(/^[^-\s][a-zA-Z_\s-]{5,15}$/);
          await driver
            .findElement(By.className("nationality"))
            .sendKeys(nationality);
        }
      }

      if (typeError == "see") {
        let errorText = await driver
          .findElement(By.className("error"))
          .getText();
        expect(errorText).to.equal(error);
      } else if (typeError == "not see") {
        let errorArray = await driver.findElements(By.className("error"));
        expect(errorArray.length).to.equal(0);
      }
    }
  }
);

// When(/^I have filled in the (.*) field for (.*)$/, async function(type, field) {
//     if (type == "wrong"){
//         if (field == "number") {
//             await driver.findElement(By.className("display_name")).sendKeys("Sally Abbot");
//             const phoneNumber = randexp(/^[A-Za-z0-9_@./#&+-]{8,15}$/);
//             await driver.findElement(By.className("phone_number")).sendKeys(phoneNumber);
//         } else if (field == "full_name") {
//             const fullName = randexp(/^[A-Za-z0-9_@./#&+-]{8,30}$/);
//             await driver.findElement(By.className("full_name")).sendKeys(fullName);
//         } else if (field == "passport_number") {
//             const passportNumber = randexp(/^[A-Za-z0-9_@./#&+-]{20,30}$/);
//             await driver.findElement(By.className("passport_number")).sendKeys(passportNumber);
//         } else if (field == "nationality") {
//             const nationality = randexp(/^[0-9_@./#&+-]{5,15}$/);
//             await driver.findElement(By.className("nationality")).sendKeys(nationality);
//         }
//     } else if (type == "correct") {
//         if (field == "number") {
//             await driver.findElement(By.className("display_name")).sendKeys("Sally Abbot");
//             const phoneNumber = randexp(/^[1-9]{8,15}$/);
//             await driver.findElement(By.className("phone_number")).sendKeys(phoneNumber);
//         } else if (field == "full_name") {
//             const fullName = randexp(/^[a-zA-Z- ]{8,30}$/);
//             await driver.findElement(By.className("full_name")).sendKeys(fullName);
//         } else if (field == "passport_number") {
//             const passportNumber = randexp(/^(?!^0+$)[a-zA-Z0-9]{3,20}$/);
//             await driver.findElement(By.className("passport_number")).sendKeys(passportNumber);
//         } else if (field == "nationality") {
//             const nationality = randexp(/^[^-\s][a-zA-Z_\s-]{5,15}$/);
//             await driver.findElement(By.className("nationality")).sendKeys(nationality);
//         }
//     }
// });

// Then(/^I should (.*) the error (.*)$/, async function(type, error) {
//     if (type == "see") {
//         let errorText = await driver.findElement(By.className("error")).getText();
//           expect(errorText).to.equal(error);
//     } else if (type == "not see") {
//         let errorArray = await driver.findElements(By.className("error"));
//         expect(errorArray.length).to.equal(0);
//     }
// });
