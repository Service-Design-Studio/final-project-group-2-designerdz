const { Given, When, Then, Before, AfterAll, After } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key, Button } = require('selenium-webdriver');
const {initDriver} = require('../support/driverUtil')
const { expect } = require('chai');
const { setDefaultTimeout } = require('@cucumber/cucumber');
const pactum = require('pactum');

let spec = pactum.spec();

base_url = 'http://localhost:3001/'

setDefaultTimeout(60*1000)

let driver;

Before(function(){
    driver = initDriver()
    spec = pactum.spec();
});

After(async function(){
    await driver.quit()
})

Then ("my details on {page} should be saved to the database", async function (page) {
    // TODO: should this be under API?
});

Then ("my previously filled details should be shown", async function() {
    // TODO: seed database first
});

Given ("I exit the app", async function() {
    await driver.quit();
});

When ("I come back to the app", async function() {
    driver = initDriver();
    await driver.sleep(3*1000);
});

Then ("I should be redirected back to {page}", async function(page) {
    var expected_url = page;
    var actual_url = await driver.getCurrentUrl();
    actual_url = actual_url.split("/")[3]
    expect(actual_url).to.equal(expected_url);
});

Given ("I am on the restore page", async function() {
    await driver.get(base_url + "restore");
    await driver.sleep(3*1000)
});

When ("I submit my {number} and OTP", async function(number) {
    const number_input = await driver.findElement(By.name('submit'));
    await number_input.sendKeys(number);
});

Then ("I should be redirected back to the {page} where I left off", async function(page) {
    var expected_url = page;
    var actual_url = await driver.getCurrentUrl();
    actual_url = actual_url.split("/")[3]
    expect(actual_url).to.equal(expected_url);
});














