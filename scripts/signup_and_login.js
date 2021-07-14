const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const testSteps = require('../utilities/testSteps');

var testData = {
    userEmail: process.env.USER_EMAIL,
    userPassword: process.env.USER_PASSWORD
};


describe('Signup and Login', function() {
    this.timeout(30000)
    let driver
    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get("https://local.phowma.com/home")
    })
    beforeEach(async function(){
    })
    afterEach(async function(){
    })
    after(async function() {
        await driver.quit();
    })
    it('SignUp', async function() {
        await testSteps.SignUp(driver, testData);
    })
    it('Login', async function() {
        await testSteps.Login(driver, testData);
    })
})
