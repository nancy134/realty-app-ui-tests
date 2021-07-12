const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const cognito = require('../utilities/cognito');

var testData = {
    UserPoolId: process.env.USER_POOL_ID,
    userEmail: process.env.USER_EMAIL,
    userPassword: process.env.USER_PASSWORD
};

async function confirmUser(email){
    var params = {
        UserPoolId: testData.UserPoolId,
        AttributesToGet: ['email'],
       Filter: "email = \""+testData.userEmail+"\""        
    };
    var users = await cognito.listUsers(params);
    var params = {
        UserPoolId: testData.UserPoolId,
        Username: users.Users[0].Username
    };
    var result = await cognito.adminConfirmSignUp(params);
    
}

async function SignUp(driver){
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
async function Login(driver){
    await driver.findElement(By.id("account-button")).click()
    await driver.findElement(By.id("login-email-input")).sendKeys(testData.userEmail)
    await driver.findElement(By.id("login-password-input")).sendKeys(testData.userPassword)
    await driver.findElement(By.id("login-button")).click()
    await driver.wait(until.elementLocated(By.id('account-button-dropdown')), 10000);
}
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
    //await driver.quit();
  })
  it('SignUp', async function() {
    await SignUp(driver);
  })
  it('Login', async function() {
    await Login(driver);
  })
})
