import { LoginPage } from './login.po';
import { browser, logging } from 'protractor';

describe('Stories App', () => {
  let loginPage: LoginPage;
  const EC = browser.ExpectedConditions;
  const baseUrl = browser.baseUrl
  beforeEach(() => {
    loginPage = new LoginPage();
  });

  it('should login as a normal user', () => {
    loginPage.login();
    browser.wait(EC.urlIs(baseUrl + '/user/user-stories/add'));
    expect(browser.getCurrentUrl()).toBe(baseUrl + '/user/user-stories/add');
  });

  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(jasmine.objectContaining({
  //     level: logging.Level.SEVERE,
  //   } as logging.Entry));
  // });
});
