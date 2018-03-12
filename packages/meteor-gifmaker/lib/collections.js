//from https://github.com/CollectionFS/Meteor-CollectionFS

Images = new FS.Collection('Images', {
    stores: [new FS.Store.GridFS('Images')],
    filter: {
        maxSize: 5000000, 
        allow: {
            contentTypes: ['image/*']
        },
        onInvalid: function (message) {
            console.log(message);
        }
    }
});

Images.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  },
  download: function() {
    return true;
  }
});

