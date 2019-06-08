import React from "react";
import "./Board.css";
import RoadCoords from "./../../../constants/RoadCoords";
import {addPlayer, editPlayerPoints,setPlayerTurn,substractPlayerCards,editPlayerFirstClickRoad,editPlayerSecondClickRoad} from "./../../../redux/modules/player";
import { addRoad } from "../../../redux/modules/game";
import {createRoad, addFirstRoad} from "../../../redux/modules/game";
import { connect } from "react-redux";
import store from  "./../../../redux/index"


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
    const {editPlayerSecondClickRoad}=this.props

    const {roads}= this.props
   
    var currentPlayer = this.props.players.find(x=>x.id===this.props.currentPlayerId);
    var roadToCreate = {id:this.props.id,fieldId:this.props.fieldId,playerId:this.props.currentPlayerId,color:currentPlayer.color, turn:currentPlayer.turn}

    

    var findRoad = roads.some(
      road =>
        road.id === this.props.id &&
        road.fieldId === this.props.fieldId && road.playerId=== this.props.currentPlayerId
    );

    if(!currentPlayer.firstClickRoad)
    {
    addFirstRoad(roadToCreate);
    var filteredRoads2 = store.getState().game.roads.filter(  function(road) {
      return road.playerId === currentPlayer.id;});



      if(filteredRoads2.length===1)
      {
        editPlayerFirstClickRoad();
  
      this.setState({
          color: currentPlayer.color
        });

    }
  }

    if(currentPlayer.firstClickRoad && !currentPlayer.secondClickRoad && currentPlayer.turn===2)
    {
    console.log("drugi klik")
    addFirstRoad(roadToCreate);
    var filteredRoads = store.getState().game.roads.filter(  function(road) {
        return road.playerId === currentPlayer.id;});



        if(filteredRoads.length===2)
        {
          editPlayerSecondClickRoad();
    
        this.setState({
            color: currentPlayer.color
          });

  

    }




    if(findRoad && !currentPlayer.secondClickRoad)
    {
       this.setState({
        color: currentPlayer.color
      });
    
    }
    
    console.log(currentPlayer)
    
    
      
 

    }
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
  addFirstRoad,
  editPlayerFirstClickRoad,
  editPlayerSecondClickRoad

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
