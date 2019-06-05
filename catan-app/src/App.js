import React from 'react';
import Board from "./components/Game/Board/Board";
import Game from "./components/Game/Game";
import {BoardNumbers,shuffle,FieldTypes} from "./components/Game/Board/BoardNumbers"


class  App extends React.Component {
  constructor(props){
    
    super(props);
  }

  render(){
    shuffle(BoardNumbers);
    shuffle(FieldTypes);
    var shuffledBoard = BoardNumbers.map((obj,i) =>{ 
      var rObj = {id:i,number:obj,type:FieldTypes[i]};
      return rObj;
   });
   console.log(shuffledBoard);

    return (
      <Game/>
     );
  }
 
}

export default App;
