exports.decode = (str) => {
  return str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
};