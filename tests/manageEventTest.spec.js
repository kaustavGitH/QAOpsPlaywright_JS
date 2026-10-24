const { test, request, expect } = require('@playwright/test');
const { PageManager } = require('../pages/PageManager');
const loginPayload = {email:"steve.rogers102@outlook.com",password:"steveRogers1#"};
let authenticationToken;

test.beforeAll(async()=>{

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext,loginPayload);
    authenticationToken = await apiUtils.login();
});

test('Add a new event', async({page})=>{

    page.addInitScript(value=>{
        window.localStorage.setItem('eventhub_token',value)
    }, authenticationToken);
    const eventTitle = "IAMGAME Sports Fest - 2026";
    const eventDes = "Live matches. Big energy. Athlete meet-ups. Interactive experiences. Sports-tech. Food. Music. Come cheer, explore, play and experience the future of Indian sport - all under one roof.";
    const eventLoc = "New Delhi";
    const eventAddr = "Bharat Mandapam, New Delhi";
    const totalSeats = "350";
    const category = "Festival";
    const dateTime = "2027-01-16T08:00";
    const price = "1000";
    const imageUrl = "https://cdn.district.in/assets/events/publisher/event_cover_image_horizontal/01KXGNPW0ZE3584BB9VQRTTJQX.jpg";
    const url = "https://eventhub.rahulshettyacademy.com/admin/events";

    const pageManager = new PageManager(page);
    await pageManager.addEventPage.gotoAddEventUrl(url);
    await pageManager.addEventPage.createEvent(eventTitle, eventDes, category, eventLoc, eventAddr, dateTime, price, totalSeats, imageUrl);
    await pageManager.addEventPage.verifyCreatedEvent(eventTitle);
});