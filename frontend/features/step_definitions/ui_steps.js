const { Given, When, Then, Before, AfterAll, After } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key, Button } = require('selenium-webdriver');
const {initDriver} = require('../support/driverUtil')
const { expect } = require('chai');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const pactum = require('pactum');

let spec = pactum.spec();

base_url = 'http://localhost:3000/'

setDefaultTimeout(60*1000)

let driver;

Before(function(){
    driver = initDriver()
    spec = pactum.spec();
});

After(async function(){
    await driver.quit()
})
 

Given("I am on the {string} page", async function (previous) {
    await driver.get(base_url + previous);
    await driver.sleep(3*1000)
});

When('I click on the next button', async function () {
    const registration_button = await driver.findElement(By.className('next'));
    await registration_button.click()
    await driver.sleep(3*1000);
});

Then("I should move forward to the {string} page", async function (next) {
    var expected_url = next;
    var actual_url = await driver.getCurrentUrl();
    actual_url = actual_url.split("/")[3]
    expect(actual_url).to.equal(expected_url);
});


Given("I am now on the {string} page", async function (next) {
    await driver.get(base_url + next);
    await driver.sleep(3*1000)
});

When('I click on the back button', async function () {
    const registration_button = await driver.findElement(By.className('back'));
    await registration_button.click()
    await driver.sleep(3*1000);
});

Then("I should go back to the {string} page", async function (previous) {
    var expected_url = previous;
    var actual_url = await driver.getCurrentUrl();
    actual_url = actual_url.split("/")[3]
    expect(actual_url).to.equal(expected_url);
});