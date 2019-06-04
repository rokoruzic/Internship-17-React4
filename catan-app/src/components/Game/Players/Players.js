import React from "react";
import "./Players.css";
import Player from "./Player/Player";
import PlayerInput from "./PlayerInput";
const colors = ["red", "blue", "green", "pink"];
class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: [],
      startPlaying: false,
      counter: 0
    };
  }

  handleClick = value => {
    var newPlayer = {
      name: value,
      id: Math.random(),
      color: colors[this.state.player.length]
    };
    this.setState({ player: this.state.player.concat(newPlayer) });
  };

  handleStartPlaying = () => {
    this.setState({ startPlaying: true });
  };

  handleCounter = () => {
    if (this.state.counter === this.state.player.length - 1)
      this.setState({ counter: 0 });
    else this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    const listItems = this.state.player.map(player => (
      <Player
        id={player.id}
        name={player.name}
        color={player.color}
        key={player.id}
      />
    ));

    var randomizedList = this.state.player.sort(function(a, b) {
      return a.id - b.id;
    });

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
          {this.state.player.length > 0
            ? randomizedList[0 + this.state.counter].name
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
export default Players;
