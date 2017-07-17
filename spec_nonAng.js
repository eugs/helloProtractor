describe('test with JS executor', function() {

  var EC = protractor.ExpectedConditions;

  var signUp_btn = $('a[data-element="signup"]');
  var signUp_dialog = $('#signup-dialog-dialog');
  var follow_btn = $('.user-actions-follow-button.js-follow-btn.follow-button');

  beforeEach(function () {
    browser.waitForAngularEnabled(false);
    browser.driver.get('https://twitter.com/coldplay'); // get any twitter account
    console.log("\n...");
  })

  it('should show Sign Up dialog when attempt to follow unauthorized', function () {
    follow_btn.click();
    browser.wait(EC.presenceOf(signUp_dialog));

    // check if we can sign up without any credentials
    signUp_btn.click();

    expect(browser.getTitle()).toEqual('Sign up for Twitter');
    expect(browser.getCurrentUrl()).toEqual('https://twitter.com/signup');
  });

  it('should show Sign Up when attempt to like unauthorized' ,function () {
    // click on any like button
    $('.HeartAnimation').click();

    browser.wait(EC.presenceOf(signUp_dialog));
      // check if we can log in without any credentials
    $('.SignupDialog-signinLink').click();
    expect(browser.getTitle()).toContain('Login on Twitter');
  });

  it('should not log in with empty fields', function () {
    $('#signin-link').click();

    browser.wait(EC.presenceOf($('#signin-dropdown')));
    $('#signin-dropdown input[type="submit"]').click();

    expect($('#message-drawer').getText()).toContain('The username and password you entered did not match our records');
  })

});
