import React from "react";
import { connect } from "react-redux";
import "./Board.css";
import Settlement from "./Settlement";
import Road from "./Road";
import { incrementId, addRoad, addFields } from "../../../redux/modules/game";

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "black" };
  }

  componentDidMount() {
    const { addFields } = this.props;
    var fieldToAdd = {
      fieldId: this.props.id,
      number: this.props.number,
      type: this.props.type
    };
    addFields(fieldToAdd);
  }
  render() {
    return (
      <div>
        <div className="field">
          <div>
            <div className="hex-top" style={this.props.style} />
            <div className="hex-middle" style={this.props.style2} />
            <div className="hex-bottom" style={this.props.style3} />
          </div>
          <Road
            style={{ backgroundColor: this.state.color }}
            className="road road-top-right"
            id={0}
            fieldId={this.props.id}
          />
          <Road
            style={{ backgroundColor: this.state.color }}
            className="road road-right"
            id={1}
            fieldId={this.props.id}
          />
          <Road
            fieldId={this.props.id}
            style={{ backgroundColor: this.state.color }}
            className="road road-bottom-right"
            id={2}
          />
          <Road
            fieldId={this.props.id}
            style={{ backgroundColor: this.state.color }}
            className="road road-bottom-left"
            id={3}
          />
          <Road
            fieldId={this.props.id}
            style={{ backgroundColor: this.state.color }}
            className="road road-left"
            id={4}
          />
          <Road
            fieldId={this.props.id}
            style={{ backgroundColor: this.state.color }}
            className="road road-top-left"
            id={5}
          />

          <Settlement
            fieldId={this.props.id}
            className="crossroad crossroad-top"
            id={0}
          />
          <Settlement
            fieldId={this.props.id}
            className="crossroad crossroad-top-right"
            id={1}
          />
          <Settlement
            fieldId={this.props.id}
            className="crossroad crossroad-bottom-right"
            id={2}
          />
          <Settlement
            fieldId={this.props.id}
            className="crossroad crossroad-bottom"
            id={3}
          />
          <Settlement
            fieldId={this.props.id}
            className="crossroad crossroad-bottom-left"
            id={4}
          />
          <Settlement
            fieldId={this.props.id}
            className="crossroad crossroad-top-left"
            id={5}
          />

          <div onClick={this.props.handleClick} className="dice-index">
            {this.props.number}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  color: state.game.color
});

const mapDispatchToProps = {
  handleClick: incrementId,
  handleRoadClick: addRoad,
  addFields: addFields
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);
