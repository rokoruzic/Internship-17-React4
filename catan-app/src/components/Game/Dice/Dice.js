import React from "react";
import RandomNumber from "./DiceRandomizer"
import "./../Players/Players.css"
import { connect } from "react-redux";
import {throwDice} from "../../../redux/modules/game";

class Dice extends React.Component{
    constructor(props){
        super(props);
        this.state={isRolled:false,
        dice:0}
        
    }
    handleClick =async()=>{
        var {players}=this.props;
        var {settlements}=this.props;
        var {fields}=this.props
        console.log(settlements);
       
        var {throwDice}= this.props;
       await this.setState(state => ({
            dice:RandomNumber(),
            isRolled:true
        }));
        throwDice(this.state.dice);
        var a = this.state.dice
        var rolledFields = fields.filter(function(
            field
          ) {
            return field.number === a;
          });

        var filteredSettlements = [];

        settlements.forEach((item)=>{
            rolledFields.forEach((field)=>{
                if(item.fieldId===field.fieldId)
                filteredSettlements.push(item)
            })
        })
         

        
          
          console.log(filteredSettlements)
    }
    render(){
        return(<div>
            <button onClick={this.handleClick}>ROLL DICE BRATKOTELO</button>
           {this.state.dice} </div>)
    }
}
const mapStateToProps = state => ({
    players: state.player.players,
    settlements:state.game.settlements,
    fields:state.game.fields
  });

  
  const mapDispatchToProps = {
    throwDice
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Dice);