module.exports = {
	list: {
		// DummyImage
		DummyImage: {
			getImgUrl: (s) => "https://dummyimage.com/" + s + "/000/fff",
		},
		// LoremPicsum
		LoremPicsum: {
			getImgUrl: (s) => {
				
				var s2 = s.split("x");
				return "https://picsum.photos/" + s2[0] + "/" + s2[1] + "/?random";
			},
		},
		// PlaceBear
		PlaceBear: {
			getImgUrl: (s) => {
				
				var s2 = s.split("x");
				return "https://placebear.com/" + s2[0] + "/" + s2[1];
			},
		},
	},
	prvd: "random",
	getPrvd: function () {
		
		// Select random image provider
		if (this.prvd === "random") {
			var objectList = Object.keys(this.list);
			var randomIndex = Math.floor(Math.random() * objectList.length);
			return objectList[randomIndex];
		}
		return this.prvd;
	},
	setPrvd: function (prvd) {
		
		this.prvd = prvd;
	},
	getImgUrl: function (size) {
		
		return this.list[this.getPrvd()].getImgUrl(size);
	},
};
