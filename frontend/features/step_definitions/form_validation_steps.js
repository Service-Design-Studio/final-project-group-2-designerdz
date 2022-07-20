const {
    Given,
    When,
    Then,
    Before,
    AfterAll,
    After,
  } = require("@cucumber/cucumber");
  const {
    Builder,
    By,
    Capabilities,
    Key,
    Button,
    ChromiumWebDriver,
  } = require("selenium-webdriver");
  const { initDriver } = require("../support/driverUtil");
  const { expect, assert } = require("chai");
  const { setDefaultTimeout } = require("@cucumber/cucumber");
  const pactum = require("pactum");
  
  let spec = pactum.spec();
  
  let base_url = "http://localhost:3001/";
  
  setDefaultTimeout(60 * 1000);
  
  let driver;
  
  Before(async function () {
    driver = initDriver();

    await driver.get(base_url);
    await driver.sleep(100);
  
    await driver.executeScript(function() {
        localStorage.clear()
    });

    spec = pactum.spec();
  });
  
  After(async function () {
    await driver.quit();
  });

  Given('I am on {string} and I have not filled in any fields', async function (page) {
      await driver.get(base_url)
      await driver.sleep(2000)

      const notACustomerYetButton = await driver.findElement(By.className("bg-red-500"))
      notACustomerYetButton.click();
      await driver.sleep(1000);
      
      if (page == "details") {
        const familyNextButton = await driver.findElement(By.className("family-next"))
        familyNextButton.click();
        await driver.sleep(1000);
      }

      if (page == "child") {
        const familyNextButton = await driver.findElement(By.className("family-next"))
        familyNextButton.click();
        await driver.sleep(1000);

        await driver.findElement(By.className("display_name")).sendKeys("John")
        await driver.findElement(By.className("phone_number")).sendKeys("12345678907")
        driver.findElement(By.className("next")).click()
        await driver.sleep(1000)

        
        driver.findElement(By.className("add")).click()
        await driver.sleep(1000)

        const autofill = await driver.findElement(By.className("autofill"))
        autofill.click()
        await driver.sleep(1000);

      if (page == "passport") {
        const goToDetailsButton = await driver.findElement(By.className("next"))
        goToDetailsButton.click()
        await driver.sleep(1000)

        await driver.findElement(By.className("display_name")).sendKeys("John")
        await driver.findElement(By.className("phone_number")).sendKeys("12345678907564")
        
        const goToPassportButton = await driver.findElement(By.className("next"))
        goToPassportButton.click()
        await driver.sleep(1000)
      }

      expect(await driver.getCurrentUrl()).to.equal(base_url + page)
    }
  });

  When('I click on {string}', async function (button) {
    driver.findElement(By.className(button)).click();
    await driver.sleep(1000);
  });

  Then('I should be on {string}', async function (page) {
    expect(await driver.getCurrentUrl()).to.equal(base_url + page);
  });

  Then('I should see {string}', async function (errors) {
    let error_elements = await driver.findElements(By.className("text-red-500"));
    let error_array = errors.split(",");
    expect(error_elements.length).to.equal(error_array.length);
    for (let i = 0; i < error_elements.length; i++) {
        let error_text = await error_elements[i].getText();
        expect(error_text).to.equal(error_array[i] + " is Required");
    }
  });

  When('I fill up {string}', async function (string) {
    let form_fields = string.split(",");    
    for (let i = 0; i < form_fields.length; i++) {
      let form_field = await driver.findElement(By.className(form_fields[i]));
      let form_field_type = await form_field.getAttribute("type");
      if (form_field_type == "text") {
        await form_field.sendKeys("test");
      } else if (form_field_type == "email") {
        await form_field.sendKeys("testing@123.com")
      } else if (form_field_type == "password") {
        await form_field.sendKeys("test")
      } else if (form_field_type == "number") {
        let form_field_disabled = await form_field.getAttribute("disabled");
        if (form_field_disabled != null) {
          let checkbox = await driver.findElement(By.className("autofill"));
          checkbox.click();
          await driver.sleep(1000);
        } 
        await form_field.sendKeys("123456789")
      }
    }
  });
