const {test, expect} = require('@playwright/test');
const { PageManager } = require('../pages/PageManager');

test('@Smoke Login with existing customer', async({page})=>{

    const url = "https://eventhub.rahulshettyacademy.com/login";
    const email = "steve.rogers102@outlook.com";
    const password = "steveRogers1#";
    const pageManager = new PageManager(page);
    await pageManager.loginPage.gotoLoginUrl(url);
    await pageManager.loginPage.login(email, password);
    console.log("User is successfully logged in");
});

test('@Smoke Login with unregistered customer',async({page})=>{

    const url = "https://eventhub.rahulshettyacademy.com/login";
    const email = "tony.stark@starkindustries.com";
    const password = "tonyStark3#";
    const pageManager = new PageManager(page);
    await pageManager.loginPage.gotoLoginUrl(url);
    await pageManager.loginPage.login(email, password);
    await expect(page.locator('.fixed .overflow-hidden')).toBeVisible();
});