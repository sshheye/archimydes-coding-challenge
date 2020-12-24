import { browser, by, element, ElementFinder, promise } from 'protractor';

export class LoginPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText() as Promise<string>;
  }
  getEmailElement(): ElementFinder {
    return element(by.className('email'));
  }

  getPasswordElement(): ElementFinder {
    return element(by.className('password'));
  }

  getSignInButton(): ElementFinder {
    return element(by.className('sign-in-btn'));
  }

  login():promise.Promise<any> {
    this.getEmailElement().sendKeys("test@test.com");
    this.getPasswordElement().sendKeys("test");
    return this.getSignInButton().click();
  }
}
