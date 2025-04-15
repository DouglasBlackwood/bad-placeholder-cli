# Bad Placeholder Image Downloader

Download placeholder images from public domain sources blazingly fast.

[Original repository](https://github.com/ecrmnn/spaceholder)

## Installation

```bash
npm ci
```

## Tests

```bash
npm test
```

## Usage

```bash
bad-placeholder
# Downloads 1 image (1024x768px) into current directory
```

```bash
bad-placeholder -n 100
# Downloads 100 images into current directory
```

```bash
bad-placeholder -s 800x600
# Downloads 1 image (800x600px) into current directory
```

```bash
bad-placeholder -n 50 -s 800x600 -p LoremPicsum
# Downloads 50 images (800x600px) from LoremPicsum into current directory
# If no --provider / -p is specified, each image is downloaded from a random provider
```

## Providers / Sources

- [DummyImage](http://dummyimage.com)
- [FakeImg](https://fakeimg.pl/)
- [LoremPicsum](http://picsum.photos)
