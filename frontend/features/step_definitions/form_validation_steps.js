const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

Given('I am on {string} and I have not filled in any fields', async function (page) {
    await driver.get(base_url)
    await driver.sleep(2000)

    const notACustomerYetButton = await driver.findElement(By.className("bg-red-500"))
    notACustomerYetButton.click();
    await driver.sleep(1000);

    if (page == "details") {
      const familyNextButton = await driver.findElement(
        By.className("family-next")
      );
      familyNextButton.click();
      await driver.sleep(1000);
    }

    if (page == "child") {
      const familyNextButton = await driver.findElement(
        By.className("family-next")
      );
      familyNextButton.click();
      await driver.sleep(1000);

      await driver.findElement(By.className("display_name")).sendKeys("John");
      await driver.findElement(By.className("phone_number")).sendKeys(random1);
      driver.findElement(By.className("next")).click();
      await driver.sleep(1000);

      driver.findElement(By.className("add")).click();
      await driver.sleep(1000);

      const autofill = await driver.findElement(By.className("autofill"));
      autofill.click();
      await driver.sleep(1000);
    }
    if (page == "passport") {
      const goToDetailsButton = await driver.findElement(By.className("next"));
      goToDetailsButton.click();
      await driver.sleep(1000);

      await driver.findElement(By.className("display_name")).sendKeys("John");
      await driver.findElement(By.className("phone_number")).sendKeys(random2);

      const goToPassportButton = await driver.findElement(By.className("next"));
      goToPassportButton.click();
      await driver.sleep(1000);
    }

    expect(await driver.getCurrentUrl()).to.equal(base_url + page);
  }
);

When("I click on {string}", async function (button) {
  const nextButton = await driver.findElement(By.className(button));
  nextButton.click();
  await driver.sleep(1000);
});

// Then('I should be on {string}', async function (page) {
//   expect(await driver.getCurrentUrl()).to.equal(base_url + page);
// });

Then("I should see {string}", async function (errors) {
  let error_elements = await driver.findElements(By.className("text-red-500"));
  let error_array = errors.split(",");
  expect(error_elements.length).to.equal(error_array.length);
  for (let i = 0; i < error_elements.length; i++) {
    let error_text = await error_elements[i].getText();
    expect(error_text).to.equal(error_array[i] + " is Required");
  }
});

When("I fill up {string}", async function (string) {
  let form_fields = string.split(",");
  let custom_fields = ["passport_expiry", "gender", "dob"];
  for (let i = 0; i < form_fields.length; i++) {
    let form_string = form_fields[i];
    if (custom_fields.includes(form_string)) {
      if (form_string == "passport_expiry") {
        let passport_expiry_input = await driver.findElement(
          By.xpath("//input[@placeholder='Select Date']")
        );
        // send a value of "09/2022"
        await passport_expiry_input.sendKeys("09/2022");
        await driver.sleep(1000);
      } else if (form_string == "dob") {
        let dob_input = await driver.findElement(
          By.xpath("//input[@placeholder='Select Date of Birth']")
        );
        await dob_input.sendKeys("14/07/2015");
        await driver.sleep(1000);
      } else if (form_string == "gender") {
        await driver.findElement(By.className("female")).click();
        await driver.sleep(1000);
      }
    } else {
      let form_field = await driver.findElement(By.className(form_string));
      let form_field_type = await form_field.getAttribute("type");
      if (form_field_type == "text") {
        await form_field.sendKeys("test");
      } else if (form_field_type == "email") {
        await form_field.sendKeys("testing@123.com");
      } else if (form_field_type == "password") {
        await form_field.sendKeys("test");
      } else if (form_field_type == "number") {
        let form_field_disabled = await form_field.getAttribute("disabled");
        if (form_field_disabled != null) {
          let checkbox = await driver.findElement(By.className("autofill"));
          checkbox.click();
          await driver.sleep(1000);
        }
        await form_field.sendKeys(random4);
      }
    }
  }
});

Given(
  "I am on passport page, have at least one child and have not completed the fields on the current page",
  async function () {
    await driver.get(base_url);
    await driver.sleep(2000);

    const notACustomerYetButton = await driver.findElement(
      By.className("bg-red-500")
    );
    notACustomerYetButton.click();
    await driver.sleep(1000);

    const familyNextButton = await driver.findElement(
      By.className("family-next")
    );
    familyNextButton.click();
    await driver.sleep(1000);

    await driver.findElement(By.className("display_name")).sendKeys("John");
    await driver.findElement(By.className("phone_number")).sendKeys(random3);
    driver.findElement(By.className("next")).click();
    await driver.sleep(1000);
    driver.findElement(By.className("add")).click();
    await driver.sleep(1000);

    await driver
      .findElement(By.className("display_name"))
      .sendKeys("John Child");
    await driver.findElement(By.className("next")).click();
    await driver.sleep(1000);

    await driver.findElement(By.className("next")).click();
    await driver.sleep(1000);

    expect(await driver.getCurrentUrl()).to.equal(base_url + "passport");
  }
);

When("I click on another family member", async function () {
  await driver.findElement(By.id("user_1")).click();
});

Then(
  "I should see an icon on the carousel of the family member I just navigated away from",
  async function () {
    let found = await driver.findElements(By.id("incomplete_0"));
    expect(found.length).to.equal(1);
  }
);
