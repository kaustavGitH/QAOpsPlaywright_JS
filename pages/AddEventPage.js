const { expect } = require('@playwright/test')
class AddEventPage{

    constructor(page){
        this.page = page;
        this.eventTitle = page.locator('#event-title-input');
        this.description = page.getByPlaceholder("Describe the event…");
        this.categoryDropdown = page.locator('#category');
        this.city = page.locator('#city');
        this.address = page.getByPlaceholder('Venue name & address');
        this.dateTime = page.getByLabel('Event Date & Time');
        this.eventPrice = page.locator('[id*="price"]');
        this.totalSeats = page.locator('#total-seats');
        this.imageUrl = page.locator('[type="url"]');
        this.addEventBtn = page.getByRole("button", { name: '+ Add Event' });
        this.eventList = page.locator('#event-table-row');
    }

    async gotoAddEventUrl(url){
        await this.page.goto(url);
    }

    async createEvent(eventTitle, eventDes, category, eventLoc, eventAddr, dateTime, price, totalSeats, imageUrl) {
        await this.eventTitle.fill(eventTitle);
        await this.description.fill(eventDes);
        await this.categoryDropdown.selectOption(category);
        await this.city.fill(eventLoc);
        await this.address.fill(eventAddr);
        await this.dateTime.fill(dateTime);
        await this.eventPrice.fill(price);
        await this.totalSeats.fill(totalSeats);
        await this.imageUrl.fill(imageUrl);
        await this.addEventBtn.click();
        console.log(`User has created ${eventTitle} event`);
    }

    async verifyCreatedEvent(searchEvent) {
        const eventListCount = await this.eventList;
        for (let i = 0; i < await eventListCount.count(); ++i) {
            if (await eventListCount.nth(i).locator('td').first().textContent() === searchEvent) {
                console.log("Newly created event is added");
                break;
            }
        }
    }
}
module.exports = {AddEventPage};