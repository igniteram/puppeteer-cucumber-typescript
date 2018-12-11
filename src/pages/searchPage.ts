interface SearchPage {
    url: string;
    searchTextBox: string;
    searchButton: string;
    logo: string;
}

const searchPage: SearchPage = {
    url: 'https://www.google.com',
    searchTextBox: 'input[title="Search"]',
    searchButton: 'input[value="Google Search"]',
    logo: '#logo > img',
};

export {searchPage};
