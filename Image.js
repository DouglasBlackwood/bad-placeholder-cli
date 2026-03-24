module.exports = {
    list: {
        // DummyImage
        DummyImage: {
            getImageUrl: (imageSize) => "https://dummyimage.com/" + imageSize + "/000/fff",
        },
        // LoremPicsum
        LoremPicsum: {
            getImageUrl: (imageSize) => {
                var tabImageSize = imageSize.split("x");
                return "https://picsum.photos/" + tabImageSize[0] + "/" + tabImageSize[1] + "/?random";
            },
        },
        // PlaceBear
        PlaceBear: {
            getImageUrl: (imageSize) => {

                var tabImageSize = imageSize.split("x");
                return "https://placebear.com/" + tabImageSize[0] + "/" + tabImageSize[1];
            },
        },
    },
    currentProvider: "random",
    getProvider: function () {

        // Select random image provider
        if (this.currentProvider === "random") {
            var tabProvider = Object.keys(this.list);
            var randomNumber = Math.floor(Math.random() * tabProvider.length);
            return tabProvider[randomNumber];
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