import React from "react";
import "./Board.css";
import store from "./../../../redux/index";
import {
  editPlayerPoints,
  editPlayerFirstSettlementClick,
  editPlayerSecondSettlementClick,
  buySettlement,
  buyCity
} from "./../../../redux/modules/player";
import { connect } from "react-redux";
import {
  createFirstSettlement,
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
  componentDidUpdate() {
    if (this.props.message.lenght > 1) alert(this.props.message);
  }

  handleClick = async () => {
    const { createFirstSettlement } = this.props;
    const { settlements } = this.props;
    const { editPlayerFirstSettlementClick } = this.props;
    const { editPlayerSecondSettlementClick } = this.props;
    const { toggleSettlementCreate } = this.props;
    const { buySettlement } = this.props;
    const { createCity } = this.props;
    const { buyCity } = this.props;
    const { editPlayerPoints } = this.props;

    var currentPlayer = this.props.players.find(
      x => x.id === this.props.currentId
    );
    var settlement = {
      fieldId: this.props.fieldId,
      id: this.props.id,
      playerId: currentPlayer.id,
      color: currentPlayer.color,
      playerTurn: currentPlayer.turn,
      isCity: false
    };

    if (!currentPlayer.firstClick) {
      createFirstSettlement(settlement);
      var filteredSettlements2 = store
        .getState()
        .game.settlements.filter(function(settlement) {
          return settlement.playerId === currentPlayer.id;
        });

      if (filteredSettlements2.length === 1) {
        editPlayerFirstSettlementClick();
        editPlayerPoints();
        this.setState(() => ({
          color: currentPlayer.color
        }));
      }
    }

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

      if (filteredSettlements.length === 2) {
        editPlayerPoints();

        editPlayerSecondSettlementClick();

        this.setState({
          color: currentPlayer.color
        });
      }
    }

    if (
      currentPlayer.firstClick &&
      currentPlayer.secondClick &&
      currentPlayer.turn > 2
    ) {
      var findSettlement = settlements.some(
        settlement =>
          settlement.id === this.props.id &&
          settlement.fieldId === this.props.fieldId
      );

      toggleSettlementCreate();

      if (findSettlement) {
        if (currentPlayer.rock > 2 && currentPlayer.grain > 1) {
          buyCity(settlement);
          editPlayerPoints();
          createCity(settlement);

          this.setState({
            color: currentPlayer.color
          });
          if (currentPlayer.points === 10) alert("Game over");
          alert("city created");
        } else alert("not enough resources for city");
      } else {
        if (
          currentPlayer.brick > 0 &&
          currentPlayer.lumber > 0 &&
          currentPlayer.wool > 0 &&
          currentPlayer.grain > 0
        ) {
          createFirstSettlement(settlement);

          if (store.getState().game.isSettlementCreated) {
            editPlayerPoints();

            buySettlement(currentPlayer);

            this.setState({
              color: currentPlayer.color
            });
            if (currentPlayer.points === 10) alert("Game over");
          } else alert("macka");
        } else alert("not enough resources");
      }
    }
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
  createFirstSettlement,
  editPlayerFirstSettlementClick,
  editPlayerSecondSettlementClick,
  toggleSettlementCreate,
  buySettlement,
  createCity,
  buyCity,
  editPlayerPoints
};
const mapStateToProps = state => ({
  currentId: state.player.playerTurnId,
  players: state.player.players,
  settlements: state.game.settlements,
  isSettlementCreated: state.game.isSettlementCreated,
  message: state.game.message
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settlement);
