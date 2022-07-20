// ** VERSION FOR UBUNTU WSL, WITH HEADLESS CHROME **

const { Builder } = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome");
var options = new chrome.Options().headless();
// var options = new chrome.Options();

require("chromedriver");

const width = 411;
const height = 999;
let baseUrl = "http://localhost:3001/";

exports.initDriver = () => {
  const driver = new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
  // driver.manage().window().setRect({width: width, height: height});
  return driver;
};

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
