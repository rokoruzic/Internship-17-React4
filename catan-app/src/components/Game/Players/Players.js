import React from "react";
import "./Players.css";
import Player from "./Player/Player";
import RandomNumber from "./../Dice/DiceRandomizer"
import PlayerInput from "./PlayerInput";
import { connect } from "react-redux";
import store from "./../../../redux/index";
import RoadCoords from "../../../constants/RoadCoords";
import SettlementCoords from "../../../constants/SettlementCoords";
import {
  addPlayer,
  editPlayerPoints,
  setPlayerTurn,
  editPlayerTurn,
  updatePlayers
} from "./../../../redux/modules/player";
import {
  isDiceRolled,
  diceRollFalse,
  startGame,
  throwDice,
  
} from "./../../../redux/modules/game";
const colors = ["red", "blue", "purple", "pink"];

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      startPlaying: false,
      counter: 0,
      clickCounter: 0,
      twoTurnsIsFinished: false,
      isListReversed: false,
      isRolled: false, dice: 0 
    };
  }

  handleClick =  value => {
   



    const { addPlayer } = this.props;
    var newPlayer = {
      name: value,
      id: Math.random(),
      color: colors[this.state.players.length],
      points: 0,
      brick: 0,
      lumber: 0,
      wool: 0,
      rock: 0,
      grain: 0,
      turn: 0,
      firstClick: false,
      firstClickRoad: false,
      secondClick: false,
      secondClickRoad: false
    };
    this.setState(state => ({
      ...state,
      players: state.players.concat(newPlayer)
    }));
    addPlayer(newPlayer);
  };

  handleStartPlaying = async () => {
    this.setState({ startPlaying: true });
    const { setPlayerTurn } = this.props;
    const { startGame } = this.props;

    await this.setState(state => ({
      ...state,
      players: state.players.sort(function(a, b) {
        return a.id - b.id;
      })
    }));
    var player1 = this.state.players[0];
    player1.turn=1;
    setPlayerTurn(this.state.players[0].id);
    startGame();
  };
  handlePlayerTurn = async () => {
    var { playersFromStore } = this.props;
    var { settlements } = this.props;
    var { fields } = this.props;
    var {updatePlayers}= this.props;
    var {isDiceRolled}=this.props;
    isDiceRolled();
    var { throwDice } = this.props;
     this.setState(()=> ({
      dice: RandomNumber(),
      isRolled: true
    }));
    throwDice(this.state.dice);
    var a = this.state.dice;
    var rolledFields = fields.filter(function(field) {
      return field.number === a;
    });
    console.log(settlements)
 
    var settlementsToCheck2 = [];

    var settlementsToCheck = [];
    settlements.forEach(item => {
      settlementsToCheck.push({
        settlements: SettlementCoords[item.fieldId][item.id],
        playerId: item.playerId,
        isCity: item.isCity
      });
    });

    settlements.forEach(item => {
      rolledFields.forEach(field => {
        if (item.fieldId === field.fieldId) {
          playersFromStore.forEach(player => {
            if (player.id === item.playerId && player.turn >2) {
              if (field.type === "green"){
                player.lumber += 1;
                if(item.isCity)
                player.lumber += 1;

              }
              if (field.type === "lime")
              {
                player.wool += 1;
                if(item.isCity)
                player.wool += 1;



              }
              if (field.type === "gray") {
                player.rock += 1;
                if(item.isCity)
                player.rock += 1;


              }
              if (field.type === "yellow")
              {
               player.grain += 1;
               if(item.isCity)
               player.grain += 1;


              }
              if (field.type === "gold")
              {
               player.brick += 1;
               if(item.isCity)
               player.brick += 1;


              }
            }
          });
          settlementsToCheck2.push(item);
        }
      });
    });

    for (let i = 0; i < settlementsToCheck.length; i++) {
      for (let j = 0; j < settlementsToCheck[i].settlements.length; j++)
        for (let f = 0; f < rolledFields.length; f++) {
          if (
            settlementsToCheck[i].settlements[j].fieldId ===
            rolledFields[f].fieldId
          ) {
            playersFromStore.forEach(player => {
              if (player.id === settlementsToCheck[i].playerId && player.turn >2) {
                if (rolledFields[f].type === "green") 
                {
                    player.lumber += 1 
                    if(settlementsToCheck[i].isCity)
                    player.lumber += 1 

                }
                if (rolledFields[f].type === "lime") 
                {
                  player.wool += 1
                  if(settlementsToCheck[i].isCity)
                  player.wool += 1 
                };
                if (rolledFields[f].type === "gray"){
                 player.rock += 1;
                  if(settlementsToCheck[i].isCity)
                  player.rock += 1 
                }
                if (rolledFields[f].type === "yellow")
                {
                 player.grain += 1;
                 if(settlementsToCheck[i].isCity)
                 player.grain += 1 


                }
                if (rolledFields[f].type === "gold")
                {
                 player.brick += 1;
                 if(settlementsToCheck[i].isCity)
                 player.brick += 1 


                }
              }
            });
          }
        }
    }
    updatePlayers(playersFromStore);
    const { setPlayerTurn } = this.props;
    const { editPlayerTurn } = this.props;
    const { diceRollFalse } = this.props;
    diceRollFalse();

    var numberOfClicksOfOneTurn = this.state.players.length - 1;
    if (
      this.state.clickCounter < numberOfClicksOfOneTurn &&
      !this.state.isListReversed
    ) {
      // await this.setState({ clickCounter: this.state.clickCounter + 1 });
      await this.setState(state => ({
        ...state,
        clickCounter: state.clickCounter + 1
      }));
    } else if (this.state.clickCounter === numberOfClicksOfOneTurn) {
      // await this.setState({
      //   players: this.state.players.reverse(),
      //   isListReversed: true,
      //   clickCounter: this.state.clickCounter - 1
      // });
      await this.setState(state => ({
        ...state,
        players: state.players.reverse(),
        isListReversed: true,
        clickCounter: state.clickCounter - 1
      }));
    } else if (this.state.isListReversed) {
      // await this.setState({ clickCounter: this.state.clickCounter - 1 });
      await this.setState(state => ({
        ...state,
        clickCounter: state.clickCounter - 1
      }));

      if (this.state.clickCounter === -2 && !this.state.twoTurnsIsFinished) {
        // await this.setState({
        //   players: this.state.players.reverse(),
        //   twoTurnsIsFinished: true
        // });
        await this.setState(state => ({
          ...state,
          players: state.players.reverse(),
          twoTurnsIsFinished: true
        }));

        var firstPlayer = this.state.players.shift();
        // await this.setState({
        //   players: this.state.players.concat(firstPlayer)
        // });
        await this.setState(state => ({
          ...state,
          players: state.players.concat(firstPlayer)
        }));
      }
    }
    if (this.state.counter === this.state.players.length - 1)
      await this.setState({ counter: 0 });
    //  await this.setState({ counter: this.state.counter + 1 });
    else
      await this.setState(state => ({
        ...state,
        counter: state.counter + 1
      }));

    setPlayerTurn(this.state.players[this.state.counter].id);

    await editPlayerTurn();
  };

  render() {
    const listItems = this.state.players.map(player => (
      <Player
        id={player.id}
        name={player.name}
        color={player.color}
        key={player.id}
      />
    ));
    var startPlayingElement =
      store.getState().player.players.length > 1 ? (
        <button onClick={this.handleStartPlaying}>Start playing</button>
      ) : (
        <div />
      );

    var currentPlayer = store
      .getState()
      .player.players.find(x => x.id === this.props.playerTurnId);
    console.log(currentPlayer);
    if (currentPlayer)
      var nextElement =
        (currentPlayer.turn === 1 &&
          currentPlayer.firstClick &&
          currentPlayer.firstClickRoad) ||
        (currentPlayer.turn === 2 &&
          currentPlayer.secondClick &&
          currentPlayer.secondClickRoad) ||
        (currentPlayer.turn > 2 ) ? (
          <button onClick={this.handlePlayerTurn}>Next </button>
        ) : (
          <div />
        );

    return (
      <div>
        <div className={this.state.startPlaying ? "hide" : "show"}>
          <PlayerInput handleClick={this.handleClick} />
          <div>{listItems}</div>
          {startPlayingElement}
        </div>

        <div>
          {" "}
          {this.state.players.length > 0
            ? `Player turn: ${this.state.players[0 + this.state.counter].name}`
            : "no players"}{" "}
        </div>
        {nextElement}
        {this.state.dice}
      </div>
    );
  }
}

const mapDispatchToProps = {
  addPlayer,
  editPlayerPoints,
  setPlayerTurn,
  editPlayerTurn,
  isDiceRolled,
  diceRollFalse,
  startGame,
  throwDice,
  updatePlayers,
};
const mapStateToProps = state => ({
  players: state.player.players,
  playerTurnId: state.player.playerTurnId,
  diceRolled: state.game.isDiceRolled,
  playersFromStore: state.player.players,
  settlements: state.game.settlements,
  fields: state.game.fields,
  playerTurnId:state.player.playerTurnId,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Players);
