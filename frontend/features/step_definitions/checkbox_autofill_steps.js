const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

Given("that I have saved my details", async function () {
  await driver.get(baseUrl);
  await driver.sleep(1000);
  const notACustomerYetButton = await driver.findElement(
    By.className("bg-red-500")
  );
  await notACustomerYetButton.click();
  await driver.sleep(1000);

  await driver.findElement(By.className("family-next")).click();
  await driver.sleep(1000);

  await driver
    .findElement(By.className("display_name"))
    .sendKeys("Sally Abbot");
  await driver.findElement(By.className("email")).sendKeys("sally@gmail.com");
  await driver.findElement(By.className("phone_number")).sendKeys(parentNumber);
  await driver.sleep(1000);

  assert.equal(await driver.getCurrentUrl(), baseUrl + "details");

  await driver.findElement(By.className("next")).click();
  await driver.sleep(1000);

  assert.equal(await driver.getCurrentUrl(), baseUrl + "family");
});

Given("I add a new child", async function () {
  assert.equal(await driver.getCurrentUrl(), baseUrl + "family");

  await driver.findElement(By.className("add")).click();
  await driver.sleep(1000);

  var actualUrl = await driver.getCurrentUrl();
  assert.equal(actualUrl, baseUrl + "child");

  await driver
    .findElement(By.className("display_name"))
    .sendKeys("Salah Abbot");
});

When("I check the autofill checkbox", async function () {
  const autofillCheckbox = await driver.findElement(By.className("autofill"));

  if (!autofillCheckbox.isSelected()) {
    autofillCheckbox.click();
  }

  var checked = await autofillCheckbox.isSelected();
  assert.equal(checked, true);
});

Then("I should see my child details autofilled", async function () {
  var childNumberValue = await driver
    .findElement(By.className("phone_number"))
    .getAttribute("value");
  assert.equal(childNumberValue, parentNumber);

  var childEmailValue = await driver
    .findElement(By.className("email"))
    .getAttribute("value");
  assert.equal(childEmailValue, "sally@gmail.com");
});

When("I move to the review page", async function () {
  // Move to family page
  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  var actualUrl = await driver.getCurrentUrl();
  assert.equal(actualUrl, baseUrl + "family");

  // Move to passport page
  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);

  var actualUrl = await driver.getCurrentUrl();
  assert.equal(actualUrl, baseUrl + "passport");
  
  await driver.findElement(By.className("full_name")).sendKeys("Sally Abbot");
  await driver.findElement(By.className("passport_number")).sendKeys("E32521921");
  await driver.findElement(By.className("nationality")).sendKeys("American");
  await driver.findElement(By.className("female")).click();
  await driver.findElement(By.xpath("//input[@placeholder='Select Date of Birth']")).sendKeys("14/07/1980");
  await driver.findElement(By.xpath("//input[@placeholder='Select Date']")).sendKeys("09/2024");
  await driver.sleep(500);

  await driver.findElement(By.id("user_1")).click();
  await driver.sleep(500);

  await driver.findElement(By.className("full_name")).sendKeys("Sarah Abbot");
  await driver.findElement(By.className("passport_number")).sendKeys("E34152315");
  await driver.findElement(By.className("nationality")).sendKeys("American");
  await driver.findElement(By.className("female")).click();
  await driver.findElement(By.xpath("//input[@placeholder='Select Date of Birth']")).sendKeys("14/07/2005");
  await driver.findElement(By.xpath("//input[@placeholder='Select Date']")).sendKeys("09/2030");

  await driver.sleep(500);

  // Move to review page
  await driver.findElement(By.className("next")).click();
  await driver.sleep(1000);

  var actualUrl = await driver.getCurrentUrl();
  assert.equal(actualUrl, baseUrl + "review");
});

Then(
  "I should be able to see that my child details are the same as mine",
  async function () {
    var childNumberValue = await driver
      .findElement(By.className("phone_number"))
      .getText();
    assert.equal(childNumberValue, parentNumber);

    var childEmailValue = await driver
      .findElement(By.className("email"))
      .getText();
    assert.equal(childEmailValue, "sally@gmail.com");
  }
);

When("I uncheck the autofill checkbox", async function () {
  const autofillCheckbox = await driver.findElement(By.className("autofill"));

  if (autofillCheckbox.isSelected()) {
    autofillCheckbox.click();
  }

  var checked = await autofillCheckbox.isSelected();
  assert.equal(checked, false);
});

When("I edit my child contact details", async function () {
  await driver.findElement(By.className("phone_number")).sendKeys(childNumber);
  await driver.findElement(By.className("email")).sendKeys("sarah@gmail.com");
});

Then(
  "I should be able to see that my child details are different",
  async function () {
    var childNumberValue = await driver
      .findElement(By.className("phone_number"))
      .getText();
    assert.equal(childNumberValue, childNumber);

    var childEmailValue = await driver
      .findElement(By.className("email"))
      .getText();
    assert.equal(childEmailValue, "sarah@gmail.com");
  }
);
