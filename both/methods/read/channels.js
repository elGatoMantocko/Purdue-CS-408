Meteor.methods({
  /*
   * Reads a Channel and searches for its images
   *
   * @param {Channel} the Channel object to read
   * @return {Images} an array of image objects
   */
  '/channels/': function(channel, start_page, num_pages) {
    // Check Arguments
    check(channel, Channel);
    check(start_page, Number);
    check(num_pages, Number);
    // Check if the user is logged in? Not sure this is necessary
    // if(!Meteor.user()) throw new Meteor.Error('logged-out','You must be logged in to create a channel.');
    if (!start_page)
      start_page = 0;
    console.log("Number of Pages: " + num_pages);
    if (channel.validate()) {
      images = [];
      for (i = start_page; i < num_pages; i++) {
        console.log("Page #: " + i);
        images = images.concat(Modules.both.getImages(channel, i));
      }
      return images;
    } else {
      channel.throwValidationsException();
    }
  },
  
  getUrls: function(channel, start_page, num_pages) {
    // Check Arguments
    check(channel, Channel);
    check(start_page, Number);
    check(num_pages, Number);

    // Check if the user is logged in? Not sure this is necessary
    // if(!Meteor.user()) throw new Meteor.Error('logged-out','You must be logged in to create a channel.');
    
    if (!start_page)
      start_page = 0;
    if (channel.validate()) {
      images = [];
      for (i = start_page; i < num_pages; i++) {
        images = images.concat(Modules.both.getUrls(channel, i));
      }
      return images;
    } else {
      channel.throwValidationsException();
    }
  }
});
