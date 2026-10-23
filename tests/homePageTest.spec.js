const {PageManager} = require('../pages/PageManager');
const {test, expect, request} = require('@playwright/test');
const loginPayload = {email:"steve.rogers102@outlook.com",password:"steveRogers1#"};
let authenticationToken;
test.beforeAll(async()=>{

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
        {
            data: loginPayload
        }
    );
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    authenticationToken = await loginResponseJson.token;
});

test('@Smoke Verify logged in customer email is displayed', async({page})=>{

    page.addInitScript(value =>{
        window.localStorage.setItem('eventhub_token',value);
    },authenticationToken);
    const email = "steve.rogers102@outlook.com";
    const pageManager = new PageManager(page);
    await pageManager.homePage.gotoHomeUrl("https://eventhub.rahulshettyacademy.com/");
    await pageManager.homePage.verifyLoggedInCustomer(email);
});

test('@Smoke Book an event and verify seat reduction', async({page})=>{

    page.addInitScript(value =>{
        window.localStorage.setItem('eventhub_token',value);
    },authenticationToken);
    const eventTitle = "IAMGAME Sports Fest - 2026";
    const fullName = "Steve Rogers";
    const username = "steve.rogers102@outlook.com";
    const phone = "8451230698";
    const pageManager = new PageManager(page);
    await pageManager.homePage.gotoHomeUrl("https://eventhub.rahulshettyacademy.com/");
    const totalSeats = await pageManager.homePage.bookEventFromHomePage(eventTitle);

    await pageManager.eventPage.bookTicket(eventTitle, fullName, username, phone);
    await pageManager.homePage.gotoHomeUrl("https://eventhub.rahulshettyacademy.com/");
    await pageManager.eventPage.verifySeats(eventTitle, totalSeats.seatsBeforeBooking);
});