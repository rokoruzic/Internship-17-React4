import React from "react";
import RandomNumber from "./DiceRandomizer";
import "./../Players/Players.css";
import { connect } from "react-redux";
import { throwDice,isDiceRolled } from "../../../redux/modules/game";
import SettlementCoords from "../../../constants/SettlementCoords";
import {updatePlayers} from "./../../../redux/modules/player"
import store from "./../../../redux/index"

class Dice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isRolled: false, dice: 0 };
  }
  handleClick = async () => {
    var { players } = this.props;
    var { settlements } = this.props;
    var { fields } = this.props;
    var {updatePlayers}= this.props;
    var {isDiceRolled}=this.props;
    isDiceRolled();

    var { throwDice } = this.props;
    await this.setState(()=> ({
      dice: RandomNumber(),
      isRolled: true
    }));
    throwDice(this.state.dice);
    var a = this.state.dice;
    var rolledFields = fields.filter(function(field) {
      return field.number === a;
    });

    var settlementsToCheck2 = [];

    var settlementsToCheck = [];
    settlements.forEach(item => {
      settlementsToCheck.push({
        settlements: SettlementCoords[item.fieldId][item.id],
        playerId: item.playerId
      });
    });
    settlements.forEach(item => {
      rolledFields.forEach(field => {
        if (item.fieldId === field.fieldId) {
          players.forEach(player => {
            if (player.id === item.playerId) {
              if (field.type === "green"){
                player.lumber += 1;
                if(item.isCity)
                player.lumber += 1;

              }
              if (field.type === "lime")
              {
                player.wool += 1;
                if(item.isCity)
                player.wool += 1;



              }
              if (field.type === "gray") {
                player.rock += 1;
                if(item.isCity)
                player.rock += 1;


              }
              if (field.type === "yellow")
              {
               player.grain += 1;
               if(item.isCity)
               player.grain += 1;


              }
              if (field.type === "gold")
              {
               player.brick += 1;
               if(item.isCity)
               player.brick += 1;


              }
            }
          });
          settlementsToCheck2.push(item);
        }
      });
    });

    for (let i = 0; i < settlementsToCheck.length; i++) {
      for (let j = 0; j < settlementsToCheck[i].settlements.length; j++)
        for (let f = 0; f < rolledFields.length; f++) {
          if (
            settlementsToCheck[i].settlements[j].fieldId ===
            rolledFields[f].fieldId
          ) {
            players.forEach(player => {
              if (player.id === settlementsToCheck[i].playerId) {
                if (rolledFields[f].type === "green") player.lumber += 1;
                if (rolledFields[f].type === "lime") player.wool += 1;
                if (rolledFields[f].type === "gray") player.rock += 1;
                if (rolledFields[f].type === "yellow") player.grain += 1;
                if (rolledFields[f].type === "gold") player.brick += 1;
              }
            });
          }
        }
    }
    updatePlayers(players);
  };
  render() {
    var currentPlayer = store.getState().player.players.find(x=>x.id===this.props.playerTurnId);
    console.log(currentPlayer);
      if(currentPlayer)
    var nextElement =  currentPlayer.turn>2 && !this.props.diceRolled? 
    <button

    onClick={this.handleClick}
  >
    ROLL
  </button> : <div></div>
    return (
      <div>
        {/* {nextElement} */}
        {/* {this.state.dice}{" "} */}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  players: state.player.players,
  settlements: state.game.settlements,
  fields: state.game.fields,
  playerTurnId:state.player.playerTurnId,
  diceRolled :state.game.isDiceRolled
});

const mapDispatchToProps = {
  throwDice,
  updatePlayers,
  isDiceRolled
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dice);
