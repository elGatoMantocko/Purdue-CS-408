'use strict';

// You can include npm dependencies for support files in tests/cucumber/package.json
var _ = require('underscore');
// You can use normal require here, cucumber is NOT run in a Meteor context (by design)
var url = require('url');

module.exports = function () {

  this.When(/^I click on "([^"]*)"/, function(clickableElement) {
    client.waitForExist(".container-fluid", 1000);
    client.waitForVisible(".container-fluid", 1000);

    client.click(clickableElement);
  });

};