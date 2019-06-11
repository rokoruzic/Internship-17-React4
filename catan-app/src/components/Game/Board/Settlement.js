import React from "react";
import "./Board.css";
import store from "./../../../redux/index";
import {
  addPlayer,
  editPlayerPoints,
  setPlayerTurn,
  substractPlayerCards,
  editPlayerFirstClick,
  editPlayerSecondClick,
  buySettlement
} from "./../../../redux/modules/player";
import { connect } from "react-redux";
import {
  createFirstSettlement,
  createSecondSettlement,
  toggleSettlementCreate,
  createCity
} from "./../../../redux/modules/game";

class Settlement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVillage: false,
      color: "black",
      isFirstClick: true
    };
  }

  handleClick = async () => {
    const { substractPlayerCards } = this.props;
    const { createFirstSettlement } = this.props;
    const { settlements } = this.props;
    const { editPlayerFirstClick } = this.props;
    const { editPlayerSecondClick } = this.props;
    const {toggleSettlementCreate} = this.props;
    const {buySettlement} = this.props;
    const {createCity} =this.props;

    var currentPlayer = this.props.players.find(
      x => x.id === this.props.currentId
    );
    var settlement = {
      fieldId: this.props.fieldId,
      id: this.props.id,
      playerId: currentPlayer.id,
      color: currentPlayer.color,
      playerTurn: currentPlayer.turn,
      isCity:false
    };

    // var findSettlement = settlements.some(
    //   settlement =>
    //     settlement.id === this.props.id &&
    //     settlement.fieldId === this.props.fieldId
    // );

    if (!currentPlayer.firstClick) {
      createFirstSettlement(settlement);
      var filteredSettlements2 = store
        .getState()
        .game.settlements.filter(function(settlement) {
          return settlement.playerId === currentPlayer.id;
        });

      if (filteredSettlements2.length === 1) {
        editPlayerFirstClick();

        this.setState({
          color: currentPlayer.color
        });
      }
    }

    console.log(currentPlayer);

    if (
      currentPlayer.firstClick &&
      !currentPlayer.secondClick &&
      currentPlayer.turn === 2
    ) {
      createFirstSettlement(settlement);
      var filteredSettlements = store
        .getState()
        .game.settlements.filter(function(settlement) {
          return settlement.playerId === currentPlayer.id;
        });
      console.log(filteredSettlements);

      if (filteredSettlements.length === 2) {
        editPlayerSecondClick();

        this.setState({
          color: currentPlayer.color
        });
      }
    }

    if(currentPlayer.firstClick && currentPlayer.secondClick && currentPlayer.turn>2)
    {
        var findSettlement = settlements.some(
              settlement =>
                settlement.id === this.props.id &&
                settlement.fieldId === this.props.fieldId
            );


      toggleSettlementCreate();

      if(findSettlement)
      {
      if(currentPlayer.rock>2 && currentPlayer.grain >1)
      {
      createCity(settlement);
      this.setState({
        color: currentPlayer.color
      });
      alert("city created")
      }
      else(alert("not enough resources for city"))
    }
      else
      {
      if(currentPlayer.brick>0 && currentPlayer.lumber>0 && currentPlayer.wool>0 && currentPlayer.grain>0)
      {
      createFirstSettlement(settlement);
    

      if(store.getState().game.isSettlementCreated)
      {
        buySettlement(currentPlayer);
      this.setState({
        color: currentPlayer.color
      });
     
    }
   
      else alert("macka")
  }
  else alert("not enough resources")
    
    }

  }

    // if (findSettlement && !currentPlayer.secondClick)
    //   this.setState({
    //     color: currentPlayer.color
    //   });
  };

  render() {
    return (
      <div
        style={{ backgroundColor: this.state.color }}
        onClick={this.handleClick}
        className={this.props.className}
      />
    );
  }
}

const mapDispatchToProps = {
  substractPlayerCards,
  createFirstSettlement,
  editPlayerFirstClick,
  editPlayerSecondClick,
  toggleSettlementCreate,
  buySettlement,
  createCity
};
const mapStateToProps = state => ({
  currentId: state.player.playerTurnId,
  players: state.player.players,
  settlements: state.game.settlements,
  isSettlementCreated:state.game.isSettlementCreated
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settlement);
