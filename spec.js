describe('homepage', function() {

  var resource = 'https://genius.com/';
  var EC = protractor.ExpectedConditions;

  var mini_window_link = $('search-result-section div[ng-switch]');

  // $('.feed_dropdown-header.feed_dropdown-header--bottom_border');

  // $('a.mini_card[ng-href="https://genius.com/artists/Ed-sheeran"]');

// .feed_dropdown-header.feed_dropdown-header--bottom_border

  beforeEach(function () {
    console.log('\n...');
    // browser.get(resource);
  });

  xit('should have a proper title', function() {
    expect(browser.getTitle()).toContain('Genius | Song Lyrics & Knowledge');
  });

  xit('should search', function () {
    // browser.get(resource);

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

  xit('should open a new twitter tab', function () {
    // browser.get(resource);

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


// regular search
  xit('should show artist link as first result in mini-window when search', function () {

    // browser.get(resource);
    element(by.xpath('/html/body/div[1]/search-form/form/input')).sendKeys('ed sheeran').click();

    browser.wait(EC.visibilityOf(mini_window_link));
    mini_window_link.click();

    expect(browser.getCurrentUrl()).toEqual('https://genius.com/artists/Ed-sheeran');

    browser.sleep(4000);

  });

  // search via actions
  xit('should navigate with button when artist search', function () {

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


it('should have 10 artists in chart', function () {
  browser.get('https://genius.com/#community');
  // browser.sleep(4000);

  var className = 'chart_row-number_container chart_row-number_container--large';

  var scrollToScript = 'document.getElementsByClassName("'+
  className + '")[0].scrollIntoView();';

  browser.driver.executeScript(scrollToScript);

  // var red = 'document.getElementsByClassName("'+
  // className + '")[0].style.backgroundColor = "red";';

  var top = 'return document.getElementsByClassName("'+
  className + '")';

  browser.driver.executeScript(top)
    .then(function (values) {
      for (var i = 0; i < values.length; i++) {
          highlight(values[i]);
      }
    })


  // element.all(by.css('.chart_row-number_container.chart_row-number_container--large'))
  //   .then(function (elem) {
  //     elem[0].setAttribute('style', 'background: red').
  //       then(function (str) {
  //         console.log("itemstyle: ", str);
  //       })
  //     // highlight(item[0]);
  //   })

    browser.sleep(1000);

});



  function highlight(element) {

    browser.driver.executeScript
    ("arguments[0].style.backgroundColor = 'red'", element)
      .then(function () {
        browser.sleep(500);
      })
      // .then(function () {
      //   browser.driver.executeScript
      //   ("arguments[0].style.backgroundColor = ''", element)
      //   browser.sleep(500);
      // });

      .then(function () {
        script("arguments[0].style.backgroundColor = ''", element)
        browser.sleep(500);
      });


    // var bg_save =



      // var bg;
      // console.log("element: ", element.style.backgroundColor);
      // element.style.backgroundColor = "red";
      // console.log("element: ", element.style.backgroundColor);




      // return el.getCssValue("backgroundColor").then(function (col) {
      //     bg = col;
      // }).then(function () {
      //     return driver.executeScript("arguments[0].style.backgroundColor = '" + "red" + "'", el)
      // }).then(function () {
      //     return driver.sleep(1000);
      // }).then(function () {
      //     console.log('bg', bg);
      //     return driver.executeScript("arguments[0].style.backgroundColor = '" + bg + "'", el);
      // }).then(function () {
      //     return driver.sleep(1000);
      // })
  }

  function script(code, element) {
    return browser.driver.executeScript(code, element)
  }


});
