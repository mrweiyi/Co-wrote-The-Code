import { OjClientPage } from './app.po';

describe('oj-client App', () => {
  let page: OjClientPage;

  beforeEach(() => {
    page = new OjClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
