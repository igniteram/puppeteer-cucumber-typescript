interface LoginPage {
    url:string;
    loginButton: string;
    googleLoginButton: string;
    email: string;
    password: string;
}

const loginPage: LoginPage = {
    url:'https://staging.yaoe.io',
    loginButton: '.Header_header_launchCTA', 
    googleLoginButton: '.LoginPage_login-page_signinMessage',
    email: '#identifierId',
    password: 'input[name="password"]',
};

export {loginPage};
