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


Given("I am on the family page", function () {
    await driver.get(base_url + "family");
})

When("I click on the add children button"), function () {
    const add_children_button = driver.findElement(By.className("add-children"));
    add_children_button.click();
}

Then("a child should be added"), function() {
    const children_list = driver.findElement(By.className("children-list"));
    const children_list_items = children_list.findElements(By.className("child-item"));
    expect(children_list_items.length).to.equal(1);
}

Given("I am on the family page and a child has been added"), function (){
    await driver.get(base_url + "family");
    const add_children_button = driver.findElement(By.className("add-children"));
    add_children_button.click();
}

When("I click on the edit button"), function () {
    const edit_button = driver.findElement(By.className("edit"));
    edit_button.click();
}

Then("I should be navigated to the details page for that child", function() {
    var expected_url = "child-details";
    var actual_url = driver.getCurrentUrl();
    actual_url = actual_url.split("/")[3];
    expect(actual_url).to.equal(expected_url);
})

