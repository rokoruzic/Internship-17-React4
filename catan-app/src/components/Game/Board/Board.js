import React from "react";
import Field from "./Field";
import { BoardNumbers, shuffle, FieldTypes } from "./BoardNumbers";
import "./Board.css";
class Board extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    shuffle(BoardNumbers);
    shuffle(FieldTypes);
    var shuffledBoard = BoardNumbers.map((obj, i) => {
      var rObj = { number: obj, type: FieldTypes[i] };
      return rObj;
    });
    var emptyField = {number:0,type:"white"};
    shuffledBoard.push(emptyField);
    shuffle(shuffledBoard);
     shuffledBoard = shuffledBoard.map((obj, i) => {
      var rObj = {id:i, number: obj.number, type: obj.type };
      return rObj;
    });
   

   
   
    var shuffledBoardPart1 = shuffledBoard.slice(0, 3);
    var shuffledBoardPart2 = shuffledBoard.slice(3, 7);
    var shuffledBoardPart3 = shuffledBoard.slice(7, 12);
    var shuffledBoardPart4 = shuffledBoard.slice(12, 16);
    var shuffledBoardPart5 = shuffledBoard.slice(16, 19);

    var fieldRow1 = shuffledBoardPart1.map((item, index) => {
      return (
        <Field
          key={index}
          id={index}
          type={item.type}
          style={{ borderBottomColor: item.type }}
          number={item.number}
          style2={{ backgroundColor: item.type }}
          style3={{ borderTopColor: item.type }}
        />
      );
    });
    var fieldRow2 = shuffledBoardPart2.map((item, index) => {
      return (
        <Field
          key={index}
          id={index+3}
          type={item.type}


          style={{ borderBottomColor: item.type }}
          number={item.number}
          style2={{ backgroundColor: item.type }}
          style3={{ borderTopColor: item.type }}
        />
      );
    });
    var fieldRow3 = shuffledBoardPart3.map((item, index) => {
      return (
        <Field
          key={index}
          id={index+7}
          type={item.type}

          style={{ borderBottomColor: item.type }}
          number={item.number}
          style2={{ backgroundColor: item.type }}
          style3={{ borderTopColor: item.type }}
        />
      );
    });
    var fieldRow4 = shuffledBoardPart4.map((item, index) => {
      return (
        <Field
          key={index}
          id={index+12}
          type={item.type}

          style={{ borderBottomColor: item.type }}
          number={item.number}
          style2={{ backgroundColor: item.type }}
          style3={{ borderTopColor: item.type }}
        />
      );
    });
    var fieldRow5 = shuffledBoardPart5.map((item, index) => {
      return (
        <Field
          key={index}
          id={index+16}
          type={item.type}

          style={{ borderBottomColor: item.type }}
          number={item.number}
          style2={{ backgroundColor: item.type }}
          style3={{ borderTopColor: item.type }}
        />
      );
    });
    

    return (
      <div className="wrapper">
        <div className="field-row">{fieldRow1}</div>

        <div className="field-row">{fieldRow2}</div>

        <div className="field-row">{fieldRow3}</div>

        <div className="field-row">{fieldRow4}</div>

        <div className="field-row">{fieldRow5}</div>
      </div>
    );
  }
}
export default Board;
