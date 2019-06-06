import React from "react";
import "./Players.css";
import Player from "./Player/Player";
import PlayerInput from "./PlayerInput";
import { connect } from "react-redux";
import {addPlayer, editPlayerPoints,setPlayerTurn,substractPlayerCards} from "./../../../redux/modules/player"
const colors = ["red", "blue", "green", "pink"];

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      startPlaying: false,
      counter: 0
    };
  }

  handleClick = value => {
    const { addPlayer } = this.props;


    var newPlayer = {
      name: value,
      id: Math.random(),
      color: colors[this.state.players.length],
      points:0,
      brick:0,
      lumber:0,
      wool:0,
      grain:0
    };
    this.setState({ players: this.state.players.concat(newPlayer) });
    addPlayer(newPlayer);


  };

  handleStartPlaying = async () => {
    this.setState({ startPlaying: true });
    const { setPlayerTurn } = this.props;


   await this.setState(state => ({
      ...state,
      players: state.players.sort(function(a, b) {
        return a.id - b.id;
     })}))

     setPlayerTurn(this.state.players[0].id)
     console.log(this.state.players[0].id)

  
  };
  handleCounter = () => {
    const { setPlayerTurn } = this.props;
    const { editPlayerPoints } = this.props;


    if (this.state.counter === this.state.players.length - 1)
      this.setState({ counter: 0 });
    else this.setState({ counter: this.state.counter + 1 });


    
    setPlayerTurn(this.state.players[this.state.counter].id)

    editPlayerPoints(3);



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

   

    return (
      <div>
        <div className={this.state.startPlaying ? "hide" : "show"} >
              <PlayerInput  handleClick={ this.handleClick} />
              <div >
                {listItems}
              </div>
              <button onClick={this.handleStartPlaying}  >
                Start  playing
              </button>
        </div>
        
        <div>
          {" "}
          {this.state.players.length > 0
            ? this.state.players[0 + this.state.counter].name
            : "no players"}{" "}
        </div>
        <button
          className={this.state.startPlaying ? "show" : "hide"}
          onClick={this.handleCounter}
        >
          Next{" "}
        </button>
      </div>
    );
  }
}


const mapDispatchToProps = {
  addPlayer,
  editPlayerPoints,
  setPlayerTurn,
  substractPlayerCards

};
const mapStateToProps = state => ({
  players: state.player.players,
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Players);
