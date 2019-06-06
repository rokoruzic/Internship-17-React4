import React from "react";
import "./Board.css";
import {addPlayer, editPlayerPoints,setPlayerTurn,substractPlayerCards} from "./../../../redux/modules/player"
import { connect } from "react-redux";


class Settlement extends React.Component{
    constructor(props){
        super(props)

        this.state=({
            isVillage:false
        })

    };

    handleClick=()=>{
        const {substractPlayerCards} = this.props;
        var cost = {}
        if(this.state.isVillage)
        cost = {brick:1,lumber:1,wool:1,grain:1}
        // this.setState({isVillage:true})
        substractPlayerCards(cost);

    }
    
    render(){
        return(<div onClick={this.handleClick} className = {this.props.className}>
        </div>)
    }
}


const mapDispatchToProps = {
   substractPlayerCards
  
  };
//   const mapStateToProps = state => ({
//     players: state.player.players,
    
//   });
  
  export default connect(
    null,
    mapDispatchToProps
  )(Settlement);
  