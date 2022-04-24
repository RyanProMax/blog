import KmeansWorker from '~/worker/kmeans?worker';

let worker: Worker | null = null;

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

export const useKmeans = async(imageUrl: string, cb: (arg0: any) => void) => {
  const { width, height, imageElement } = await getImageSize(imageUrl);
  const canvas = document.createElement('canvas');
  [canvas.width, canvas.height] = [width, height];
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(imageElement, 0, 0);
  const vectors = getVectors(ctx.getImageData(0, 0, width, height).data);
  if (!worker)
    worker = new KmeansWorker();

  worker.postMessage({
    type: 'kmeans',
    data: vectors
  });

  worker.onmessage = (e) => {
    cb({
      kmeansResult: e.data,
      width,
      height,
      vectors
    });
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

export const updatePixel = ({ vectors, targetIndex, width, height, r, g, b, a }: {
  vectors: number[][]
  targetIndex: number[]
  width: number
  height: number
  r: number
  g: number
  b: number
  a: number
}, cb: (url: string) => void) => {
  if (!worker)
    worker = new KmeansWorker();

  worker.postMessage({
    type: 'updatePixel',
    data: {
      vectors: JSON.stringify(vectors),
      targetIndex: JSON.stringify(targetIndex),
      r,
      g,
      b,
      a
    }
  });

  worker.onmessage = (e) => {
    const url = vectorsToBase64(e.data, width, height);
    cb(url);
  };
};

export const terminateWorker = () => {
  if (worker) {
    worker.terminate();
    worker = null;
  }
};
