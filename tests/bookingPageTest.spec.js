const { test, expect, request } = require('@playwright/test');
const { PageManager } = require('../pages/PageManager');
const loginPayload = {email:"steve.rogers102@outlook.com",password:"steveRogers1#"};
const bookingPayload = {customerName:"Steve Rogers",customerEmail:"steve.rogers102@outlook.com",customerPhone:"8451230698",quantity:1,eventId:51};
let authenticationToken;
let bookingRef;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
        {
            data: loginPayload
        }
    );
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    authenticationToken = await loginResponseJson.token;

    const createBookingPayload = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",
        {
            data:bookingPayload,
            headers:{
                'Authorization': 'Bearer ' + authenticationToken,
                'Content-Type': 'application/json'
            }
        }
    );
    expect(createBookingPayload.ok()).toBeTruthy();
    const createBookingPayloadJson = await createBookingPayload.json();
    bookingRef = createBookingPayloadJson.data.bookingRef;
});

test('@Smoke Verify booking in my bookings page', async ({ page }) => {

    page.addInitScript(value =>{
        window.localStorage.setItem('eventhub_token',value);
    },authenticationToken);
    const eventTitle = "IAMGAME Sports Fest - 2026";
    const pageManager = new PageManager(page);
    await pageManager.homePage.gotoHomeUrl("https://eventhub.rahulshettyacademy.com/");
    await pageManager.mastHeader.goToMyBookingsPage();
    await pageManager.bookingsPage.verifyBooking(bookingRef, eventTitle);
});

test('@Smoke View booking details', async({page})=>{

    page.addInitScript(value =>{
        window.localStorage.setItem('eventhub_token',value);
    },authenticationToken);
    const pageManager = new PageManager(page);
    await pageManager.homePage.gotoHomeUrl("https://eventhub.rahulshettyacademy.com/");
    await pageManager.mastHeader.goToMyBookingsPage();
    await pageManager.bookingsPage.viewBooking(bookingRef);
});

test('@Smoke Cancel a booking', async({page})=>{

    test.setTimeout(45000);
    page.addInitScript(value =>{
        window.localStorage.setItem('eventhub_token',value);
    },authenticationToken);
    const pageManager = new PageManager(page);
    await pageManager.homePage.gotoHomeUrl("https://eventhub.rahulshettyacademy.com/");
    await pageManager.mastHeader.goToMyBookingsPage();
    await pageManager.bookingsPage.cancelBooking(bookingRef);
});