var fs = require('fs');

module.exports = {
  getRootFiles: function () {
    return fs.readdirSync('./');
  },

  getPlaceholders: function () {
    var files = this.getRootFiles();

    return files.filter(function (filename) {
      if (filename.indexOf('placeholder_') !== -1) {
        return filename
      }
    });
  },

  getPackageJson: function () {
    return JSON.parse(fs.readFileSync('./package.json').toString());
  },

  deletePlaceholders: function () {
    var placeholders = this.getPlaceholders();
    var count = placeholders.length;

    return new Promise(function (resolve, reject) {
      if (count) {
        placeholders.forEach(function (filename) {
          fs.unlinkSync(filename);
          count--;

          if (!count) {
            resolve();
          }
        });
      }

      resolve();
    });
  },

  getDimensions: function (filename) {
    return filename.split('_')[1];
  }
};