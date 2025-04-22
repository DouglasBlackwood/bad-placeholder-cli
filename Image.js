module.exports = {
  providers: {
    // DummyImage
    DummyImage: {
      getImageUrl: function (s) {
        'use strict';
        return 'https://dummyimage.com/'+s+'/000/fff';
      }
    },
    // LoremPicsum
    LoremPicsum: {
      getImageUrl: function (s) {
        'use strict';
        var s2=s.split('x');
        return 'https://picsum.photos/'+s2[0]+'/'+s2[1]+'/?random';
      }
    },
    // FakeImg
    FakeImg: {
      getImageUrl: function (s) {
        'use strict';
        var s2=s.split('x');
        return 'https://fakeimg.pl/'+s2[0]+'x'+s2[1]+'/384f66/ecf0f1/?text=Spaceholder&font=lobster';
      }
    }
  },
  provider: 'random',
  getProvider: function () {
    'use strict';
    // Select random image provider
    if (this.provider==='random') {
      var l=Object.keys(this.providers);
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
    return this.providers[this.getProvider()].getImageUrl(size);
  }
};