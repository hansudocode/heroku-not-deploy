const getImage = (image, size) => {
  // console.log('image', image);
  const newSize = size || 'square';
  return `https://www.cscassets.com/recipes/${newSize}_cknew/${newSize}_${image}.jpg`;
  // return (image.includes('https://') || image.includes('http://')) ?
  //   image
  //   : `http://oit2.scps.nyu.edu/~devereld/intermediate/img/${image}`
}

const decode = (str) => {
  return str && str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
};

export {getImage, decode};