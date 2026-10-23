const {LoginPage} = require('./LoginPage');
const {AddEventPage} = require('./AddEventPage');
const {HomePage} = require('./HomePage');
const {EventsPage} = require('./EventsPage');
const {MyBookingsPage} = require('./MybookingsPage');
const {MastHeader} = require('./MastHeader');
class PageManager{

    constructor(page){
        this.loginPage = new LoginPage(page);
        this.addEventPage = new AddEventPage(page);
        this.homePage = new HomePage(page);
        this.eventPage = new EventsPage(page);
        this.bookingsPage = new MyBookingsPage(page);
        this.mastHeader = new MastHeader(page);
    }
}
module.exports = {PageManager};