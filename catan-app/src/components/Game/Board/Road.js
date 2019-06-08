import React from "react";
import "./Board.css";
import RoadCoords from "./../../../constants/RoadCoords";
import {addPlayer, editPlayerPoints,setPlayerTurn,substractPlayerCards,editPlayerFirstClickRoad} from "./../../../redux/modules/player";
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
    const {editPlayerFirstClickRoad}=this.props
    const {roads}= this.props
   
    var currentPlayer = this.props.players.find(x=>x.id===this.props.currentPlayerId);
    var roadToCreate = {id:this.props.id,fieldId:this.props.fieldId,playerId:this.props.currentPlayerId,color:currentPlayer.color, turn:currentPlayer.turn}

    
    
    console.log(currentPlayer)
    if(!currentPlayer.firstClickRoad)
    {
      addRoad(roadToCreate);
      editPlayerFirstClickRoad()
    }
    
      
 

  
  }
   


  
    


  render() {
    var currentPlayer = this.props.players.find(x=>x.id===this.props.currentPlayerId);

    const {roads}= this.props

    var findRoad = roads.some(
      road =>
        road.id === this.props.id &&
        road.fieldId === this.props.fieldId && road.playerId=== this.props.currentPlayerId
    );
    if(findRoad)
    {
      this.color=currentPlayer.color
    
    }
    else
    this.color="black"
    return (
      <div
        onClick={this.handleClick}
        className={this.props.className}
        style={{ backgroundColor: this.color }}
      />
    );
  }
}
const mapDispatchToProps = {
  addRoad,
  createRoad,
  addFirstRoad,
  editPlayerFirstClickRoad

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
