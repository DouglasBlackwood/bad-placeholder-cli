module.exports = {
	list: {
		// DummyImage
		DummyImage: {
<<<<<<< HEAD
			getImgUrl: function (s) {
				"use strict";
				return "https://dummyimage.com/" + s + "/000/fff";
			},
		},
		// LoremPicsum
		LoremPicsum: {
			getImgUrl: function (s) {
				"use strict";
=======
			getImgUrl: (s) => "https://dummyimage.com/" + s + "/000/fff",
		},
		// LoremPicsum
		LoremPicsum: {
			getImgUrl: (s) => {
				
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
				var s2 = s.split("x");
				return "https://picsum.photos/" + s2[0] + "/" + s2[1] + "/?random";
			},
		},
		// PlaceBear
		PlaceBear: {
<<<<<<< HEAD
			getImgUrl: function (s) {
				"use strict";
=======
			getImgUrl: (s) => {
				
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
				var s2 = s.split("x");
				return "https://placebear.com/" + s2[0] + "/" + s2[1];
			},
		},
	},
	prvd: "random",
	getPrvd: function () {
<<<<<<< HEAD
		"use strict";
=======
		
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
		// Select random image provider
		if (this.prvd === "random") {
			var l = Object.keys(this.list);
			var i = Math.floor(Math.random() * l.length);
			return l[i];
		}
		return this.prvd;
	},
	setPrvd: function (prvd) {
<<<<<<< HEAD
		"use strict";
		this.prvd = prvd;
	},
	getImgUrl: function (size) {
		"use strict";
=======
		
		this.prvd = prvd;
	},
	getImgUrl: function (size) {
		
>>>>>>> 248ffcdc50c6d7af5640eb076f71251038b62ba7
		return this.list[this.getPrvd()].getImgUrl(size);
	},
};
