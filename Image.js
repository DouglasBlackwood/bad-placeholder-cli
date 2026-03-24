module.exports = {
	list: {
		// DummyImage
		DummyImage: {
			getImageUrl: (s) => "https://dummyimage.com/" + s + "/000/fff",
		},
		// LoremPicsum
		LoremPicsum: {
			getImageUrl: (s) => {
				
				var s2 = s.split("x");
				return "https://picsum.photos/" + s2[0] + "/" + s2[1] + "/?random";
			},
		},
		// PlaceBear
		PlaceBear: {
			getImageUrl: (s) => {
				
				var s2 = s.split("x");
				return "https://placebear.com/" + s2[0] + "/" + s2[1];
			},
		},
	},
	currentProvider: "random",
	getProvider: function () {
		
		// Select random image provider
		if (this.currentProvider === "random") {
			var l = Object.keys(this.list);
			var i = Math.floor(Math.random() * l.length);
			return l[i];
		}
		return this.currentProvider;
	},
	setProvider: function (currentProvider) {
		
		this.currentProvider = currentProvider;
	},
	getImageUrl: function (size) {
		
		return this.list[this.getProvider()].getImageUrl(size);
	},
};
