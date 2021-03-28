const { gridSquareImageDimention } = require("../config/const");

const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(gridSquareImageDimention, gridSquareImageDimention);
const context = canvas.getContext("2d");

const drawOnDestination = async (image, destinationX, destinationY) => {
  const loadedImage = await loadImage(image.imageURL);
  let sourceImageDimention;
  let rest;
  let sourceX;
  let sourceY;
  if (loadedImage.width > loadedImage.height) {
    sourceImageDimention = loadedImage.height;
    rest = loadedImage.width - sourceImageDimention;
    sourceX = rest / 2;
    sourceY = 0;
  } else {
    sourceImageDimention = loadedImage.width;
    rest = loadedImage.height - sourceImageDimention;
    sourceX = 0;
    sourceY = rest / 2;
  }
  context.drawImage(
    loadedImage,
    sourceX,
    sourceY,
    sourceImageDimention,
    sourceImageDimention,
    destinationX,
    destinationY,
    gridSquareImageDimention/3,
    gridSquareImageDimention/3
  );
}

module.exports = async (res, images = []) => {
  images.sort((left, right) => left.position - right.position);
  let destinationX = 0;
  let destinationY = 0;
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    destinationX = parseInt(i % 3) * parseInt(gridSquareImageDimention/3);
    destinationY = parseInt(i / 3) * parseInt(gridSquareImageDimention/3);
    await drawOnDestination(image, destinationX, destinationY);
  }
  const data = canvas.toDataURL();
  return res.json({
    gridImage: data,
    items: images
  });
}


