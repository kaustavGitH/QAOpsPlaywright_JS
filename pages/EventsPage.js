const { expect } = require('@playwright/test');
let bookingDetailsEventPage = {};
class EventsPage{

    constructor(page){
        this.page = page;
        this.searchTxt = page.getByPlaceholder('Search events, venues…');
        this.categoryDropdown = page.locator('select').first();
        this.cityDropdown = page.locator('select').last();
        this.eventCards = page.locator('#event-card');
        this.addEventBtn = page.getByRole("button",{name: 'Add New Event'});
        this.eventCard = page.locator('#event-card');
        this.fullName = page.getByLabel('Full Name');
        this.email = page.locator('#customer-email');
        this.phone = page.locator('#phone');
        this.confirmBtn = page.locator('#confirm-booking');
        this.tickets = page.locator('#ticket-count');
        this.bookingRef = page.locator('.booking-ref');
    }

    async bookEventFomEventPage(event){
        const count = await this.eventCards.count();
        for(let i=0; i<count; i++){
            if(await this.eventCards.nth(i).locator('h3').textContent() === event){
                const seats = (await this.eventCard.nth(i).locator('span.text-xs').last().textContent()).split(/\s+/);
                const seatsBeforeBooking = Number(seats[0]);
                bookingDetailsEventPage.seatsBeforeBooking = seatsBeforeBooking;
                await this.eventCards.nth(i).locator('#book-now-btn').click();
                break;
            }
        }
    }

    async bookTicket(evenTitle, fullname, username, phone){

        const ticketCount = Number(await this.tickets.textContent());
        bookingDetailsEventPage.ticketCount = ticketCount;
        console.log(ticketCount+` Ticket(s) booked for ${evenTitle}`);
        await this.fullName.fill(fullname);
        await this.email.fill(username);
        await this.phone.fill(phone);
        await this.confirmBtn.click();
        await expect(this.page.locator('h3.text-xl')).toContainText("Booking Confirmed");

        await this.bookingRef.isVisible();
        const bookingRef = (await this.bookingRef.textContent()).trim();
        bookingDetailsEventPage.bookingRef = bookingRef;
        console.log(`Ticket booked for ${evenTitle} and booking reference for ${fullname}: `+bookingRef);
        return bookingDetailsEventPage;
    }

    async verifySeats(eventTitle, seatsBeforeBooking){
        let updatedSeats=0, seatsAfterBooking=0;
        do{
            updatedSeats = (await this.eventCard.filter({hasText:eventTitle}).locator('span.text-xs').last().textContent()).split(/\s+/);
            seatsAfterBooking = Number(updatedSeats[0]);
            await this.page.reload({waitUntil:'domcontentloaded'});
        }
        while(seatsAfterBooking === seatsBeforeBooking)

        console.log("Total seats after booking: "+seatsAfterBooking);
        await this.eventCard.filter({hasText:eventTitle}).waitFor();
        await this.eventCard.filter({hasText:eventTitle}).scrollIntoViewIfNeeded();
        expect(seatsAfterBooking).toEqual(seatsBeforeBooking-bookingDetailsEventPage.ticketCount);
        console.log("Total seats available after booking matches with expected number of seats");
    }
}

module.exports = {EventsPage};