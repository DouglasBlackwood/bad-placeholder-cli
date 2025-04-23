const fs = require("node:fs");

module.exports = {
	getRootFiles: () => fs.readdirSync("./"),

	getPlaceholders: function () {
		const files = this.getRootFiles();

		return files.filter((filename) => {
			if (filename.indexOf("placeholder_") !== -1) {
				return filename;
			}
		});
	},

	deletePlaceholders: function () {
		const placeholders = this.getPlaceholders();
		let count = placeholders.length;

		return new Promise((resolve, reject) => {
			if (count) {
				for (const filename of placeholders) {
					fs.unlinkSync(filename);
					count--;

					if (!count) {
						resolve();
					}
				}
			}

			resolve();
		});
	},

	getDimensions: (filename) => filename.split("_")[1],
};
