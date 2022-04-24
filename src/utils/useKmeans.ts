import kmeans from 'ml-kmeans';

export const getImageSize = (img: string) => {
  return new Promise<{
    width: number
    height: number
    imageElement: HTMLImageElement
  }>((resolve, reject) => {
    const imageElement = new Image();
    imageElement.src = img;
    imageElement.onload = function() {
      const { width, height } = (this as HTMLImageElement);
      if (width && height)
        resolve({ width, height, imageElement });
      reject(new Error('Get image size failed.'));
    };
    imageElement.onerror = reject;
  });
};

const getVectors = (imageData: Uint8ClampedArray) => {
  const ret = [];
  for (let i = 0; i < imageData.length; i += 4)
    ret.push([imageData[i], imageData[i + 1], imageData[i + 2], imageData[i + 3]]);

  return ret;
};

export const useKmeans = async(imageUrl: string) => {
  const { width, height, imageElement } = await getImageSize(imageUrl);
  const canvas = document.createElement('canvas');
  [canvas.width, canvas.height] = [width, height];
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(imageElement, 0, 0);
  const vectors = getVectors(ctx.getImageData(0, 0, width, height).data);

  return {
    kmeansResult: kmeans(vectors, 4),
    width,
    height,
    vectors
  };
};

export const vectorsToBase64 = (vectors: number[][], width: number, height: number) => {
  const flatVectors = vectors.flat(1);
  const canvas = document.createElement('canvas');
  [canvas.width, canvas.height] = [width, height];
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);
  if (imageData.data.set) {
    imageData.data.set(flatVectors);
  }
  else {
    // IE9
    flatVectors.forEach((val, i) => {
      imageData.data[i] = val;
    });
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};
