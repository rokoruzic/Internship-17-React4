import React from "react";
import "./Board.css";
import {addPlayer, editPlayerPoints,setPlayerTurn,substractPlayerCards} from "./../../../redux/modules/player"
import {createSettlement} from "./../../../redux/modules/settlement";
import { connect } from "react-redux";


class Settlement extends React.Component{
    constructor(props){
        super(props)

        this.state=({
            isVillage:false,
            color:"pink"
        })

    };

    handleClick=()=>{
        const {substractPlayerCards} = this.props;
        const {createSettlement} = this.props;

        var cost = {}
        if(this.state.isVillage)
        cost = {brick:1,lumber:1,wool:1,grain:1}
        // this.setState({isVillage:true})
        substractPlayerCards(cost);
        var currentPlayer = this.props.players.find(x=>x.id===this.props.currentId);
        var settlement = {fieldId: this.props.fieldId, id: this.props.id, playerId: currentPlayer.id,color:currentPlayer.color}

        createSettlement(settlement);

        if(2)
        this.setState({
            color:currentPlayer.color
        })






    }
    
    render(){
        return(<div  style={{ backgroundColor: this.state.color }} onClick={this.handleClick} className = {this.props.className}>
        </div>)
    }
}


const mapDispatchToProps = {
   substractPlayerCards,
   createSettlement
  
  };
  const mapStateToProps = state => ({
    currentId: state.player.playerTurnId,
    players: state.player.players,
    
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Settlement);
  