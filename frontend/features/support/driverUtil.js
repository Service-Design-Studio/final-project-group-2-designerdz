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