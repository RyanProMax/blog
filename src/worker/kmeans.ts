import kmeans from 'ml-kmeans';

const getVectors = (imageData: Uint8ClampedArray) => {
  const ret = [];
  for (let i = 0; i < imageData.length; i += 4)
    ret.push([imageData[i], imageData[i + 1], imageData[i + 2], imageData[i + 3]]);

  return ret;
};

onmessage = function(e) {
  const { type, data } = e.data;
  switch (type) {
    case 'kmeans': {
      const vectors = getVectors(data);
      const kmeansResult = kmeans(vectors, 4);
      postMessage(kmeansResult);
      break;
    }
    case 'updatePixel': {
      const { r, g, b, a, imageData, targetIndex } = data;
      const vectors = getVectors(imageData);
      targetIndex.forEach((idx: number) => {
        vectors[idx] = [~~r, ~~g, ~~b, ~~(a * 255)];
      });
      postMessage(vectors);
      break;
    }
    default:
  }
};

onerror = function(err) {
  console.error(err);
};
