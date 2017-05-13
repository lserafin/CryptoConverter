import { CryptoConverterPage } from './app.po';

describe('crypto-converter App', () => {
  let page: CryptoConverterPage;

  beforeEach(() => {
    page = new CryptoConverterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
