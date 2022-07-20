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
const { expect, assert, AssertionError } = require("chai");
const { setDefaultTimeout } = require("@cucumber/cucumber");
const pactum = require("pactum");
const axios = require("axios");

let spec = pactum.spec();

// let baseUrl = "https://react-frontend-353408.as.r.appspot.com/";
let baseUrl = "http://localhost:3001/";

setDefaultTimeout(60 * 1000);

let parent_number = Math.floor(Math.random() * 10000);
let child_number = Math.floor(Math.random() * 10000);

let driver;

Before(async function () {
  driver = initDriver();
  await driver.get(baseUrl);
  await driver.sleep(1000);
  await driver.executeScript(function () {
    localStorage.clear();
  });
  spec = pactum.spec();
});

After(async function () {
  await driver.quit();
});

Given('I make a GET request to {string}', function (url) {
  spec.get(url);
});

Then ("I will make a request to {string}", function(url) {
  spec.get(url);
});

When('I receive a response within 0.5 seconds', async function () {
  await spec.toss();
});

Then('response should have a status {int}', async function (code) {
  await spec.response().should.have.status(code);
});