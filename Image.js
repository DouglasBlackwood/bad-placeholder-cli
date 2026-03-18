module.exports = {
  list: {
    // DummyImage
    DummyImage: {
      getImgUrl: function (s) {
        'use strict';
        return 'https://dummyimage.com/'+s+'/000/fff';
      }
    },
    // LoremPicsum
    LoremPicsum: {
      getImgUrl: function (s) {
        'use strict';
        var s2=s.split('x');
        return 'https://picsum.photos/'+s2[0]+'/'+s2[1]+'/?random';
      }
    },
    // PlaceBear
    PlaceBear: {
      getImgUrl: function (s) {
        'use strict';
        var s2=s.split('x');
        return 'https://placebear.com/'+s2[0]+'/'+s2[1];
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
