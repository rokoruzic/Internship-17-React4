import React from "react";
import { connect } from "react-redux";
import store from "./../../../redux/index"

class PlayerList extends React.Component{

    render(){
        const {players}=this.props;
        var playerList = players.map((item, index) => {
            return (
              <div style={{color:item.color}} key={index}>
              Name: {item.name} Lumber: {item.lumber} Grain: {item.grain} Rock: {item.rock} Wool: {item.wool} Brick: {item.brick}
                Points: {item.points}
             </div>
            );
          });

        return(<div>

            {playerList}

        </div>)
    }
}
const mapStateToProps = state => ({
    players: state.player.players
  });
  
  export default connect(
    mapStateToProps,
    null
  )(PlayerList);