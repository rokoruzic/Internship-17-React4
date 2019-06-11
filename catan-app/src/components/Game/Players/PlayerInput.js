import React from "react";
import store from "./../../../redux/index";
class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleClick=()=> {
      this.props.handleClick(this.state.value);
      this.setState({value: ''});
  }

  render() {
    var addElement = this.state.value.length>0 && store.getState().player.players.length<4 ? <div>
       <button onClick = {this.handleClick}>Add</button>
    </div> : <div></div>

    return (
        <>
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
      {addElement}
      </>
    );
  }
}
export default PlayerInput;

