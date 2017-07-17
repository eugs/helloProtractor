describe('testing using actions', function () {

  var EC = protractor.ExpectedConditions;
  var key = protractor.Key;

  var search_field = element(by.model('search_text'));
  var mini_window_link = $('search-result-section div[ng-switch]');

  beforeEach(function () {
    console.log('\n...');
    browser.get('https://genius.com/');
  });

  // search via ACTIONS
  it('should navigate with buttons when artist search', function () {
    browser.actions().mouseMove(search_field).mouseDown().mouseUp().perform();
    // because I can
    browser.actions().keyDown(key.SHIFT).sendKeys('p').keyUp(key.SHIFT).sendKeys('!nk').perform();

    browser.wait(EC.presenceOf(mini_window_link));
    // use keys for choose
    browser.actions().sendKeys(key.TAB).sendKeys(key.ENTER).perform()
      .then (function () {
        expect(browser.getCurrentUrl()).toEqual('https://genius.com/artists/P-nk');
      })

  });

});
