var chai = require('chai');
var expect = require('chai').expect;
var execa = require('execa');
var helpers = require('./helpers');

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
