import RoadCoords from "./../../constants/RoadCoords";
import SettlementCoords from "./../../constants/SettlementCoords";
import { init } from "events";
import { newExpression } from "@babel/types";
// action types
const ADD_PLAYER = "ADD_PLAYER";
const EDIT_PLAYER_POINTS = "EDIT_PLAYER_POINTS";
const SET_PLAYER_TURN = "SET_PLAYER_TURN";
const SUBSTRACT_PLAYER_CARDS = "SUBSTRACT_PLAYER_CARDS";
const ADD_PLAYER_CARDS = "ADD_PLAYER_CARDS";
const CREATE_FIRST_SETTLEMENT = "CREATE_FIRST_SETTLEMENT";
const CREATE_SECOND_SETTLEMENT = "CREATE_SECOND_SETTLEMENT";
const APPLY_ROAD = "APPLY_ROAD";
const SHOW_ERROR = "SHOW_ERROR";
const INCREMENT_ID = "INCREMENT_ID";
const ADD_ROAD = "ADD_ROAD";
const CHECK_ROAD_CONNECTION = "CHECK_ROAD_CONNECTION";
const CREATE_ROAD = "CREATE_ROAD";
const ADD_FIRST_ROAD = "ADD_FIRST_ROAD";

// initial state
const initialState = {
  fieldId: 5,
  color: "blue",
  roads: [],
  settlements: [],
  message: ""
};

// action creators
export const createFirstSettlement = payload => dispatch => {
//   if (payload.playerTurn < 2)
    dispatch({
      type: CREATE_FIRST_SETTLEMENT,
      payload
    });
//   if (payload.playerTurn == 2)
    // dispatch({
    //   type: CREATE_FIRST_SETTLEMENT,
    //   payload
    // });
};
export const applyRoad = () => {
  return {
    type: APPLY_ROAD
  };
};
export const createRoad = payload => dispatch => {
  dispatch({
    type: CREATE_ROAD,
    payload
  });
};

export const addFirstRoad = payload => dispatch => {
  dispatch({
    type: ADD_FIRST_ROAD,
    payload
  });
};

export const addRoad = road => dispatch => {
  if (road.isRoad)
    dispatch({
      type: "ALREADY_ROAD"
    });
  var neighbourSettlement1 = {
    fieldId: road.fieldId,
    settlementId: road.id
  };
  console.log(neighbourSettlement1)
  var neighbourSettlement2 = {
    fieldId: road.fieldId,
    settlementId: road.id + 1
  };
  if (road.id === 5)
    neighbourSettlement2 = { fieldId: road.fieldId, settlementId: 0 };

  var neighbourRoads = [];

  var neighbourSettlement1Road1 = {
    fieldId: neighbourSettlement1.fieldId,
    roadId: neighbourSettlement1.settlementId - 1
  };
  var neighbourSettlement1Road2 = {
    fieldId: neighbourSettlement1.fieldId,
    roadId: neighbourSettlement1.settlementId
  };

  if (neighbourSettlement1.settlementId === 0)
    neighbourSettlement1Road1 = {
      fieldId: neighbourSettlement1.fieldId,
      roadId: 5
    };

  neighbourRoads.push(neighbourSettlement1Road1);
  console.log(neighbourSettlement1Road1)
  neighbourRoads.push(neighbourSettlement1Road2);
  console.log(neighbourSettlement1Road2)

  var neighbourSettlement2Road1 = {
    fieldId: neighbourSettlement2.fieldId,
    roadId: neighbourSettlement2.settlementId - 1
  };
  var neighbourSettlement2Road2 = {
    fieldId: neighbourSettlement2.fieldId,
    roadId: neighbourSettlement2.settlementId
  };

  if (neighbourSettlement2.settlementId === 0)
    neighbourSettlement2Road1 = {
      fieldId: neighbourSettlement2.fieldId,
      roadId: 5
    };

  neighbourRoads.push(neighbourSettlement2Road1);
  console.log(neighbourSettlement2Road1)
  neighbourRoads.push(neighbourSettlement2Road2);
  console.log(neighbourSettlement2Road2)


  var settlementOneSubstitutions =
    SettlementCoords[neighbourSettlement1.fieldId][
      neighbourSettlement1.settlementId
    ];

  if (settlementOneSubstitutions) {
    var settlementOneSubstitutionsRoad1 = {
      field: settlementOneSubstitutions[0].fieldId,
      roadId: settlementOneSubstitutions[0].settlementId - 1
    };
    var settlementOneSubstitutionsRoad2 = {
      field: settlementOneSubstitutions[0].fieldId,
      roadId: settlementOneSubstitutions[0].settlementId
    };

    if (settlementOneSubstitutions[0].settlementId === 0)
      settlementOneSubstitutionsRoad1 = {
        field: settlementOneSubstitutions[0].fieldId,
        roadId: 5
      };

    neighbourRoads.push(settlementOneSubstitutionsRoad1);
    console.log(settlementOneSubstitutionsRoad1);
    neighbourRoads.push(settlementOneSubstitutionsRoad2);
    console.log(settlementOneSubstitutionsRoad2);


    var isThereMoreThanOneSubstitutionForSettlementOne =
      settlementOneSubstitutions.length === 2;
    if (isThereMoreThanOneSubstitutionForSettlementOne) {
      var settlementTwoSubstitutionsRoad1 = {
        field: settlementOneSubstitutions[1].fieldId,
        roadId: settlementOneSubstitutions[1].settlementId - 1
      };
      var settlementTwoSubstitutionsRoad2 = {
        field: settlementOneSubstitutions[1].fieldId,
        roadId: settlementOneSubstitutions[1].settlementId
      };

      if (settlementOneSubstitutions[1].settlementId === 0)
        settlementTwoSubstitutionsRoad2 = {
          field: settlementOneSubstitutions[1].fieldId,
          roadId: 5
        };

      neighbourRoads.push(settlementTwoSubstitutionsRoad1);
      console.log(settlementTwoSubstitutionsRoad1)
      neighbourRoads.push(settlementTwoSubstitutionsRoad2);
      console.log(settlementTwoSubstitutionsRoad2)

    }
  }

  var settlementTwoSubstitutions =
    SettlementCoords[neighbourSettlement2.fieldId][
      neighbourSettlement2.settlementId
    ];

  if (settlementTwoSubstitutions) {
    var settlementTwoSubstitutionsRoad1 = {
      field: settlementTwoSubstitutions[0].fieldId,
      roadId: settlementTwoSubstitutions[0].settlementId - 1
    };
    var settlementTwoSubstitutionsRoad2 = {
      field: settlementTwoSubstitutions[0].fieldId,
      roadId: settlementTwoSubstitutions[0].settlementId
    };

    if (settlementTwoSubstitutions[0].settlementId === 0)
      settlementTwoSubstitutionsRoad1 = {
        field: settlementTwoSubstitutions[0].fieldId,
        roadId: 5
      };

    neighbourRoads.push(settlementTwoSubstitutionsRoad1);
    neighbourRoads.push(settlementTwoSubstitutionsRoad2);

    var isThereMoreThanTwoSubstitutionForSettlementTwo =
      settlementTwoSubstitutions.length === 2;
    if (isThereMoreThanTwoSubstitutionForSettlementTwo) {
      var settlementTwoSubstitutionsRoad1 = {
        field: settlementTwoSubstitutions[1].fieldId,
        roadId: settlementTwoSubstitutions[1].settlementId - 1
      };
      var settlementTwoSubstitutionsRoad2 = {
        field: settlementTwoSubstitutions[1].fieldId,
        roadId: settlementTwoSubstitutions[1].settlementId
      };

      if (settlementTwoSubstitutions[1].settlementId === 0)
        settlementTwoSubstitutionsRoad2 = {
          field: settlementTwoSubstitutions[1].fieldId,
          roadId: 5
        };

      neighbourRoads.push(settlementTwoSubstitutionsRoad1);
      neighbourRoads.push(settlementTwoSubstitutionsRoad2);
    }
  }
  console.log(neighbourRoads);
  dispatch({
    type: ADD_ROAD,
    road
  });
};
export const incrementId = () => {
  return {
    type: INCREMENT_ID
  };
};

export const showError = message => {
  return {
    type: SHOW_ERROR,
    message: message
  };
};

// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FIRST_SETTLEMENT:
      var subSettlements =
        SettlementCoords[action.payload.fieldId][action.payload.id];

      var neighbourSettlement1 = {
        fieldId: action.payload.fieldId,
        settlementId: action.payload.id - 1
      };
      var neighbourSettlement2 = {
        fieldId: action.payload.fieldId,
        settlementId: action.payload.id + 1
      };

      if (action.payload.id === 0)
        neighbourSettlement1 = {
          fieldId: action.payload.fieldId,
          settlementId: 5
        };
      if (action.payload.id === 5)
        neighbourSettlement2 = {
          fieldId: action.payload.fieldId,
          settlementId: 0
        };

      var subNeighbour1 = {};
      var subNeighbour2 = {};
      var sub2Neighbour1 = {};
      var sub2Neighbour2 = {};

      var allSubsSets = [];

      if (subSettlements) {
        subNeighbour1 = {
          fieldId: subSettlements[0].fieldId,
          settlementId: subSettlements[0].settlementId - 1
        };
        subNeighbour2 = {
          fieldId: subSettlements[0].fieldId,
          settlementId: subSettlements[0].settlementId + 1
        };

        if (subSettlements[0].settlementId === 0)
          subNeighbour1 = {
            fieldId: subSettlements[0].fieldId,
            settlementId: 5
          };

        if (subSettlements[0].settlementId === 5)
          subNeighbour2 = {
            fieldId: subSettlements[0].fieldId,
            settlementId: 0
          };

        if (subSettlements.length === 2) {
          sub2Neighbour1 = {
            fieldId: subSettlements[1].fieldId,
            settlementId: subSettlements[1].settlementId - 1
          };
          sub2Neighbour2 = {
            fieldId: subSettlements[1].fieldId,
            settlementId: subSettlements[1].settlementId + 1
          };

          if (subSettlements[1].settlementId === 0)
            sub2Neighbour1 = {
              fieldId: subSettlements[1].fieldId,
              settlementId: 5
            };

          if (subSettlements[1].settlementId === 5)
            sub2Neighbour2 = {
              fieldId: subSettlements[1].fieldId,
              settlementId: 0
            };
        }
      }

      allSubsSets.push(sub2Neighbour1);
      allSubsSets.push(sub2Neighbour2);
      allSubsSets.push(subNeighbour1);
      allSubsSets.push(subNeighbour2);
      allSubsSets.push(neighbourSettlement1);
      var subNeighbour4 =
        SettlementCoords[neighbourSettlement1.fieldId][
          neighbourSettlement1.settlementId
        ];
      var subNeighbour5 =
        SettlementCoords[neighbourSettlement2.fieldId][
          neighbourSettlement2.settlementId
        ];

      if (subNeighbour4) {
        if (subNeighbour4.length === 1) allSubsSets.push(subNeighbour4[0]);

        if (subNeighbour2.length > 1) allSubsSets.push(subNeighbour4[1]);
      }

      if (subNeighbour5) {
        if (subNeighbour5.length === 1) allSubsSets.push(subNeighbour5[0]);

        if (subNeighbour5.length > 1) allSubsSets.push(subNeighbour5[1]);
      }

      allSubsSets.push(neighbourSettlement2);


      var isAlreadySettlement = state.settlements.some(
        settlement =>
          settlement.id === action.payload.id &&
          settlement.fieldId === action.payload.fieldId
      );

      if (isAlreadySettlement)
        return {
          ...state,
          message: "It is already a settlement"
        };

        var checkNearbySettlements = false;
      allSubsSets.forEach(item => {
        state.settlements.forEach(item2 => {
          if (item.fieldId === item2.fieldId && item.settlementId === item2.id)
          {
            // console.log("asd")
            // return {
            //   ...state,
            //   message: "there is settlement nearby"
            // };

           
            checkNearbySettlements=true;

        
            
        }
        else {
            
          
                
        }
      
        });
      });
     
      
    if(checkNearbySettlements)
    {
           return {
              ...state,
              message: "there is settlement nearby"
            };

    }
    else
    {

        if (action.payload.playerTurn<2&& state.settlements.find(x => x.playerId === action.payload.playerId))
        return {
          ...state,
          message: "you cant make more settlements on first 2 turns"
        };

        else   if(action.payload.playerTurn===2)
        {
          var filteredSettlements = state.settlements.filter(function(settlement) {
              return settlement.playerId === action.payload.playerId;
            });
            if(filteredSettlements.length>1)
            {
              return {
                  ...state,
                  message: "you cant make more settlements on first 2 turns"
                };
            }
            else
            return Object.assign({}, state, {
                settlements: state.settlements.concat(action.payload)
              });
           
  
        } 
      else
      {
        return Object.assign({}, state, {
          settlements: state.settlements.concat(action.payload)
        });
        
      }


    }

     

 

      
    
    
    case CREATE_SECOND_SETTLEMENT:
      var filteredSettlements = state.settlements.filter(function(settlement) {
        return settlement.playerId === action.payload.playerId;
      });
      console.log(filteredSettlements);
      console.log(
        state.settlements.find(x => x.playerId === action.payload.playerId)
      );
    case APPLY_ROAD:
      return {
        ...state,
        isVisible: true,
        message: action.message
      };










    case ADD_FIRST_ROAD:
      var road = action.payload;

      var newArray = state.settlements.filter(function(settlement) {
        return settlement.playerId === road.playerId;
      });
      var newArraySub = [];
      newArray.forEach(item =>
        newArraySub.push(SettlementCoords[item.fieldId][item.id])
      );

      var allRoads = [];
      var newSettlement = {};
      var newSettlement2 = {};
      var oldSettlement = {};

      if (newArraySub[0]) {
        newSettlement = newArraySub[0][0];
        if (newArraySub[0].length === 2) newSettlement2 = newArraySub[0][1];

        var newSettlementRoad1 = {
          fieldId: newSettlement.fieldId,
          roadId: newSettlement.settlementId - 1
        };
        var newSettlementRoad2 = {
          fieldId: newSettlement.fieldId,
          roadId: newSettlement.settlementId
        };

        if (newSettlement.settlementId === 0)
          newSettlementRoad1 = { fieldId: newSettlement.fieldId, roadId: 5 };

        var newSettlement2Road1 = {
          fieldId: newSettlement2.fieldId,
          roadId: newSettlement2.settlementId - 1
        };
        var newSettlement2Road2 = {
          fieldId: newSettlement2.fieldId,
          roadId: newSettlement2.settlementId
        };

        if (newSettlement2.settlementId === 0)
          newSettlement2Road1 = { fieldId: newSettlement2.fieldId, roadId: 5 };

        allRoads.push(newSettlementRoad1);
        allRoads.push(newSettlementRoad2);
        allRoads.push(newSettlement2Road1);
        allRoads.push(newSettlement2Road2);
        console.log(newSettlementRoad1);
        console.log(newSettlementRoad2);
        console.log(newSettlement2Road1);
        console.log(newSettlement2Road2);


      }
      
      var secondSettlement = {};
      if (newArray[0]) {
        oldSettlement = newArray[0];

        var oldSettlementRoad1 = {
          fieldId: oldSettlement.fieldId,
          roadId: oldSettlement.id - 1
        };
        var oldSettlementRoad2 = {
          fieldId: oldSettlement.fieldId,
          roadId: oldSettlement.id
        };

    if(newArray.length>1)
    secondSettlement = newArray[1];

        var secondSettlementRoad1 = {
          fieldId: secondSettlement.fieldId,
          roadId: secondSettlement.id - 1
        };
        var secondSettlementRoad2 = {
          fieldId: secondSettlement.fieldId,
          roadId: secondSettlement.id
        };




        if (oldSettlement.id === 0)
          oldSettlementRoad1 = { fieldId: oldSettlement.fieldId, roadId: 5 };

          if(secondSettlement.id===0)
          secondSettlementRoad1={fieldId:secondSettlement.fieldId,roadId:5}
        allRoads.push(oldSettlementRoad1);
        console.log(oldSettlement)
        console.log(oldSettlementRoad1)
        allRoads.push(oldSettlementRoad2);
        allRoads.push(secondSettlementRoad1);
        allRoads.push(secondSettlementRoad2);
        console.log(oldSettlementRoad2)

      }


      var isRoadLegit = false;
      console.log(road)
      allRoads.forEach(item => {
          console.log(item)
        if (item.fieldId === road.fieldId && item.roadId === road.id)
        {
            isRoadLegit=true;
            
          
        }


        
      });
      console.log(isRoadLegit);
      console.log(action.payload)

          if (!isRoadLegit)
          {

              return {
                 ...state,
                 message:"road not legit"
              };
            }
          else {

              if (action.payload.turn < 2 && state.roads.find(x => x.playerId === action.payload.playerId))
              {
                  console.log("sta je ovo")

                  return {
                      ...state,
                      message: "you cant make more roads on first 2 turns"
                  };

                }
              else if (action.payload.turn === 2) {
                  console.log(action.payload)
                  var filteredRoads = state.roads.filter(function (road) {
                      return road.playerId === action.payload.playerId;
                  });
                  if (filteredRoads.length > 1) {
                      return {
                          ...state,
                          message: "you cant make more roads on first 2 turns"
                      };
                  }
                  else
                      return Object.assign({}, state, {
                          roads: state.roads.concat(action.payload)
                      });


              }
              else {
                  return Object.assign({}, state, {
                      roads: state.roads.concat(action.payload)
                  });

              }
          }

      
     

   

    case SHOW_ERROR:
      return {
        ...state,
        isVisible: false,
        message: ""
      };
    case INCREMENT_ID:
      return {
        ...state,
        fieldId: state.fieldId + 1
      };
    case ADD_ROAD:

    var isAlreadyRoad = state.roads.some(
        road =>
          road.id === action.road.id &&
          road.fieldId === action.road.fieldId
      );

      if (isAlreadyRoad)
        return {
          ...state,
          message: "It is already a road"
        };


        console.log(action.road.turn)
      if(action.road.turn===2)
      {
        var filteredRoads = state.roads.filter(function(road) {
            return road.playerId === action.road.playerId;
          });
          if(filteredRoads.length>1)
          {
            return {
                ...state,
                message: "you cant make more roads on first 2 turns"
              };
          }
          else
          return Object.assign({}, state, {
            roads: state.roads.concat(action.road)
          });

      }  




      if(action.road.turn<2)
      {
      if (state.roads.find(x => x.playerId === action.road.playerId))
        return {
          ...state,
          message: "you cant make more roads on first turn"
        };
      else
        return Object.assign({}, state, {
          roads: state.roads.concat(action.road)
        });
    }

    case CREATE_ROAD:
      return Object.assign({}, state, {
        roads: state.roads.concat(action.payload)
      });

    default:
      return state;
  }
};

export default reducer;
