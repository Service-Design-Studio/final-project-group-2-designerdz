const webdriver = require('selenium-webdriver');
const {Capabilities} = require('selenium-webdriver')

require("chromedriver")

const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false});
const width = 411;
const height = 999;

exports.initDriver = () => {
    const driver = new webdriver.Builder().forBrowser('chrome').withCapabilities(capabilities).build();
    driver.manage().window().setRect({width: width, height: height});
    return driver;
}