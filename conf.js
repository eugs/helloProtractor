exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  multiCapabilities: [
    {
      'browserName' : 'chrome'
    },
    // {
    //   'browserName' : 'firefox'
    // }
  ],

  onPrepare: function () {
      browser.driver.manage().window().setSize(1200, 800);
    },

  specs:
  ['spec.js'],


  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }

};
