const { test, expect, request } = require('@playwright/test');
const { PageManager } = require('../pages/PageManager');
const { ApiUtils } = require('../utils/ApiUtils');
const loginPayload = {email:"steve.rogers102@outlook.com",password:"steveRogers1#"};
const bookingPayload = {customerName:"Steve Rogers",customerEmail:"steve.rogers102@outlook.com",customerPhone:"8451230698",quantity:1,eventId:51};
let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(bookingPayload);
});

test('@Smoke Verify booking in my bookings page', async ({ page }) => {

    page.addInitScript(value =>{
        window.localStorage.setItem('eventhub_token',value);
    },response.token);
    const eventTitle = "IAMGAME Sports Fest - 2026";
    const pageManager = new PageManager(page);
    await pageManager.homePage.gotoHomeUrl("https://eventhub.rahulshettyacademy.com/");
    await pageManager.mastHeader.goToMyBookingsPage();
    await pageManager.bookingsPage.verifyBooking(response.bookingRef, eventTitle);
});

test('@Smoke View booking details', async({page})=>{

    page.addInitScript(value =>{
        window.localStorage.setItem('eventhub_token',value);
    },response.token);
    const pageManager = new PageManager(page);
    await pageManager.homePage.gotoHomeUrl("https://eventhub.rahulshettyacademy.com/");
    await pageManager.mastHeader.goToMyBookingsPage();
    await pageManager.bookingsPage.viewBooking(response.bookingRef);
});

test('@Smoke Cancel a booking', async({page})=>{

    test.setTimeout(45000);
    page.addInitScript(value =>{
        window.localStorage.setItem('eventhub_token',value);
    },response.token);
    const pageManager = new PageManager(page);
    await pageManager.homePage.gotoHomeUrl("https://eventhub.rahulshettyacademy.com/");
    await pageManager.mastHeader.goToMyBookingsPage();
    await pageManager.bookingsPage.cancelBooking(response.bookingRef);
});