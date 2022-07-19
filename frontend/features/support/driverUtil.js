// ** VERSION FOR UBUNTU WSL, WITH HEADLESS CHROME **

const webdriver = require('selenium-webdriver');
var chrome    = require('selenium-webdriver/chrome');
var options   = new chrome.Options().headless();

require("chromedriver")

const width = 411;
const height = 999;

exports.initDriver = () => {
    const driver = new webdriver.Builder().forBrowser('chrome').setChromeOptions(options).build();
    driver.manage().window().setRect({width: width, height: height});

    return driver;
}

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