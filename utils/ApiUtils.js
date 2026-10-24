class ApiUtils {

    constructor(apiContext,loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async login() {
        const loginResponse = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
            {
                data: this.loginPayload
            }
        );
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const authenticationToken = await loginResponseJson.token;
        return authenticationToken;
    }

    async createOrder(bookingPayload) {
        let response = {};
        response.token = await this.login();
        const createBookingPayload = await this.apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",
            {
                data: bookingPayload,
                headers: {
                    'Authorization': 'Bearer ' + response.token,
                    'Content-Type': 'application/json'
                }
            }
        );
        expect(createBookingPayload.ok()).toBeTruthy();
        const createBookingPayloadJson = await createBookingPayload.json();
        response.bookingRef = createBookingPayloadJson.data.bookingRef;
        response.bookingId = createBookingPayloadJson.data.id;
        return response;
    }
}

module.exports = {ApiUtils};