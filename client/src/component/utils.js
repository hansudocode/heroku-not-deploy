const getImage = (meta, size) => {
  console.log('meta', meta);
  const newSize = size || 'square';
  const {image, campbellsId} = meta;
  const realImage = campbellsId ? campbellsId : image;
  console.log('image', image);
  return (campbellsId) ?
    `https://www.cscassets.com/recipes/${newSize}_cknew/${newSize}_${realImage}.jpg`
    : `http://oit2.scps.nyu.edu/~devereld/intermediate/img/${realImage}`
}

const decode = (str) => {
  return str && str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
};

export {getImage, decode};