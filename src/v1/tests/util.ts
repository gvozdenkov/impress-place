export var randomeString = (min: number, max: number, spetialCharecters = '') => {
  var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var randomeLength = Math.floor(Math.random() * (max - min + 1) + min);
  var onlyLetters = !!spetialCharecters;
  var characters = onlyLetters ? letters : `${letters}${spetialCharecters}`;
  var charactersLength = characters.length;
  var counter = 0;

  var result = '';
  while (counter < randomeLength) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
};
