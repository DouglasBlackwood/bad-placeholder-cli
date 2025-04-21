var chai = require('chai');
var expect = require('chai').expect;
var execa = require('execa');
var helpers = require('./helpers');
var Image = require('../image/Image');

describe('Symlink', function () {
  'use strict';

  before(function (done) {
    helpers.deletePlaceholders()
      .then(function (response) {
        done();
      });
  });

  var result;

  before(function (done) {
    execa.shell('npm link')
      .then(function (response) {
        result = response.stdout;
        done();
      })
      .catch(function (error) {
        console.log(error);
        done();
      });
  });

  var result2;

  before(function (done) {
    execa.shell('bad-placeholder')
      .then(function (response) {
        result2 = response.stdout;
        done();
      })
      .catch(function (error) {
        console.log(error);
        done();
      });
  });

  it('should generate one image with default dimensions', function () {
    var dimensions = helpers.getDimensions(helpers.getPlaceholders()[0]);
    expect(dimensions).to.be.equal('1024x768');
  });
});

describe('bad-placeholder -n 3', function () {
  'use strict';

  before(function (done) {
    helpers.deletePlaceholders()
      .then(function (response) {
        done();
      });
  });

  var result;

  before(function (done) {
    execa.shell('node ./index.js -n 3')
      .then(function (response) {
        result = response.stdout;
        done();
      })
      .catch(function (error) {
        console.log(error);
        done();
      });
  });

  it('should generate three images', function () {
    expect(helpers.getPlaceholders().length).to.be.equal(3);
  });

  it('should have default dimensions', function () {
    var dimensions = helpers.getDimensions(helpers.getPlaceholders()[Math.floor(Math.random() * 2) + 0]);
    expect(dimensions).to.be.equal('1024x768');
  });
});

describe('bad-placeholder -s 100x100', function () {
  'use strict';

  before(function (done) {
    helpers.deletePlaceholders()
      .then(function (response) {
        done();
      });
  });

  var result;

  before(function (done) {
    execa.shell('node ./index.js -s 100x100')
      .then(function (response) {
        result = response.stdout;
        done();
      })
      .catch(function (error) {
        console.log(error);
        done();
      });
  });

  it('should generate one image', function () {
    expect(helpers.getPlaceholders().length).to.be.equal(1);
  });

  it('should be 100x100', function () {
    var dimensions = helpers.getDimensions(helpers.getPlaceholders()[0]);
    expect(dimensions).to.be.equal('100x100');
  });
});

for (const provider of ["DummyImage", "LoremPicsum", "FakeImg"]) {
  'use strict';

  describe('bad-placeholder -p ' + provider, function () {
    'use strict';

    before(function (done) {
      helpers.deletePlaceholders()
        .then(function (response) {
          done();
        });
    });

    var result;

    before(function (done) {
      execa.shell('node ./index.js -p ' + provider)
        .then(function (response) {
          result = response.stdout;
          done();
        })
        .catch(function (error) {
          console.log(error);
          done();
        });
    });

    it('should generate one image from specified provider (' + provider + ')', function () {
      expect(helpers.getPlaceholders().length).to.be.equal(1);
    });

    it('should have default dimensions', function () {
      var dimensions = helpers.getDimensions(helpers.getPlaceholders()[0]);
      expect(dimensions).to.be.equal('1024x768');
    });

    after(function (done) {
      helpers.deletePlaceholders()
        .then(function (response) {
          done();
        });
    });
  });
};
