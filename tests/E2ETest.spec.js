const { PageManager } = require('../pages/PageManager');
const { customTest } = require('../utils/Fixture');

customTest('EventHub e2e testing using custom fixtures', async({authenticatedPage, bookEvent, testDataForOrder})=>{

    await authenticatedPage.goto("https://eventhub.rahulshettyacademy.com/events");
    const pageManager = new PageManager(authenticatedPage);
    await pageManager.mastHeader.goToMyBookingsPage();
    await pageManager.bookingsPage.verifyBooking(bookEvent.bookingRef, testDataForOrder.eventTitle);
    await pageManager.bookingsPage.viewBooking(bookEvent.bookingRef);
    await pageManager.bookingsPage.cancelBooking(bookEvent.bookingRef);
});