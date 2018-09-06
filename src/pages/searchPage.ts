interface SearchPage {
    url: string;
    searchTextBox: string;
    searchButton: string;
    logo: string;
}

const searchPage: SearchPage = {
    url: 'https://www.google.com',
    searchTextBox: '#lst-ib',
    searchButton: 'input[value="Google Search"]',
    logo: 'div#logocont',
};

export {searchPage};
