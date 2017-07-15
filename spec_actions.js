describe('testing using actions', function () {

  var EC = protractor.ExpectedConditions;
  var mini_window_link = $('search-result-section div[ng-switch]');

  beforeEach(function () {
    console.log('\n...');
    browser.get('https://genius.com/');
  });

  // search via ACTIONS
  it('should navigate with buttons when artist search', function () {

    var search_field = element(by.xpath('/html/body/div[1]/search-form/form/input'));

    browser.actions().mouseMove(search_field).mouseDown().mouseUp().perform();

    // because I can
    browser.actions().keyDown(protractor.Key.SHIFT).sendKeys('p')
      .keyUp(protractor.Key.SHIFT).sendKeys('!nk').perform();

    browser.wait(EC.presenceOf(mini_window_link));

    // browser.sleep(2000);
    browser.actions().sendKeys(protractor.Key.TAB).perform();

    browser.actions().sendKeys(protractor.Key.ENTER).perform()
      .then (function () {
        // browser.sleep(1000);
        expect(browser.getCurrentUrl()).toEqual('https://genius.com/artists/P-nk');

      })

  });

});
