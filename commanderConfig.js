var commander = require("commander");
var image = require("./Image");
// The version should be the same as the package.json version, keep it in sync
module.exports = commander
	.version("1.11.0", "-v, --version")
	.option(
		"-n, --number [integer]",
		"Number of files to generate",
		(numberOfGeneratedFile) => {
			
			var isNumberValid = parseInt(numberOfGeneratedFile);
			// numberOfGeneratedFile should be a valid number
			if (isNaN(isNumberValid)) {
				return 1;
			}
			return isNumberValid;
		},
		1,
	)
	.option(
		"-s, --size [1024x768]",
		"Image size",
		(sizeOfImage) => {
			
			// Check for an "x" in the string
			// and if not, return the default size
			// 1024x768
			if (sizeOfImage.indexOf("x") === -1) {
				return "1024x768";
			}
			return sizeOfImage;
		},
		"1024x768",
	)
	.option(
		"-p, --provider [provider]",
		"Set the image provider; " + Object.keys(image.list).join(", "),
		(provider) => {
			
			// Set image provider
			image.setPrvd(provider);
			return provider;
		},
		image.setPrvd("random"),
	)
	.parse(process.argv);
