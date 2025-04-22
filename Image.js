module.exports = {
  list: {
    // DummyImage
    DummyImage: {
      getImgUrl: function (size) {
        'use strict';
        return 'https://dummyimage.com/'+size+'/000/fff';
      }
    },
    // LoremPicsum
    LoremPicsum: {
      getImgUrl: function (size) {
        'use strict';
        var [width,height]=size.split('x');
        return 'https://picsum.photos/'+dimensions[0]+'/'+dimensions[1]+'/?random';
      }
    },
    // FakeImg
    FakeImg: {
      getImgUrl: function (size) {
        'use strict';
        var dimensions=size.split('x');
        return 'https://fakeimg.pl/'+dimensions[0]+'x'+dimensions[1]+'/384f66/ecf0f1/?text=Spaceholder&font=lobster';
      }
    }
  },
  prvd: 'random',
  getPrvd: function () {
    'use strict';
    // Select random image provider
    if (this.prvd==='random') {
      var l=Object.keys(this.list);
      var i=Math.floor(Math.random()*l.length);
      return l[i];
    }
    return this.prvd;
  },
  setPrvd: function (prvd) {
    'use strict';
    this.prvd = prvd;
  },
  getImgUrl: function (size) {
    'use strict';
    return this.list[this.getPrvd()].getImgUrl(size);
  }
};