import React from "react";
class PlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", player: [] };
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  handleClick = () => {
    this.setState({ player: this.state.player.concat(this.state.value), value:"" },);
  };
  handleStartPlaying=()=>{
  
  };
  render() {
    const listItems = this.state.player.map((player) => <li key={player}>{player}</li>);
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>Add</button>
        
        <div>{listItems}</div>
        <button onClick={this.handleStartPlaying} >Start playing</button>
      </div>
    );
  }
}
export default PlayerForm;
