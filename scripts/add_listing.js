const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

var testData = {
    userEmail: process.env.USER_EMAIL,
    userPassword: process.env.USER_PASSWORD,
    addressInput: "32",
    shortDescription: "32 automated test"
};

async function Login(driver){
    await driver.findElement(By.id("account-button")).click()
    await driver.findElement(By.id("login-email-input")).sendKeys(testData.userEmail)
    await driver.findElement(By.id("login-password-input")).sendKeys(testData.userPassword)
    await driver.findElement(By.id("login-button")).click()
    await driver.wait(until.elementLocated(By.id('account-button-dropdown')), 10000);
}

async function AddListing(driver){
    
    await driver.findElement(By.id("button-add-listing")).click()
    await driver.findElement(By.id("button-add-listing-type-next")).click()
    await driver.findElement(By.id("input-add-listing-address")).sendKeys(testData.addressInput)
    
    let suggestion =
        await driver.wait(until.elementLocated(By.className('suggestion-item')), 10000);

    var suggestionText = await suggestion.getAttribute("innerText");
    console.log(suggestionText);
    await suggestion.click();
    await driver.findElement(By.id("add_address_next_button")).click()
    await driver.findElement(By.id("overview_edit_short_description_input")).sendKeys(testData.shortDescription)
    await driver.findElement(By.id("overview_create_listing_button")).click()
    await driver.findElement(By.id("overview_edit_next_button")).click()
}

describe('Add Listing', function() {
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
        //await driver.quit();
    })
    it('Login', async function() {
        await Login(driver);
    })
    it('Add Listing', async function(){
        await AddListing(driver);
    })
})
