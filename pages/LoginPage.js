class LoginPage{

    constructor(page){
        this.page = page;
        this.header = page.getByText("Sign in to EventHub");
        this.email = page.getByPlaceholder("you@email.com");
        this.password = page.getByPlaceholder("••••••");
        this.signInBtn = page.getByRole('button',{name: 'Sign In'});
        this.register = page.getByRole('link',{name: 'Register'});
    }

    async gotoLoginUrl(url){
        await this.page.goto(url);
    }

    async login(email, password){
        await this.header.waitFor();
        await this.email.fill(email);
        await this.password.fill(password);
        await this.signInBtn.click();
    }

    async register(){
        await this.register.click();
    }
}

module.exports = {LoginPage};