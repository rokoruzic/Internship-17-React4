import React from "react";
import "./Board.css";
import {
  addPlayer,
  editPlayerPoints,
  setPlayerTurn,
  substractPlayerCards,
  editPlayerFirstClick
} from "./../../../redux/modules/player";
import { connect } from "react-redux";
import {
  createFirstSettlement,
  createSecondSettlement
} from "./../../../redux/modules/game";

class Settlement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVillage: false,
      color: "pink",
      isFirstClick:true
    };
  }

  handleClick = async () => {
    const { substractPlayerCards } = this.props;
    const { createFirstSettlement } = this.props;
    const { settlements } = this.props;
    const {editPlayerFirstClick} = this.props;

    var cost = {};
    // if(this.state.isVillage)
    cost = { brick: 1, lumber: 1, wool: 1, grain: 1 };
    // substractPlayerCards(cost);
    var currentPlayer = this.props.players.find(
      x => x.id === this.props.currentId
    );
    var settlement = {
      fieldId: this.props.fieldId,
      id: this.props.id,
      playerId: currentPlayer.id,
      color: currentPlayer.color,
      playerTurn: currentPlayer.turn
    };
    createFirstSettlement(settlement);

    var findSettlement = settlements.some(
      settlement =>
        settlement.id === this.props.id &&
        settlement.fieldId === this.props.fieldId
    );
   
    
    if(!currentPlayer.firstClick)
    {
        await this.setState({
            color: currentPlayer.color
          });
        editPlayerFirstClick();

    }


    if (findSettlement )
      this.setState({
        color: currentPlayer.color
      });

   
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
  editPlayerFirstClick
};
const mapStateToProps = state => ({
  currentId: state.player.playerTurnId,
  players: state.player.players,
  settlements: state.game.settlements
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settlement);
