import React from "react";
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

    return (
        <>
      <div>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
      <button onClick = {this.handleClick}>Add</button>
      </>
    );
  }
}
export default PlayerInput;