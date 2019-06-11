 const getRandomInt = ()=> {
    var min = Math.ceil(2);
    var max = Math.floor(13);
    return Math.floor(Math.random() * (max - min)) + 2; 
  }
  export default getRandomInt;