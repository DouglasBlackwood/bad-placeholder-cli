var fs = require("fs");

module.exports = {
<<<<<<< HEAD
	getRootFiles: function () {
		return fs.readdirSync("./");
	},
=======
	getRootFiles: () => fs.readdirSync("./"),
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7

	getPlaceholders: function () {
		var files = this.getRootFiles();

<<<<<<< HEAD
		return files.filter(function (filename) {
=======
		return files.filter((filename) => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
			if (filename.indexOf("placeholder_") !== -1) {
				return filename;
			}
		});
	},

	deletePlaceholders: function () {
		var placeholders = this.getPlaceholders();
		var count = placeholders.length;

<<<<<<< HEAD
		return new Promise(function (resolve, reject) {
			if (count) {
				placeholders.forEach(function (filename) {
=======
		return new Promise((resolve, reject) => {
			if (count) {
				placeholders.forEach((filename) => {
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
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

<<<<<<< HEAD
	getDimensions: function (filename) {
		return filename.split("_")[1];
	},
=======
	getDimensions: (filename) => filename.split("_")[1],
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
};
