class MastHeader{

    constructor(page){
        this.page = page;
        this.home = page.locator('#nav-home');
        this.events = page.locator('#nav-events');
        this.myBookings = page.locator('#nav-bookings');
        this.admin = page.getByRole("button",{name:'Admin'});
        this.manageEvents = page.locator('.absolute [href="/admin/events"]');
        this.manageBookings = page.locator('.absolute [href*="/admin/bookings"]');
    }

    async goToHomePage(){
        await this.home.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goToEventsPage(){
        await this.events.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goToMyBookingsPage(){
        await this.myBookings.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goToManageEventsPage(){
        await this.admin.click();
        await this.manageEvents.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goToManageBookingsPage(){
        await this.admin.click();
        await this.manageBookings.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {MastHeader};