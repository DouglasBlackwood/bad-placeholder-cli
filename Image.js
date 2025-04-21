module.exports = {
  providers: {
    DummyImage: {
      getImageUrl: function (size) {
        'use strict';
    
        return 'https://dummyimage.com/' + size + '/000/fff';
      }
    },
    LoremPicsum: {
      getImageUrl: function (size) {
        'use strict';
    
        var pieces = size.split('x');
    
        return 'https://picsum.photos/' + pieces[0] + '/' + pieces[1] + '/?random';
      }
    },
    FakeImg: {
      getImageUrl: function (size) {
        'use strict';
    
        var pieces = size.split('x');
    
        return 'https://fakeimg.pl/' + pieces[0] + 'x' + pieces[1] + '/384f66/ecf0f1/?text=Spaceholder&font=lobster';
      }
    }
  },

  provider: 'random',

  getProvider: function () {
    'use strict';

    if (this.provider === 'random') {

      var providers = Object.keys(this.providers);
      var index = Math.floor(Math.random() * providers.length);

      return providers[index];
    }

    return this.provider;
  },

  setProvider: function (provider) {
    'use strict';

    this.provider = provider;
  },

  getImageUrl: function (size) {
    'use strict';

    return this.providers[this.getProvider()].getImageUrl(size);
  }
};