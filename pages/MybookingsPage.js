const { expect } = require('@playwright/test');
let bookings;
class MyBookingsPage {

    constructor(page) {
        this.page = page;
        this.bookingCard = page.locator('#booking-card');
        this.clearBookings = page.getByRole('button', { name: "Clear all bookings" });
    }

    async goToBookingUrl(url) {
        await this.page.goto(url);
    }

    async verifyBooking(bookingRef, eventTitle) {
        await this.page.waitForLoadState('networkidle');
        const bookings = await this.bookingCard;
        await expect(this.bookingCard.first()).toBeVisible();
        for (let i = 0; i < await bookings.count(); i++) {
            if (await this.bookingCard.nth(i).locator('.booking-ref').textContent() === bookingRef) {
                await expect(this.bookingCard.nth(i)).toBeVisible();
                await expect(this.bookingCard.nth(i).locator('h3')).toContainText(eventTitle);
                break;
            }
        }
        console.log("Booking reference " + bookingRef + " is verified");
    }

    async viewBooking(bookingRef) {
        await this.page.waitForLoadState('networkidle');
        const bookings = await this.bookingCard.count();
        await expect(this.bookingCard.first()).toBeVisible();
        for (let i = 0; i < await bookings; i++) {
            if (await this.bookingCard.nth(i).locator('.booking-ref').textContent() === bookingRef) {
                await expect(this.bookingCard.nth(i)).toBeVisible();
                await this.bookingCard.nth(i).locator('[href*="/bookings"] button').click();
                await this.page.getByRole('button', { name: 'Back to My Bookings' }).scrollIntoViewIfNeeded();
                await this.page.getByRole('button', { name: 'Back to My Bookings' }).click();
            }
        }
        console.log("Booking with reference " + bookingRef + " is successfully viewed");
    }

    async cancelBooking(bookingRef) {
        await this.page.waitForLoadState('networkidle');
        bookings = await this.bookingCard.count();
        await expect(this.bookingCard.first()).toBeVisible();
        for (let i = 0; i < await bookings; i++) {
            if (await this.bookingCard.nth(i).locator('.booking-ref').textContent() === bookingRef) {
                await expect(this.bookingCard.nth(i)).toBeVisible();
                await this.bookingCard.nth(i).getByTestId('cancel-booking-btn').click();
                await expect(this.page.locator('#modal-title')).toBeVisible();
                await this.page.getByTestId('confirm-dialog-yes').click();
                break;
            }
        }

        await expect(this.bookingCard.first()).toBeVisible();
        for (let i = 0; i < await bookings - 1; i++) {
            if (await this.bookingCard.nth(i).locator('.booking-ref').textContent() === bookingRef) {
            }
        }
        console.log("Booking with booking ref " + bookingRef + " is cancelled");
    }
}

module.exports = { MyBookingsPage };