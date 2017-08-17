import { RcrNationalArchivePage } from './app.po';

describe('rcr-national-archive App', () => {
  let page: RcrNationalArchivePage;

  beforeEach(() => {
    page = new RcrNationalArchivePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
