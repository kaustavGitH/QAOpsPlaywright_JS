const {expect} = require('@playwright/test');
let bookingDetailsHomePage = {};
class HomePage{

    constructor(page){
        this.page = page;
        this.header = page.getByText('Featured Events');
        this.customerAccount = page.locator('#user-email-display');
        this.browseEventsBtn = page.locator('[href*="events"]').filter({hasText:'Browse Events'});
        this.myBookings = page.locator('[href*="bookings"] button');
        this.eventCards = page.locator('#event-card');
        this.viewAllBtn = page.locator('[href*="events"]').filter({hasText:'View all'});
    }

    async gotoHomeUrl(url){
        await this.page.goto(url);
    }

    async verifyHomePageTitle(){
        await expect(this.header).toBeVisible();
    }

    async verifyLoggedInCustomer(email){
        await expect(this.customerAccount).toHaveText(email);
    }

    async bookEventFromHomePage(event){
        await this.eventCards.first().scrollIntoViewIfNeeded();
        const count = await this.eventCards.count();
        console.log("Total number of events available to book: "+count);
        for(let i=0; i<count; i++){
            if(await this.eventCards.nth(i).locator('h3').textContent() === event){
                const seats = (await this.eventCards.nth(i).locator('span.text-xs').last().textContent()).split(/\s+/);
                console.log(`Total available seats for ${event}: `+seats);
                const seatsBeforeBooking = Number(seats[0]);
                console.log("Total seats before booking: "+seatsBeforeBooking);
                bookingDetailsHomePage.seatsBeforeBooking = seatsBeforeBooking;
                await this.eventCards.nth(i).locator('#book-now-btn').click();
                break;
            }
        }
    return bookingDetailsHomePage;
    }

}

module.exports = {HomePage};