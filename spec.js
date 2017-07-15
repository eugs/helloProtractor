describe('homepage', function() {

  var resource = 'https://genius.com/';
  var EC = protractor.ExpectedConditions;


  // var search_form = element(by.xpath('/html/body/div[1]/search-form/form/input'));
  var search_form = element(by.model('search_text'));

  // var song_first = element(by.xpath('//*[@id="main"]/div/ul/li[1]/a'));
var song_first = element(by.css('.song_link'));
var mini_window_link = $('search-result-section div[ng-switch]');
var twitter_icon = $('svg.inline_icon[src="twitter.svg"');
var song_text = $('div .lyrics');

  // var song_text = element(by.xpath('/html/body/routable-page/ng-outlet/song-page/div/div/div[2]/div[1]/div/defer-compile[1]/lyrics/div/section/p'));

  // $('.feed_dropdown-header.feed_dropdown-header--bottom_border');

  // $('a.mini_card[ng-href="https://genius.com/artists/Ed-sheeran"]');

// .feed_dropdown-header.feed_dropdown-header--bottom_border

  beforeEach(function () {
    console.log('\n...');
    browser.get(resource);
  });

  it('should have a proper title', function() {
    expect(browser.getTitle()).toContain('Genius | Song Lyrics & Knowledge');
  });


  it('should find the lyrics', function () {
    // search
    search_form.sendKeys('imagine dragons', protractor.Key.ENTER)

    // click first song
     browser.wait(EC.elementToBeClickable(song_first, 5000));
     song_first.click();

    browser.wait(EC.presenceOf(song_text));
    song_text.getText()
      .then(function (txt) {
        console.log('lyrics: ', txt);
        expect(txt.length > 0);
      });

  });

  it('should open a new twitter tab', function () {

    twitter_icon.click()
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
  });


// regular search
  it('should show artist link as first result in mini-window when search', function () {

    search_form.sendKeys('ed sheeran').click();

    browser.wait(EC.visibilityOf(mini_window_link));
    mini_window_link.click();

    expect(browser.getCurrentUrl()).toEqual('https://genius.com/artists/Ed-sheeran');

  });

});
