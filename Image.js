class Image {
  size;
  provider;
  providers;

  constructor(size, provider) {
    this.size = size;
    this.provider = provider;
    this.providers = {
      DummyImage: {
        getImageUrl: function (size) {
          'use strict';
          return 'https://dummyimage.com/'+size+'/000/fff';
        }
      },
      LoremPicsum: {
        getImageUrl: function (size) {
          'use strict';
          var [width,height]=size.split('x');
          return 'https://picsum.photos/'+width+'/'+height+'/?random';
        }
      },
      FakeImg: {
        getImageUrl: function (size) {
          'use strict';
          var [width,height]=size.split('x');
          return 'https://fakeimg.pl/'+width+'x'+height+'/384f66/ecf0f1/?text=Spaceholder&font=lobster';
        }
      }
    };
  }

  getImageUrl(size) {
    'use strict';
    return this.providers[this.getProvider()].getImageUrl(size);
  }

  setProvider(provider) {
    'use strict';
    this.provider = provider;
  }
  
  getProvider() {
    'use strict';
    if (this.provider==='random') {
      var l=Object.keys(this.providers);
      var i=Math.floor(Math.random()*l.length);
      return l[i];
    }
    return this.provider;
  }
}


module.exports = {
  Image: Image,
  createImage: function(size, provider = 'random') {
    return new Image(size, provider);
  }
}