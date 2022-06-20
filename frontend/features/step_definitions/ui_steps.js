const { Given, When, Then, Before, AfterAll, After } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key, Button } = require('selenium-webdriver');
const {initDriver} = require('../support/driverUtil')
const { expect } = require('chai');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const pactum = require('pactum');

let spec = pactum.spec();

base_url = 'http://localhost:3000/'

setDefaultTimeout(60*1000)

// driver setup
let driver;

Before(function(){
    driver = initDriver()
    spec = pactum.spec();
});

After(async function(){
    await driver.quit()
})

Given('I am on the landing page', async function () {
    await driver.get(base_url);
    await driver.sleep(3*1000)
});

When('I click on the registration button', async function () {
    const registration_button = await driver.findElement(By.xpath('//button[contains(text(), "NOT A CUSTOMER YET")]'))
    await registration_button.click()
    await driver.sleep(3*1000);
});

Then('I should navigate to the signup page', async function () {
    var expected_url = "signup";
    var actual_url = await driver.getCurrentUrl();
    actual_url = actual_url.split("/")[3]
    expect(actual_url).to.equal(expected_url);
});