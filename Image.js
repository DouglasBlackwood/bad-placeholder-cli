'use strict';

class Image {
  constructor(provider) {
    this.provider = provider;

    this.providers = {
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
  }

  getImageUrl(size) {
    return this.providers[this.getProvider()].getImageUrl(size);
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
    var providersKeys = Object.keys(this.providers);
    var randomIndex = Math.floor(Math.random() * providersKeys.length);
    
    return providersKeys[randomIndex];
  }
}

module.exports = {
  Image: Image
}
