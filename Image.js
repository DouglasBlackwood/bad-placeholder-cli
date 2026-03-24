module.exports = {
    list: {
        // DummyImage
        DummyImage: {
            getImageUrl: (imageSize) => "https://dummyimage.com/" + imageSize + "/000/fff",
        },
        // LoremPicsum
        LoremPicsum: {
            getImageUrl: (imageSize) => {
                var imagesize = { width: imageSize.split("x")[0], height: imageSize.split("x")[1] };
                return "https://picsum.photos/" + imagesize.width + "/" + imagesize.height + "/?random";
            },
        },
        // PlaceBear
        PlaceBear: {
            getImageUrl: (imageSize) => {

                var imagesize = { width: imageSize.split("x")[0], height: imageSize.split("x")[1] };
                return "https://placebear.com/" + imagesize.width + "/" + imagesize.height;
            },
        },
    },
    currentProvider: "random",
    getProvider: function () {

        // Select random image provider
        if (this.currentProvider === "random") {
            var providers = Object.keys(this.list);
            var randomIndex = Math.floor(Math.random() * providers.length);
            return providers[randomIndex];
        }
        return this.currentProvider;
    },
    setProvider: function (currentProvider) {

        this.currentProvider = currentProvider;
    },
    getImageUrl: function (imageSize) {

        return this.list[this.getProvider()].getImageUrl(imageSize);
    },
};