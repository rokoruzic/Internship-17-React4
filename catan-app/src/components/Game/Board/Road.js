import React from "react";
import { connect } from "react-redux";
import store from "../../../redux/index";
import "./Board.css";
import {createFirstRoad,addRoad,toggleRoadCreate} from "./../../../redux/modules/game"
import RoadCoords from "../../../constants/RoadCoords";
import {
  addPlayer,
  editPlayerPoints,
  setPlayerTurn,
  substractPlayerCards,
  editPlayerFirstClickRoad,
  editPlayerSecondClickRoad,
  buyRoad
} from "../../../redux/modules/player";


class Road extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      road: {},
      color: "black"
    };
  }
  componentDidUpdate(){
    if(this.props.message.lenght>1)
    alert(this.props.message)

  }
  handleClick =  async() => {
    const { createFirstRoad } = this.props;
    const { addRoad } = this.props;
    const {toggleRoadCreate} = this.props;
    const {buyRoad}=this.props;


    const { editPlayerFirstClickRoad } = this.props;
    const { editPlayerSecondClickRoad } = this.props;


    const { roads } = this.props;

    var currentPlayer = this.props.players.find(
      x => x.id === this.props.currentPlayerId
    );
    var roadToCreate = {
      id: this.props.id,
      fieldId: this.props.fieldId,
      playerId: this.props.currentPlayerId,
      color: currentPlayer.color,
      turn: currentPlayer.turn
    };
    console.log(createFirstRoad)



    // var findRoad = roads.some(
    //   road =>
    //     road.id === this.props.id &&
    //     road.fieldId === this.props.fieldId &&
    //     road.playerId === this.props.currentPlayerId
    // );

    if (!currentPlayer.firstClickRoad) {

      createFirstRoad(roadToCreate);
      var filteredRoads2 = store.getState().game.roads.filter(function(road) {
        return road.playerId === currentPlayer.id;
      });

      if (filteredRoads2.length === 1) {
        editPlayerFirstClickRoad();

        this.setState({
          color: currentPlayer.color
        });
      }
    }

    if (
      currentPlayer.firstClickRoad &&
      !currentPlayer.secondClickRoad &&
      currentPlayer.turn === 2
    ) {
      createFirstRoad(roadToCreate);
      var filteredRoads = store.getState().game.roads.filter(function(road) {
        return road.playerId === currentPlayer.id;
      });

      if (filteredRoads.length === 2) {
        editPlayerSecondClickRoad();

        this.setState({
          color: currentPlayer.color
        });
      } 

      // if (findRoad && !currentPlayer.secondClickRoad) {
      //   this.setState({
      //     color: currentPlayer.color
      //   });
      // }
    }
    if(currentPlayer.firstClickRoad && currentPlayer.secondClickRoad && currentPlayer.turn>2)
    {

      toggleRoadCreate();
      if(currentPlayer.brick>0 && currentPlayer.lumber>0)
      {
      addRoad(roadToCreate);
    

      if(store.getState().game.isRoadCreated)
      {
        buyRoad(currentPlayer);
      this.setState({
        color: currentPlayer.color
      });
    }
      else alert("macka")
  }
  else alert("not enough resources")
    
    }

  };

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
  createFirstRoad,
  addRoad,
  editPlayerFirstClickRoad,
  editPlayerSecondClickRoad,
  toggleRoadCreate,
  buyRoad
};
const mapStateToProps = state => ({
  roads: state.game.roads,
  currentPlayerId: state.player.playerTurnId,
  players: state.player.players,
  isRoadCreated:state.game.isRoadCreated,
  message:state.game.message
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Road);
