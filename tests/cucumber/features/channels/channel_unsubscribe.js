'use strict'

// You can include npm dependencies for support files in tests/cucumber/package.json
var _ = require('underscore');
// You can use normal require here, cucumber is NOT run in a Meteor context (by design)
var url = require('url');

module.exports = function () {

  this.Given(/^I created channel "([^"]*)" with "([^"]*)"$/, function (title, query) {
    client.executeAsync(function(title, query, done) {
      Meteor.call('/fixtures/addChannel', title, query, done);
    }, title, query);
  });

  this.Given(/^I am subscribed to "([^"]*)"$/, function (title) {
    client.waitForVisible("#channels-list");
    // get an array of the text of all of the channel-row headers and find the index that 'title' exists
    // the nth-child selector doesn't index at 0 so we need to add one to it
    var index = client.getText(".channel-row h4").indexOf(title) + 1;
    
    // We click the subscribe button of the channel
    client.click('.channel-row:nth-child(' + index + ') #subscribe')
    client.waitForVisible('.channel-row:nth-child(' + index + ') #unsubscribe');
  });

  this.When(/^I click on the "([^"]*)" channel\'s unsubscribe button$/, function (title) {
    client.waitForVisible("#channels-list");
    // get an array of the text of all of the channel-row headers and find the index that 'title' exists
    // the nth-child selector doesn't index at 0 so we need to add one to it
    var index = client.getText(".channel-row h4").indexOf(title) + 1;
    
    // We click the unsubscribe button of the 
    client.click('.channel-row:nth-child(' + index + ') #unsubscribe')
  });

  this.Then(/^I should be unsubscribed from "([^"]*)"$/, function (title) {
    client.waitForVisible("#channels-list");
    // get an array of the text of all of the channel-row headers and find the index that 'title' exists
    // the nth-child selector doesn't index at 0 so we need to add one to it
    var index = client.getText(".channel-row h4").indexOf(title) + 1;
    client.waitForVisible('.channel-row:nth-child(' + index + ') #subscribe');
  });

};
