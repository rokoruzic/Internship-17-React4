import React from "react";
import "./Board.css";
import RoadCoords from "./../../../constants/RoadCoords";
import {addPlayer, editPlayerPoints,setPlayerTurn,substractPlayerCards} from "./../../../redux/modules/player";
import { addRoad } from "../../../redux/modules/game";
import {createRoad, addFirstRoad} from "../../../redux/modules/game";
import { connect } from "react-redux";

class Road extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      road: {},
      color:"black"
    };
  }
  handleClick= async () => {
    const { addRoad } = this.props;
    const { createRoad } = this.props;
    const { addFirstRoad } = this.props;
   
    var currentPlayer = this.props.players.find(x=>x.id===this.props.currentPlayerId);

    await this.setState(state => ({
      ...state,
      road: { roadId: this.props.id, fieldId: this.props.fieldId,isRoad:true},
      color:currentPlayer.color
  }));
   
  

    var roadToCreate = {id:this.props.id,fieldId:this.props.fieldId,playerId:this.props.currentPlayerId,color:currentPlayer.color, turn:currentPlayer.turn}
    addFirstRoad(roadToCreate);



  }
    


  render() {
    return (
      <div
        onClick={this.handleClick}
        className={this.props.className}
        style={{ backgroundColor: this.state.color }}
      />
    );
  }
}
const mapDispatchToProps = {
  addRoad,
  createRoad,
  addFirstRoad
};
const mapStateToProps = state => ({
  roads: state.game.roads,
  currentPlayerId :state.player.playerTurnId,
  players: state.player.players,

  
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Road);
