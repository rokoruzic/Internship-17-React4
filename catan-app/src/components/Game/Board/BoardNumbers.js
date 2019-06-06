export var BoardNumbers= [2,12,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11];
export var FieldTypes = ["lime","lime","lime","lime","green","green","green","green","gray", "gray", "gray", "yellow","yellow","yellow","yellow","gold","gold","gold"];
export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }