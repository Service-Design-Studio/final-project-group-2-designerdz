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
  
  base_url = "https://react-frontend-353408.as.r.appspot.com/";
  
  setDefaultTimeout(60 * 1000);
  
  let driver;
  
  Before(function () {
    driver = initDriver();
    spec = pactum.spec();
  });
  
  After(async function () {
    await driver.quit();
  });

//   Given("I am on family page and I have at least one child", async function () {
//     await driver.get(base_url + family);
//     await driver.sleep(1000);
//   });
  
//   When("I select a different account in the Carousel", async function () { 
//     //TO BE FILL IN
//   });
  
//   Then("I should see a bubble indicating that detail for that family member field is empty", async function (next) {
//     //TO BE FILL IN
//   });


  Given("I am on {string}", async function (page) {
    await driver.get(base_url + page);
    await driver.sleep(1000);
  });

  And("there is empty field"), async function () {
    driver.findElements(By.className("block")).isEmpty()
    await driver.sleep(1000);
  });
  
  When("I attempt to navigate to the <next_page> ", async function () { 
    const registration_button = await driver.findElement(By.className("next"));
    await registration_button.click();
    await driver.sleep(1000);
  });
  
  Then("I should remain at the same page", async function (next) {
    var expected_url = page;
    var actual_url = await driver.getCurrentUrl();
    actual_url = actual_url.split("/")[3];
    expect(actual_url).to.equal(expected_url);
  });

  Given("I am on {string}", async function (page) {
    await driver.get(base_url + page);
    await driver.sleep(1000);
  });
  
  When("I attempt to navigate to the <next_page> ", async function () { 
    const registration_button = await driver.findElement(By.className("next"));
    await registration_button.click();
    await driver.sleep(1000);
  });

  And("<mock_type> differs from <field_type>", async function () {
    var expected_type = type;
    var actual_type = await driver.getCurrentType();
    expect(actual_type).to.equal(expected_type);
  });
  
  Then("I should remain at the same page", async function (next) { //can't test pop-up leh
    var expected_url = page;
    var actual_url = await driver.getCurrentUrl();
    actual_url = actual_url.split("/")[3];
    expect(actual_url).to.equal(expected_url);
  });
