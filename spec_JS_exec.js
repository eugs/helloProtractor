describe('test with JS executor', function() {

  it('should have 10 artists in chart', function () {

    browser.get('https://genius.com/#community');

    var className = 'chart_row-number_container chart_row-number_container--large';
    // scroll to the first 10 artists
    script('document.getElementsByClassName("'+ className + '")[0].scrollIntoView();')

    script('return document.getElementsByClassName("'+ className + '")')
      .then(function (artists) {

        expect(artists.length === 10);

        for (var i = 0; i < artists.length; i++) {
            highlight(artists[i]);
            // here we can implement something like checking the artists list etc
        }

      });

  });

  function highlight(element) {
    var previousColor;
    element.getCssValue("backgroundColor")
    .then(function (color) {
      previousColor = color;
    })

    script("arguments[0].style.backgroundColor = 'yellow'", element)
      .then(function () {
        browser.sleep(200);
      })
      .then(function () {
        script("arguments[0].style.backgroundColor = '" + previousColor + "'", element)
        browser.sleep(200);
      });
  }

  function script(code, element) {
    return browser.driver.executeScript(code, element)
  }

});
