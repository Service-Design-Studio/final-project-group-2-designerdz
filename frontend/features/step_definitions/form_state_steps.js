const { Given, When, Then } = require("@cucumber/cucumber");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

Given("I make a GET request to {string}", function (url) {
  spec.get(url);
});

Then("I will make a request to {string}", function (url) {
  spec.get(url);
});

When("I receive a response within 0.5 seconds", async function () {
  await spec.toss();
});

Then("response should have a status {int}", async function (code) {
  await spec.response().should.have.status(code);
});

Given(
  "that I have filled up {string} page and have navigated to {string}",
  async function (page1, page2) {
    await driver.get(baseUrl + "signup");
    await driver.sleep(500);

    // Navigate into single user details
    await driver.findElement(By.className("next")).click();
    await driver.sleep(500);
    assert.equal(await driver.getCurrentUrl(), baseUrl + "details");

    await driver.findElement(By.className("display_name")).sendKeys("Yi Ma");
    await driver
      .findElement(By.className("phone_number"))
      .sendKeys(parentNumber);
    await driver
      .findElement(By.className("email"))
      .sendKeys("dayima@gmail.com");

    // Navigate to passport page
    await driver.findElement(By.className("next")).click();
    await driver.sleep(500);

    if (page2 == "review") {
      await driver.findElement(By.className("full_name")).sendKeys("Da Yi Ma");
      await driver
        .findElement(By.className("passport_number"))
        .sendKeys("E32136512");
      await driver.findElement(By.className("nationality")).sendKeys("China");
      await driver.findElement(By.className("male")).click();

      await driver
        .findElement(By.xpath("//input[@placeholder='Select Date of Birth']"))
        .sendKeys("14/07/1980");

      await driver
        .findElement(By.xpath("//input[@placeholder='Select Date']"))
        .sendKeys("09/2022");
      await driver.sleep(500);

      // Move to review page
      await driver.findElement(By.className("next")).click();
      await driver.sleep(500);
    }

    assert.equal(await driver.getCurrentUrl(), baseUrl + page2);
  }
);

When("I navigate back to the {string} page", async function (previous) {
  const back_button = await driver.findElement(By.className("back"));
  await back_button.click();
  await driver.sleep(500);

  assert.equal(await driver.getCurrentUrl(), baseUrl + previous);
});

When("I navigate back to {string}", async function (page) {
  const next_button = await driver.findElement(By.className("next"));
  await next_button.click();
  await driver.sleep(500);

  assert.equal(await driver.getCurrentUrl(), baseUrl + page);
});

Then(
  "the fields I have filled up in {string} should remain",
  async function (page) {
    if (page == "details") {
      assert.equal(
        await driver
          .findElement(By.className("display_name"))
          .getAttribute("value"),
        "Yi Ma"
      );
      assert.equal(
        await driver
          .findElement(By.className("phone_number"))
          .getAttribute("value"),
        parentNumber
      );
      assert.equal(
        await driver.findElement(By.className("email")).getAttribute("value"),
        "dayima@gmail.com"
      );
    } else if (page == "passport") {
      assert.equal(
        await driver
          .findElement(By.className("full_name"))
          .getAttribute("value"),
        "Da Yi Ma"
      );
      assert.equal(
        await driver
          .findElement(By.className("passport_number"))
          .getAttribute("value"),
        "E32136512"
      );
      assert.equal(
        await driver
          .findElement(By.className("nationality"))
          .getAttribute("value"),
        "China"
      );
    }
  }
);
