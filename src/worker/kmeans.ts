import kmeans from 'ml-kmeans';

onmessage = function(e) {
  const { type, data } = e.data;
  switch (type) {
    case 'kmeans': {
      const kmeansResult = kmeans(data, 4);
      postMessage(kmeansResult);
      break;
    }
    case 'updatePixel': {
      const { r, g, b, a } = data;
      const vectors = JSON.parse(data.vectors);
      const targetIndex = JSON.parse(data.targetIndex);
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
