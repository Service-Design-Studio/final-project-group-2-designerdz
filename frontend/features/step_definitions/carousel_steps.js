const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

Given("I have filled in my details", async function () {
  await driver.get(baseUrl);
  await driver.sleep(1000);

  await driver.findElement(By.className("bg-red-500")).click();
  await driver.sleep(1000);

  await driver.findElement(By.className("family-next")).click();
  await driver.sleep(1000);

  await driver
    .findElement(By.className("display_name"))
    .sendKeys("Sally Abbot");
  await driver.findElement(By.className("phone_number")).sendKeys(parentNumber);
  await driver.sleep(1000);

  await driver.findElement(By.className("next")).click();
  await driver.sleep(1000);
});

When("I click on my icon", async function () {
  await driver.sleep(500);
  await driver.findElement(By.id("user_0")).click();
  await driver.sleep(500);
});

When("I click on my child icon", async function () {
  await driver.sleep(500);
  await driver.findElement(By.id("user_1")).click();
  await driver.sleep(500);
});

Given("I have added a child", async function () {
  await driver.findElement(By.className("add")).click();
  await driver.sleep(500);

  await driver
    .findElement(By.className("display_name"))
    .sendKeys("Salah Abbot");

  await driver.findElement(By.className("next")).click();
  await driver.sleep(1000);

  assert.equal(await driver.getCurrentUrl(), baseUrl + "family");
});

When("I navigate to the passport page", async function () {
  await driver.findElement(By.className("next")).click();
  await driver.sleep(500);
  var actualUrl = await driver.getCurrentUrl();
  assert.equal(actualUrl, baseUrl + "passport");
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

When("I fill in my passport details", async function () {
  const parentName = await driver.findElement(By.className("full_name"));
  parentName.sendKeys("Sally Abbot");
  const parentPassport = await driver.findElement(
    By.className("passport_number")
  );
  parentPassport.sendKeys("E1234567S");
  const parentNationality = await driver.findElement(
    By.className("nationality")
  );
  parentNationality.sendKeys("American");
});

When("I navigate to my child tab", async function () {
  const childButton = await driver.findElement(By.id("user_1"));
  await childButton.click();
  await driver.sleep(1000);
});

When("I navigate back to my tab", async function () {
  const parentButton = await driver.findElement(By.id("user_0"));
  await parentButton.click();
  await driver.sleep(1000);
});

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

Then("my child icon should be selected", async function () {
  const childIcon = await driver.findElement(By.id("user_1"));
  await childIcon.click();
  await driver.sleep(1000);
  const childIcon2 = await driver.findElement(By.id("user_1"));
  assert.equal(
    await childIcon2.getAttribute("class"),
    "relative grid rounded outline-dashed grid-cols-1 justify-items-center h-24 w-24 p-2 text-sm overflow-hidden"
  );
});
