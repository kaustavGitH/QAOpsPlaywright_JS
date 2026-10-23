const { PageManager } = require('../pages/PageManager');
const { test, expect, request } = require('@playwright/test');
const loginPayload = { email: "steve.rogers102@outlook.com", password: "steveRogers1#" };
const bookingPayload = {customerName:"Steve Rogers",customerEmail:"steve.rogers102@outlook.com",customerPhone:"8451230698",quantity:1,eventId:51};
let authenticationToken;
let bookingId;
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
});

test('@Smoke Book an event', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('eventhub_token', value);
    }, authenticationToken);
    const eventTitle = "IAMGAME Sports Fest - 2026";
    const fullName = "Steve Rogers";
    const username = "steve.rogers102@outlook.com";
    const phone = "8451230698";
    const pageManager = new PageManager(page);
    await pageManager.homePage.gotoHomeUrl("https://eventhub.rahulshettyacademy.com/");
    await pageManager.mastHeader.goToEventsPage();
    await pageManager.eventPage.bookEventFomEventPage(eventTitle);
    const bookingDetails = await pageManager.eventPage.bookTicket(eventTitle, fullName, username, phone);
    await pageManager.mastHeader.goToMyBookingsPage();
    await pageManager.bookingsPage.verifyBooking(bookingDetails.bookingRef, eventTitle);
});

test('Sandbox banner visibility with API mocking', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('eventhub_token', value);
    }, authenticationToken);
    const six_events_response = {
        "success": true,
        "data": [
            {
                "id": 285,
                "title": "Dilli Diwali Mela",
                "description": "Celebrate the Festival of Lights at the grandest Diwali Mela in North India. Enjoy 200+ stalls of artisanal crafts, street food, folk performances, fireworks, and cultural showcases spanning three vibrant evenings.",
                "category": "Festival",
                "venue": "Pragati Maidan Exhibition Grounds",
                "city": "Delhi",
                "eventDate": "2026-10-20T17:00:00.000Z",
                "price": "300",
                "totalSeats": 10000,
                "availableSeats": 5573,
                "imageUrl": "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800",
                "isStatic": true,
                "userId": null,
                "createdAt": "2026-09-14T02:39:14.874Z",
                "updatedAt": "2026-10-09T17:17:35.534Z"
            },
            {
                "id": 284,
                "title": "Hollywood Monsoon Night — Los Angeles",
                "description": "An unforgettable evening of live music performed by A-list playback singers under the open Mumbai sky. Featuring chart-toppers from the last three decades with a stunning light show and pyrotechnics.",
                "category": "Concert",
                "venue": "Dome, NSCI SVP Stadium, Worli",
                "city": "Los Angeles",
                "eventDate": "2026-07-11T19:00:00.000Z",
                "price": "2500",
                "totalSeats": 3000,
                "availableSeats": 2772,
                "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
                "isStatic": true,
                "userId": null,
                "createdAt": "2026-09-14T02:39:14.864Z",
                "updatedAt": "2026-10-09T12:53:41.710Z"
            },
            {
                "id": 283,
                "title": "World Tech Summit",
                "description": "A premier technology conference bringing together 500+ industry leaders, startup founders, and engineers for two days of keynotes, workshops, and networking. Topics include AI/ML, cloud infrastructure, DevSecOps, and the future of the Indian tech ecosystem.",
                "category": "Conference",
                "venue": "Hyderabad, Hitech city",
                "city": "Hyderabad",
                "eventDate": "2026-04-18T09:00:00.000Z",
                "price": "1500",
                "totalSeats": 500,
                "availableSeats": 9,
                "imageUrl": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
                "isStatic": true,
                "userId": null,
                "createdAt": "2026-09-14T02:39:14.852Z",
                "updatedAt": "2026-10-03T17:09:35.049Z"
            },
            {
                "id": 16072,
                "title": "TechSparks: The New Tech Order",
                "description": "Emerging tech, AI, robotics, deeptech, climate tech, and startup discovery",
                "category": "Conference",
                "venue": "Taj Yeshwantpur, Bengaluru, Karnataka",
                "city": "Bangalore",
                "eventDate": "2026-12-07T05:44:00.000Z",
                "price": "200",
                "totalSeats": 800,
                "availableSeats": 800,
                "imageUrl": "https://storage.googleapis.com/ticket9-prod.appspot.com/images/TechSparks%202026%3A%20The%20New%20Tech%20Order/65224525/TechSparks%202026%3A%20The%20New%20Tech%20Order_bannerimage.webp",
                "isStatic": false,
                "userId": 29,
                "createdAt": "2026-10-09T17:47:03.927Z",
                "updatedAt": "2026-10-09T17:47:03.927Z"
            },
            {
                "id": 16070,
                "title": "Guns N' Roses Live",
                "description": "The iconic rock band featuring Axl Rose, Slash, and Duff McKagan performs live as part of their world tour.",
                "category": "Concert",
                "venue": "Indira Gandhi Athletic Stadium (Sarusajai) / Veterinary College Field, Guwahati, Assam",
                "city": "Guwahati",
                "eventDate": "2027-02-15T07:41:00.000Z",
                "price": "600",
                "totalSeats": 500,
                "availableSeats": 500,
                "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyUWbd56ysh2LPf3NIbAljh234D6Vj9mvbhrie6zMLxbQD0nNjKu4NjH1Q9fsCf4CBQDI4WdrNcSdA2e8",
                "isStatic": false,
                "userId": 29,
                "createdAt": "2026-10-09T17:42:48.225Z",
                "updatedAt": "2026-10-09T17:42:48.225Z"
            },
            {
                "id": 51,
                "title": "IAMGAME Sports Fest - 2026",
                "description": "Live matches. Big energy. Athlete meet-ups. Interactive experiences. Sports-tech. Food. Music. Come cheer, explore, play and experience the future of Indian sport - all under one roof.",
                "category": "Festival",
                "venue": "Bharat Mandapam, New Delhi",
                "city": "New Delhi",
                "eventDate": "2027-01-16T02:30:00.000Z",
                "price": "1000",
                "totalSeats": 350,
                "availableSeats": 334,
                "imageUrl": "https://cdn.district.in/assets/events/publisher/event_cover_image_horizontal/01KXGNPW0ZE3584BB9VQRTTJQX.jpg",
                "isStatic": false,
                "userId": 29,
                "createdAt": "2026-09-13T17:14:16.976Z",
                "updatedAt": "2026-10-08T17:35:08.125Z"
            }
        ],
        "pagination": {
            "total": 6,
            "page": 1,
            "limit": 12,
            "totalPages": 1
        }
    };

    const five_events_response = {
        "success": true,
        "data": [
            {
                "id": 285,
                "title": "Dilli Diwali Mela",
                "description": "Celebrate the Festival of Lights at the grandest Diwali Mela in North India. Enjoy 200+ stalls of artisanal crafts, street food, folk performances, fireworks, and cultural showcases spanning three vibrant evenings.",
                "category": "Festival",
                "venue": "Pragati Maidan Exhibition Grounds",
                "city": "Delhi",
                "eventDate": "2026-10-20T17:00:00.000Z",
                "price": "300",
                "totalSeats": 10000,
                "availableSeats": 5573,
                "imageUrl": "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800",
                "isStatic": true,
                "userId": null,
                "createdAt": "2026-09-14T02:39:14.874Z",
                "updatedAt": "2026-10-09T17:17:35.534Z"
            },
            {
                "id": 284,
                "title": "Hollywood Monsoon Night — Los Angeles",
                "description": "An unforgettable evening of live music performed by A-list playback singers under the open Mumbai sky. Featuring chart-toppers from the last three decades with a stunning light show and pyrotechnics.",
                "category": "Concert",
                "venue": "Dome, NSCI SVP Stadium, Worli",
                "city": "Los Angeles",
                "eventDate": "2026-07-11T19:00:00.000Z",
                "price": "2500",
                "totalSeats": 3000,
                "availableSeats": 2772,
                "imageUrl": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800",
                "isStatic": true,
                "userId": null,
                "createdAt": "2026-09-14T02:39:14.864Z",
                "updatedAt": "2026-10-09T12:53:41.710Z"
            },
            {
                "id": 283,
                "title": "World Tech Summit",
                "description": "A premier technology conference bringing together 500+ industry leaders, startup founders, and engineers for two days of keynotes, workshops, and networking. Topics include AI/ML, cloud infrastructure, DevSecOps, and the future of the Indian tech ecosystem.",
                "category": "Conference",
                "venue": "Hyderabad, Hitech city",
                "city": "Hyderabad",
                "eventDate": "2026-04-18T09:00:00.000Z",
                "price": "1500",
                "totalSeats": 500,
                "availableSeats": 9,
                "imageUrl": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
                "isStatic": true,
                "userId": null,
                "createdAt": "2026-09-14T02:39:14.852Z",
                "updatedAt": "2026-10-03T17:09:35.049Z"
            },
            {
                "id": 16072,
                "title": "TechSparks: The New Tech Order",
                "description": "Emerging tech, AI, robotics, deeptech, climate tech, and startup discovery",
                "category": "Conference",
                "venue": "Taj Yeshwantpur, Bengaluru, Karnataka",
                "city": "Bangalore",
                "eventDate": "2026-12-07T05:44:00.000Z",
                "price": "200",
                "totalSeats": 800,
                "availableSeats": 800,
                "imageUrl": "https://storage.googleapis.com/ticket9-prod.appspot.com/images/TechSparks%202026%3A%20The%20New%20Tech%20Order/65224525/TechSparks%202026%3A%20The%20New%20Tech%20Order_bannerimage.webp",
                "isStatic": false,
                "userId": 29,
                "createdAt": "2026-10-09T17:47:03.927Z",
                "updatedAt": "2026-10-09T17:47:03.927Z"
            },
            {
                "id": 51,
                "title": "IAMGAME Sports Fest - 2026",
                "description": "Live matches. Big energy. Athlete meet-ups. Interactive experiences. Sports-tech. Food. Music. Come cheer, explore, play and experience the future of Indian sport - all under one roof.",
                "category": "Festival",
                "venue": "Bharat Mandapam, New Delhi",
                "city": "New Delhi",
                "eventDate": "2027-01-16T02:30:00.000Z",
                "price": "1000",
                "totalSeats": 350,
                "availableSeats": 334,
                "imageUrl": "https://cdn.district.in/assets/events/publisher/event_cover_image_horizontal/01KXGNPW0ZE3584BB9VQRTTJQX.jpg",
                "isStatic": false,
                "userId": 29,
                "createdAt": "2026-09-13T17:14:16.976Z",
                "updatedAt": "2026-10-08T17:35:08.125Z"
            }
        ],
        "pagination": {
            "total": 5,
            "page": 1,
            "limit": 12,
            "totalPages": 1
        }
    }
    const pageManager = new PageManager(page);
    await pageManager.homePage.gotoHomeUrl("https://eventhub.rahulshettyacademy.com/");
    await page.route("https://api.eventhub.rahulshettyacademy.com/api/events*",
        async route => {
            let body = JSON.stringify(six_events_response);
            route.fulfill({
                body,
                authorization: 'Bearer ' + authenticationToken
            });
        }
    );
    await pageManager.mastHeader.goToEventsPage();
    expect(await page.getByTestId('event-card').count()).toEqual(6);
    await expect(page.getByText(/sandbox holds up to/i)).toBeVisible();
    await expect(page.getByText(/sandbox holds up to/i)).toContainText('9 bookings');
});

test('Cross-User Booking Access Denied', async ({ page }) => {

    const apiContext = await request.newContext();
    const createBookingPayload = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",
        {
            data: bookingPayload,
            headers: {
                'Authorization': 'Bearer ' + authenticationToken,
                'Content-Type': 'application/json'
            }
        }
    );
    expect(createBookingPayload.ok()).toBeTruthy();
    const createBookingPayloadJson = await createBookingPayload.json();
    bookingId = createBookingPayloadJson.data.id;

    const email = "bruce.banner35@gmail.com";
    const password = "bruceBanner35@";
    const pageManager = new PageManager(page);
    await pageManager.loginPage.gotoLoginUrl("https://eventhub.rahulshettyacademy.com/login");
    await pageManager.loginPage.login(email, password);
    await page.waitForLoadState('networkidle');
    await pageManager.bookingsPage.goToBookingUrl("https://eventhub.rahulshettyacademy.com/bookings/"+bookingId);
    await expect(page.getByText("Access Denied")).toBeVisible();
});