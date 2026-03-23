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
	provider: "random",
	getPrvd: function () {
		
		// Select random image provider
		if (this.provider === "random") {
			var l = Object.keys(this.list);
			var i = Math.floor(Math.random() * l.length);
			return l[i];
		}
		return this.provider;
	},
	setPrvd: function (provider) {
		
		this.prvd = provider;
	},
	getImgUrl: function (size) {
		
		return this.list[this.getPrvd()].getImgUrl(size);
	},
};
