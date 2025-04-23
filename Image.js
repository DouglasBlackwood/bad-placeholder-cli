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
    // Select random image provider
    if (this.currentProvider==='random') {
      var providersList=Object.keys(this.providers);
      var randomIndexOfProvidersList=Math.floor(Math.random()*providersList.length);
      return providersList[randomIndexOfProvidersList];
    }
    return this.currentProvider;
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