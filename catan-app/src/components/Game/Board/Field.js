import React from "react";
import { connect } from "react-redux";
import RoadCoords from "./../../../constants/RoadCoords";
import "./Board.css";
import Settlement from "./Settlement";
import Road from "./Road";
import { incrementId, addRoad } from "../../../redux/modules/road";

class Field extends React.Component {
  constructor(props) {
    super(props);
    this.state = { colour: "black" };
  }
  handleClickRoad = e => {
    console.log(this.props.id);
    console.log(RoadCoords[this.props.id]);
    this.setState({ colour: this.props.color });
  };

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
            style={{ backgroundColor: this.state.colour }}
            className="road road-top-right"
            id={0}
            fieldId={this.props.id}
          />
          <Road
            style={{ backgroundColor: this.state.colour }}
            className="road road-right"
            id={1}
            fieldId={this.props.id}
          />
          <Road
            fieldId={this.props.id}

            style={{ backgroundColor: this.state.colour }}

           className="road road-bottom-right" id={2} />
          <Road
            fieldId={this.props.id}

            style={{ backgroundColor: this.state.colour }}
           className="road road-bottom-left" id={3} />
          <Road
            fieldId={this.props.id}

            style={{ backgroundColor: this.state.colour }}
           className="road road-left" id={4} />
          <Road 
            fieldId={this.props.id}

            style={{ backgroundColor: this.state.colour }}
          className="road road-top-left" id={5} />

          <Settlement className="crossroad crossroad-top" id={0} />
          <Settlement className="crossroad crossroad-top-right" id={1} />
          <Settlement className="crossroad crossroad-bottom-right" id={2} />
          <Settlement className="crossroad crossroad-bottom" id={3} />
          <Settlement className="crossroad crossroad-bottom-left" id={4} />
          <Settlement className="crossroad crossroad-top-left" id={5} />

          <div onClick={this.props.handleClick} className="dice-index">
            {this.props.number}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  color: state.road.color
});

const mapDispatchToProps = {
  handleClick: incrementId,
  handleRoadClick: addRoad
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);
