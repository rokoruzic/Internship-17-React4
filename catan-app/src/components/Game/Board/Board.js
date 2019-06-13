import React from "react";
import Field from "./Field";
import { BoardNumbers, shuffle, FieldTypes } from "./BoardNumbers";
import "./Board.css";
import { connect } from "react-redux";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffledBoard: []
    };
  }

  componentDidMount() {
    shuffle(BoardNumbers);
    shuffle(FieldTypes);
    var boardWithFieldTypesAndNumbers = BoardNumbers.map((obj, i) => {
      var rObj = { number: obj, type: FieldTypes[i] };
      return rObj;
    });
    var emptyField = { number: 7, type: "white" };
    boardWithFieldTypesAndNumbers.push(emptyField);
    shuffle(boardWithFieldTypesAndNumbers);
    var shuffledBoard = boardWithFieldTypesAndNumbers.map((obj, i) => {
      var rObj = { id: i, number: obj.number, type: obj.type };
      return rObj;
    });

    this.setState({
      shuffledBoard: shuffledBoard
    });
  }

  render() {
    var shuffledBoardRow1 = this.state.shuffledBoard.slice(0, 3);
    var shuffledBoardRow2 = this.state.shuffledBoard.slice(3, 7);
    var shuffledBoardRow3 = this.state.shuffledBoard.slice(7, 12);
    var shuffledBoardRow4 = this.state.shuffledBoard.slice(12, 16);
    var shuffledBoardRow5 = this.state.shuffledBoard.slice(16, 19);

    var fieldRow1 = shuffledBoardRow1.map((item, index) => {
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
    var fieldRow2 = shuffledBoardRow2.map((item, index) => {
      return (
        <Field
          key={index}
          id={index + 3}
          type={item.type}
          style={{ borderBottomColor: item.type }}
          number={item.number}
          style2={{ backgroundColor: item.type }}
          style3={{ borderTopColor: item.type }}
        />
      );
    });
    var fieldRow3 = shuffledBoardRow3.map((item, index) => {
      return (
        <Field
          key={index}
          id={index + 7}
          type={item.type}
          style={{ borderBottomColor: item.type }}
          number={item.number}
          style2={{ backgroundColor: item.type }}
          style3={{ borderTopColor: item.type }}
        />
      );
    });
    var fieldRow4 = shuffledBoardRow4.map((item, index) => {
      return (
        <Field
          key={index}
          id={index + 12}
          type={item.type}
          style={{ borderBottomColor: item.type }}
          number={item.number}
          style2={{ backgroundColor: item.type }}
          style3={{ borderTopColor: item.type }}
        />
      );
    });
    var fieldRow5 = shuffledBoardRow5.map((item, index) => {
      return (
        <Field
          key={index}
          id={index + 16}
          type={item.type}
          style={{ borderBottomColor: item.type }}
          number={item.number}
          style2={{ backgroundColor: item.type }}
          style3={{ borderTopColor: item.type }}
        />
      );
    });

    var gameBoard = this.props.isGameStarted ? (
      <div className="wrapper">
        <div className="field-row">{fieldRow1}</div>
        <div className="field-row">{fieldRow2}</div>
        <div className="field-row">{fieldRow3}</div>
        <div className="field-row">{fieldRow4}</div>
        <div className="field-row">{fieldRow5}</div>
      </div>
    ) : (
      <div />
    );

    return <div>{gameBoard}</div>;
  }
}

const mapStateToProps = state => ({
  isGameStarted: state.game.isGameStarted,
  message: state.game.message
});

export default connect(
  mapStateToProps,
  null
)(Board);
