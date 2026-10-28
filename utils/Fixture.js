const base = require('@playwright/test');
const { PageManager } = require('../pages/PageManager');
const { request } = require('@playwright/test');
const { ApiUtils } = require('../utils/ApiUtils');
const loginPayload = {email:"steve.rogers102@outlook.com",password:"steveRogers1#"};
const bookingPayload = {customerName:"Steve Rogers",customerEmail:"steve.rogers102@outlook.com",customerPhone:"8451230698",quantity:1,eventId:51};

exports.customTest = base.test.extend({

    authenticatedPage: async ({ browser }, use) => {

        const url = "https://eventhub.rahulshettyacademy.com/login";
        const email = "steve.rogers102@outlook.com";
        const password = "steveRogers1#";
        const context = await browser.newContext();
        const page = await context.newPage();
        const pageManager = new PageManager(page);
        await pageManager.loginPage.gotoLoginUrl(url);
        await pageManager.loginPage.login(email, password);
        console.log("User is successfully logged in");

        await use(page);
    },

    bookEvent: async ({ }, use) => {

        const apiContext = await request.newContext();
        const apiUtils = new ApiUtils(apiContext, loginPayload);
        const response = await apiUtils.createOrder(bookingPayload);

        await use(response);
    },

    testDataForOrder : {

        eventTitle: 'IAMGAME Sports Fest - 2026'
    }
});