module.exports = {
  providers: {
    // DummyImage
    DummyImage: {
      getImageUrl: function (size) {
        'use strict';
        return 'https://dummyimage.com/'+size+'/000/fff';
      }
    },
    // LoremPicsum
    LoremPicsum: {
      getImageUrl: function (size) {
        'use strict';
        var [width,height]=size.split('x');
        return 'https://picsum.photos/'+width+'/'+height+'/?random';
      }
    },
    // FakeImg
    FakeImg: {
      getImageUrl: function (size) {
        'use strict';
        var [width,height]=size.split('x');
        return 'https://fakeimg.pl/'+width+'x'+height+'/384f66/ecf0f1/?text=Spaceholder&font=lobster';
      }
    }
  },
  currentProvider: 'random',
  getProvider: function () {
    'use strict';
    return this.currentProvider === 'random' ? this.getRandomProvider() : this.currentProvider;
  },
  getRandomProvider: function () {
    'use-strict';
    // Select random image provider
      var providerNames=Object.keys(this.providers);
      var randomIndexOfProviderNames=Math.floor(Math.random()*providerNames.length);
      return providerNames[randomIndexOfProviderNames];
  },
  setProvider: function (provider) {
    'use strict';
    this.currentProvider = provider;
  },
  getImageUrl: function (size) {
    'use strict';
    return this.providers[this.getProvider()].getImageUrl(size);
  }
};