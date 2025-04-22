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
  provider: 'random',
  getProvider: function () {
    'use strict';
    // Select random image provider
    if (this.provider==='random') {
      var l=Object.keys(this.list);
      var i=Math.floor(Math.random()*l.length);
      return l[i];
    }
    return this.provider;
  },
  setProvider: function (provider) {
    'use strict';
    this.provider = provider;
  },
  getImageUrl: function (size) {
    'use strict';
    return this.list[this.getProvider()].getImageUrl(size);
  }
};