describe('homepage', function() {

  var resource = 'https://genius.com/';
  var EC = protractor.ExpectedConditions;

  var mini_window_link = $('a.mini_card[ng-href="https://genius.com/artists/Ed-sheeran"]');


  beforeEach(function () {
    console.log('\n...');
  });

  it('should have a proper title', function() {
    browser.get(resource);
    expect(browser.getTitle()).toContain('Genius | Song Lyrics & Knowledge');
  });

  // xit('should search', function () {
  //   // browser.get(resource);
  //
  //   element(by.xpath('//*[@id="search-ip"]')).sendKeys('Kesha');
  //   element(by.css('body')).sendKeys(protractor.Key.ENTER)
  //   // element(by.css('#search-container form input.search-btn')).click();
  //   browser.driver.sleep(3000);
  //
  //     expect(browser.getTitle()).toContain('Song Lyrics | MetroLyrics');
  // });

  it('should search', function () {
    browser.get(resource);

    // search
    element(by.xpath('/html/body/div[1]/search-form/form/input')).sendKeys('p!nk')
    element(by.xpath('/html/body/div[1]/search-form/form/input'))
      .sendKeys(protractor.Key.ENTER)

        .then(function (element) {
          console.log("ENGER");
        })
    // element(by.css('.global_search-submit_button')).click();

     browser.wait(EC.elementToBeClickable
       (element(by.xpath('//*[@id="main"]/div/ul/li[1]/a'))), 5000);

    // click first
    element(by.xpath('//*[@id="main"]/div/ul/li[1]/a')).click();

    browser.wait(EC.presenceOf(element(by.xpath('/html/body/routable-page/ng-outlet/song-page/div/div/div[2]/div[1]/div/defer-compile[1]/lyrics/div/section/p'))));

    element(by.xpath('/html/body/routable-page/ng-outlet/song-page/div/div/div[2]/div[1]/div/defer-compile[1]/lyrics/div/section/p')).getText()
      .then(function (txt) {
        console.log('texttt: ', txt);
        expect(txt.length > 0);
      });

    browser.driver.sleep(3000);

  });

  it('should open a new twitter tab', function () {
    browser.get(resource);

    element(by.css('svg.inline_icon[src="twitter.svg"')).click()
      .then(function () {

        browser.getAllWindowHandles()
          .then(function (handles) {

            //check if opens in new tab
            expect(handles.length > 1);

            browser.switchTo().window(handles[1]);

            browser.driver.getCurrentUrl() // twitter is non-angular

              .then(function (url) {
                console.log("new url: ", url);
                expect(url === 'https://twitter.com/Genius');
                browser.driver.close();
                browser.switchTo().window(handles[0]);
              })

        });

      });

    // expect(browser.getCurrentUrl()).toEqual('https://twitter.com/Genius');

    browser.sleep(5000);

    // browser.window.close();
  });

  it('should show artist link as first result in mini-window when search', function () {


    browser.get(resource);
    element(by.xpath('/html/body/div[1]/search-form/form/input')).sendKeys('ed sheeran').click();

    browser.wait(EC.visibilityOf(mini_window_link));
    mini_window_link.click();

    expect(browser.getCurrentUrl()).toEqual('https://genius.com/artists/Ed-sheeran');

    browser.sleep(4000);

  });

  // it('should navigate with button when artist search', function () {
  //
  //   // var mini_window = $('a.mini_card[ng-href="https://genius.com/artists/Ed-sheeran"]');
  //
  //   browser.get(resource);
  //   var search_field = element(by.xpath('/html/body/div[1]/search-form/form/input'));
  //
  //   driver.actions().mouseMove(search_field).mouseDown().mouseUp().perform();
  //
  //   search_field.sendKeys("p!nk");
  //
  //   browser.wait(EC.visibilityOf(mini_window));
  //   // mini_window.click();
  //
  // driver.actions().sendKeys(Key.TAB).sendKeys(Key.ENTER).perform();
  //
  //   expect(browser.getCurrentUrl()).toEqual('https://genius.com/artists/P-nk');
  //
  //   browser.sleep(4000);
  //
  // });



});
