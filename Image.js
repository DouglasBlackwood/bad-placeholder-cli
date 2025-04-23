'use strict';

const PROVIDER_NAMES = ['DummyImage', 'LoremPicsum', 'FakeImg'];

const PROVIDERS = {
  DummyImage: {
    getImageUrl: function (size) {
      return 'https://dummyimage.com/'+size+'/000/fff';
    }
  },
  LoremPicsum: {
    getImageUrl: function (size) {
      var [width,height]=size.split('x');
      return 'https://picsum.photos/'+width+'/'+height+'/?random';
    }
  },
  FakeImg: {
    getImageUrl: function (size) {
      var [width,height]=size.split('x');
      return 'https://fakeimg.pl/'+width+'x'+height+'/384f66/ecf0f1/?text=Spaceholder&font=lobster';
    }
  }
};

class Image {
  constructor(provider) {
    this.provider = provider;
  }

  getImageUrl(size) {
    return PROVIDERS[this.getProvider()].getImageUrl(size);
  }

  setProvider(provider) {
    this.provider = provider;
  }
  
  getProvider() {
    if (this.provider === 'random') {
      return this.selectRandomProvider();
    }

    return this.provider;
  }

  selectRandomProvider() {
    var randomIndex = Math.floor(Math.random() * PROVIDER_NAMES.length);
    
    return PROVIDER_NAMES[randomIndex];
  }
}

module.exports = {
  Image: Image,
  PROVIDER_NAMES: PROVIDER_NAMES,
  PROVIDERS: PROVIDERS
}
