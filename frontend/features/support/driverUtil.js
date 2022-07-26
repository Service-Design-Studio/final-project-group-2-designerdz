// ** VERSION FOR UBUNTU WSL, WITH HEADLESS CHROME **
const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const pactum = require("pactum");
const { Builder } = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome");
// var options = new chrome.Options().headless();
var options = new chrome.Options();
require("chromedriver");

const width = 411;
const height = 999;
setDefaultTimeout(60 * 1000);

const initDriver = () => {
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  driver.manage().window().setRect({ width: width, height: height });
  return driver;
};

Before(async function () {
  //declaring global variable for each scenario
  global.driver = initDriver();
  global.spec = pactum.spec();
  global.baseUrl = "http://localhost:3001/";
  // global.baseUrl = "https://react-frontend-353408.as.r.appspot.com/";
  global.parentNumber = Math.floor(Math.random() * 100000000);
  global.childNumber = Math.floor(Math.random() * 100000000);

  await driver.get(baseUrl);
  await driver.sleep(500);
  await driver.executeScript(function () {
    localStorage.clear();
  });
});

After(async function () {
  await driver.quit();
});

// ** NORMAL VERSION WITH CHROME **

// onst webdriver = require('selenium-webdriver');
// const {Capabilities} = require('selenium-webdriver')

// require("chromedriver")

// const capabilities = Capabilities.chrome();
// capabilities.set('chromeOptions', { "w3c": false});
// const width = 411;
// const height = 999;

// exports.initDriver = () => {
//     const driver = new webdriver.Builder().forBrowser('chrome').withCapabilities(capabilities).build();
//     driver.manage().window().setRect({width: width, height: height});
//     return driver;
// }

// let chrome = require("selenium-webdriver/chrome");
// let { Builder, By, Key } = require("selenium-webdriver");

// let driver = new Builder()
//   .forBrowser("chrome")
//   .setChromeOptions(new chrome.Options().headless())
//   .build();
