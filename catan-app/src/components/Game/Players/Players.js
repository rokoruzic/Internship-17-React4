import React from "react";
import "./Players.css";
import Player from "./Player/Player";
import PlayerInput from "./PlayerInput";
import { connect } from "react-redux";
import store from "./../../../redux/index";
import {
  addPlayer,
  editPlayerPoints,
  setPlayerTurn,
  substractPlayerCards,
  editPlayerTurn
} from "./../../../redux/modules/player";
import {isDiceRolled,diceRollFalse,startGame} from "./../../../redux/modules/game"
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
      isListReversed: false
    };
  }

  handleClick = value => {
    const { addPlayer } = this.props;
    var newPlayer = {
        name: value,
        id: Math.random(),
        color: colors[this.state.players.length],
        points: 0,
        brick: 0,
        lumber: 0,
        wool: 0,
        rock:0,
        grain: 0,
        turn: 0,
        firstClick: false,
        firstClickRoad: false,
        secondClick: false,
        secondClickRoad: false
    };
    // this.setState({ players: this.state.players.concat(newPlayer) });
    this.setState(state=>({
      ...state,
      players:state.players.concat(newPlayer)
    }))
    addPlayer(newPlayer);
  };

  handleStartPlaying = async () => {
      this.setState({ startPlaying: true });
      const { setPlayerTurn } = this.props;
      const {startGame} = this.props

      await this.setState(state => ({
        ...state,
        players: state.players.sort(function(a, b) {
          return a.id - b.id;
        })
      }));
      var player1 = (this.state.players[0].turn = 1);

      setPlayerTurn(this.state.players[0].id);
      startGame();
  };
  handlePlayerTurn = async () => {
    const { setPlayerTurn } = this.props;
    const { editPlayerPoints } = this.props;
    const { editPlayerTurn } = this.props;
    const {diceRollFalse} =this.props
    diceRollFalse();

    var numberOfClicksOfOneTurn = this.state.players.length - 1;
    if (
      this.state.clickCounter < numberOfClicksOfOneTurn &&
      !this.state.isListReversed
    ) {
      // await this.setState({ clickCounter: this.state.clickCounter + 1 });
      await  this.setState(state=>({
        ...state,
        clickCounter:state.clickCounter+1
      }))
    } else if (this.state.clickCounter === numberOfClicksOfOneTurn) {
      // await this.setState({
      //   players: this.state.players.reverse(),
      //   isListReversed: true,
      //   clickCounter: this.state.clickCounter - 1
      // });
      await  this.setState(state=>({
        ...state,
        players:state.players.reverse(),
        isListReversed:true,
        clickCounter:state.clickCounter-1
      }))
    } else if (this.state.isListReversed) {
      // await this.setState({ clickCounter: this.state.clickCounter - 1 });
      await  this.setState(state=>({
        ...state,
        clickCounter:state.clickCounter-1
      }))

      if (this.state.clickCounter === -2 && !this.state.twoTurnsIsFinished) {
        // await this.setState({
        //   players: this.state.players.reverse(),
        //   twoTurnsIsFinished: true
        // });
        await  this.setState(state=>({
          ...state,
          players:state.players.reverse(),
          twoTurnsIsFinished:true
        }))

        var firstPlayer = this.state.players.shift();
        // await this.setState({
        //   players: this.state.players.concat(firstPlayer)
        // });
        await  this.setState(state=>({
          ...state,
          players:state.players.concat(firstPlayer)
        }))
      }
    }
    if (this.state.counter === this.state.players.length - 1)
      await this.setState({ counter: 0 });
    else
    //  await this.setState({ counter: this.state.counter + 1 });
    await  this.setState(state=>({
      ...state,
      counter:state.counter+1
    }))

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
    var startPlayingElement = store.getState().player.players.length>1 ?  <button onClick={this.handleStartPlaying}>Start playing</button>
    : <div></div>

    var currentPlayer = store.getState().player.players.find(x=>x.id===this.props.playerTurnId);
    console.log(currentPlayer);
      if(currentPlayer)
    var nextElement = (currentPlayer.turn===1 && currentPlayer.firstClick && currentPlayer.firstClickRoad) ||
    (currentPlayer.turn===2 && currentPlayer.secondClick && currentPlayer.secondClickRoad) || (currentPlayer.turn>2 && this.props.diceRolled)? 
    <button
    onClick={this.handlePlayerTurn}
  >
    Next{" "}
  </button> : <div></div>

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
      </div>
    );
  }
}

const mapDispatchToProps = {
  addPlayer,
  editPlayerPoints,
  setPlayerTurn,
  substractPlayerCards,
  editPlayerTurn,
  isDiceRolled,
  diceRollFalse,
  startGame
};
const mapStateToProps = state => ({
  players: state.player.players,
  playerTurnId:state.player.playerTurnId,
  diceRolled : state.game.isDiceRolled
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Players);
