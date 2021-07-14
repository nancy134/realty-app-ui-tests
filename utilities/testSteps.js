const { Builder, By, Key, until } = require('selenium-webdriver');
const cognito = require('../utilities/cognito');

async function confirmUser(email){
    var params = {
        UserPoolId: process.env.USER_POOL_ID,
        AttributesToGet: ['email'],
        Filter: "email = \""+email+"\""        
    };
    var users = await cognito.listUsers(params);
    var params = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: users.Users[0].Username
    };
    var result = await cognito.adminConfirmSignUp(params);
}

module.exports.SignUp = async function(driver, testData) {
    await SignUp(driver, testData);
}

var SignUp = async function(driver, testData){
    await driver.findElement(By.id("account-button")).click()
    await driver.findElement(By.id("account-login-register")).click()
    driver.sleep(1000);
    await driver.findElement(By.id("account-register-email")).sendKeys(testData.userEmail)
    await driver.findElement(By.id("account-register-password")).sendKeys(testData.userPassword)
    await driver.findElement(By.id("account-register-register")).click()
    var confirmCancel = await driver.wait(until.elementLocated(By.id('account-confirm-cancel')), 10000);
    confirmCancel.click();
    await confirmUser(testData.userEmail);
}

module.exports.Login = async function(driver, testData) {
    await Login(driver, testData);
}

var Login = async function(driver, testData) {
    console.log(testData);
    await driver.findElement(By.id("account-button")).click()
    driver.sleep(1000);
    await driver.findElement(By.id("login-email-input")).sendKeys(testData.userEmail)
    await driver.findElement(By.id("login-password-input")).sendKeys(testData.userPassword)
    await driver.findElement(By.id("login-button")).click()
    await driver.wait(until.elementLocated(By.id('account-button-dropdown')), 10000);
}

module.exports.AddListing = async function(driver, testData) {
    await AddListing(driver, testData);
}

var AddListing = async function(driver, testData){
    
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
