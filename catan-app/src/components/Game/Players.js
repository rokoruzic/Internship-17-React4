import React from "react";
import "./Players.css";
class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      player: [],
      startPlaying: false,
      counter: 0
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  handleClick = () => {
    var newPlayer = { name: this.state.value, id: Math.random() };
    this.setState({ player: this.state.player.concat(newPlayer), value: "" });
  };
  handleStartPlaying = () => {
    this.setState({ startPlaying: true });
  };
  handleCounter = () => {
    if(this.state.counter===this.state.player.length-1)
    this.setState({ counter: 0 });
    else
    this.setState({ counter: this.state.counter + 1 });

  };
  render() {
    const listItems = this.state.player.map(player => (
      <li key={player.id}>{player.name}</li>
    ));

    var randomizedList = this.state.player.sort(function(a, b) {
      return a.id - b.id;
    });

    return (
      <div>
        <input
          className={this.state.startPlaying ? "hide" : "show"}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button
          className={this.state.startPlaying ? "hide" : "show"}
          onClick={this.handleClick}
        >
          Add
        </button>
        <div className={this.state.startPlaying ? "hide" : "show"}>
          {listItems}
        </div>
        <button
          onClick={this.handleStartPlaying}
          className={this.state.startPlaying ? "hide" : "show"}
        >
          Start playing
        </button>
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
