import React from "react";
import "./Board.css";
import RoadCoords from "./../../../constants/RoadCoords";
import { addRoad } from "../../../redux/modules/road";
import { connect } from "react-redux";

class Road extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      road: {}
    };
  }
  handleClick= async () => {
    // console.log(RoadCoords[this.props.fieldId][this.props.id]);
    const { addRoad } = this.props;
    // var neighbourFieldRoadLeft = { roadId: RoadCoords[this.props.fieldId][this.props.id].roadId+1, fieldId:RoadCoords[this.props.fieldId][this.props.id].fieldId}
    // var neighbourFieldRoadRight = { roadId: RoadCoords[this.props.fieldId][this.props.id].roadId-1, fieldId:RoadCoords[this.props.fieldId][this.props.id].fieldId}

    // if(neighbourFieldRoadLeft.roadId===0)
    // neighbourFieldRoadLeft= { roadId:5, fieldId:RoadCoords[this.props.fieldId][this.props.id].fieldId}
    // console.log(neighbourFieldRoadLeft);
    // console.log(neighbourFieldRoadRight)

    // console.log(this.props.fieldId + "," + this.props.id);
    await this.setState(state => ({
      ...state,
      road: { roadId: this.props.id, fieldId: this.props.fieldId,isRoad:true}
  }));
   
  //   var neighbourRight = this.props.roads.filter(road => road.fieldId ===this.props.fieldId).find(road=>road.roadId==this.props.id+1)
  //   if(this.props.id===5)
  //   neighbourRight = this.props.roads.filter(road => road.fieldId ===this.props.fieldId).find(road=>road.roadId===0)

  //   var neighbourLeft = this.props.roads.filter(road => road.fieldId ===this.props.fieldId).find(road=>road.roadId==this.props.id-1)
  //   if(this.props.id===0)
  //   neighbourLeft = this.props.roads.filter(road => road.fieldId ===this.props.fieldId).find(road=>road.roadId===5)

  //   if(neighbourLeft===undefined || neighbourRight===undefined)
  //   alert("no connected roads");
  //   else
    addRoad(this.state.road);

  }
    


  render() {
    return (
      <div
        onClick={this.handleClick}
        className={this.props.className}
        style={this.props.style}
      />
    );
  }
}
const mapDispatchToProps = {
  addRoad
};
const mapStateToProps = state => ({
  roads: state.road.roads,
  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Road);
