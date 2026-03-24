class Provider {
	constructor(url) {
		this.url = url;
	}

	getImgUrl(s) {
		const [w, h] = s.split("x");
		return this.url.replace("{w}", w).replace("{h}", h);
	}
}

module.exports = {
	list: {
		DummyImage: new Provider("https://dummyimage.com/{w}x{h}/000/fff"),
		LoremPicsum: new Provider("https://picsum.photos/{w}/{h}/?random"),
		PlaceBear: new Provider("https://placebear.com/{w}/{h}"),
	},

	currentProvider: "random",
	getPrvd: function () {
		// Select random image provider
		if (this.currentProvider === "random") {
			const providers = Object.keys(this.list);
			const randomIndex = Math.floor(Math.random() * providers.length);
			return providers[randomIndex];
		}
		return this.currentProvider;
	},
	setPrvd: function (currentProvider) {
		this.currentProvider = currentProvider;
	},
	getImgUrl: function (size) {
		return this.list[this.getPrvd()].getImgUrl(size);
	},
};
