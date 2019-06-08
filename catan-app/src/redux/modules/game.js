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
  if (payload.playerTurn < 2)
    dispatch({
      type: CREATE_FIRST_SETTLEMENT,
      payload
    });
  if (payload.playerTurn == 2)
    dispatch({
      type: CREATE_SECOND_SETTLEMENT,
      payload
    });
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
    settlementId: road.roadId
  };
  var neighbourSettlement2 = {
    fieldId: road.fieldId,
    settlementId: road.roadId + 1
  };
  if (road.roadId === 5)
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
  neighbourRoads.push(neighbourSettlement1Road2);

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
  neighbourRoads.push(neighbourSettlement2Road2);

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
    neighbourRoads.push(settlementOneSubstitutionsRoad2);

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
      neighbourRoads.push(settlementTwoSubstitutionsRoad2);
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
  alert("asdasd")
  console.log(road)
  dispatch({
    type: ADD_ROAD, road
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


        var subSettlements = SettlementCoords[action.payload.fieldId][action.payload.id];
           


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
      var subNeighbour4 = SettlementCoords[neighbourSettlement1.fieldId][neighbourSettlement1.settlementId];
      var subNeighbour5 = SettlementCoords[neighbourSettlement2.fieldId][neighbourSettlement2.settlementId];

      if(subNeighbour4)
      {
          if(subNeighbour4.length===1)
      allSubsSets.push(subNeighbour4[0])

      if(subNeighbour2.length>1)
      allSubsSets.push(subNeighbour4[1])

      }

      if(subNeighbour5)
      {
          if(subNeighbour5.length===1)
      allSubsSets.push(subNeighbour5[0])

      if(subNeighbour5.length>1)
      allSubsSets.push(subNeighbour5[1])

      }


      allSubsSets.push(neighbourSettlement2);




      console.log(allSubsSets);


      allSubsSets.forEach((item)=>{
          (state.settlements.forEach((item2)=>{
              if(item.fieldId===item2.fieldId && item.settlementId===item2.id)

              return {
                      ...state,
                      message: "there is settlement nearby"
                    };
                    else
                    return Object.assign({}, state, {
                        settlements: state.settlements.concat(action.payload)
                      });
          }))
      })























     

    //   var settlementOneSubstitutions =
    //     SettlementCoords[neighbourSettlement1.fieldId][
    //       neighbourSettlement1.settlementId
    //     ];
    //   var settlementTwoSubstitutions =
    //     SettlementCoords[neighbourSettlement2.fieldId][
    //       neighbourSettlement2.settlementId
    //     ];

    //   var settlementSubstitutions =
    //     SettlementCoords[action.payload.fieldId][action.payload.id];
    //   var settlementSubstitutionsNeighbour1 = {};
    //   var settlementSubstitutionsNeighbour2 = {};
    //   var settlementSubstitutionsNeighbour3 = {};
    //   var settlementSubstitutionsNeighbour4 = {};

    //   if (settlementSubstitutions) {
    //     settlementSubstitutionsNeighbour1 = {
    //       fieldId: settlementSubstitutions[0].fieldId,
    //       settlementId: settlementSubstitutions[0].settlementId - 1
    //     };
    //     settlementSubstitutionsNeighbour2 = {
    //       fieldId: settlementSubstitutions[0].fieldId,
    //       settlementId: settlementSubstitutions[0].settlementId + 1
    //     };

    //     if (settlementSubstitutions[0].settlementId === 0)
    //       settlementSubstitutionsNeighbour1 = {
    //         fieldId: settlementSubstitutions[0].fieldId,
    //         settlementId: 5
    //       };

    //     if (settlementSubstitutions[0].settlementId === 5)
    //       settlementSubstitutionsNeighbour2 = {
    //         fieldId: settlementSubstitutions[0].fieldId,
    //         settlementId: 0
    //       };

    //     if (settlementSubstitutions.length === 2) {
    //       settlementSubstitutionsNeighbour3 = {
    //         fieldId: settlementSubstitutions[1].fieldId,
    //         settlementId: settlementSubstitutions[1].settlementId - 1
    //       };
    //       settlementSubstitutionsNeighbour4 = {
    //         fieldId: settlementSubstitutions[1].fieldId,
    //         settlementId: settlementSubstitutions[1].settlementId + 1
    //       };

    //       if (settlementSubstitutions[1].settlementId === 0)
    //         settlementSubstitutionsNeighbour3 = {
    //           fieldId: settlementSubstitutions[1].fieldId,
    //           settlementId: 5
    //         };

    //       if (settlementSubstitutions[1].settlementId === 5)
    //         settlementSubstitutionsNeighbour4 = {
    //           fieldId: settlementSubstitutions[1].fieldId,
    //           settlementId: 0
    //         };
    //     }
    //   }





    //   var settlementSubstitutionsNeighbour1Sub = SettlementCoords[settlementSubstitutionsNeighbour1.fieldId][settlementSubstitutionsNeighbour1.settlementId];
    //   var settlementSubstitutionsNeighbour2Sub = SettlementCoords[settlementSubstitutionsNeighbour2.fieldId][settlementSubstitutionsNeighbour2.settlementId];
    //   var settlementSubstitutionsNeighbour3Sub = SettlementCoords[settlementSubstitutionsNeighbour3.fieldId][settlementSubstitutionsNeighbour3.settlementId];
    //   var settlementSubstitutionsNeighbour4Sub = SettlementCoords[settlementSubstitutionsNeighbour4.fieldId][settlementSubstitutionsNeighbour4.settlementId];


    //   var listOfSubs = [];
    //   listOfSubs.push(settlementSubstitutionsNeighbour1Sub);
    //   listOfSubs.push(settlementSubstitutionsNeighbour2Sub);
    //   listOfSubs.push(settlementSubstitutionsNeighbour3Sub);
    //   listOfSubs.push(settlementSubstitutionsNeighbour4Sub);

    //   listOfSubs[0].forEach((item)=>{

    //     if(state.settlements.some(
    //         settlement =>
    //           settlement.id === item.settlementId &&
    //           settlement.fieldId === item.fieldId))
    //           console.log("dobro je sve")

    //   });

    //   listOfSubs.forEach((item)=>{

    //     if(state.settlements.some(
    //         settlement =>
    //           settlement.id === item.settlementId &&
    //           settlement.fieldId === item.fieldId))
    //           console.log("dobro je sve2")

    //   });

      

    //   console.log(listOfSubs);






    //   var checkSubstituteFirstSettlement = {};
    //   var checkSubstituteSecondtSettlement = {};
    //   var checkSubstituteThirdSettlement = {};
    //   var checkSubstituteFourthSettlement = {};

    //   checkSubstituteFirstSettlement = state.settlements.some(
    //     settlement =>
    //       settlement.id === settlementSubstitutionsNeighbour1.settlementId &&
    //       settlement.fieldId === settlementSubstitutionsNeighbour1.fieldId
    //   );
    //   checkSubstituteSecondtSettlement = state.settlements.some(
    //     settlement =>
    //       settlement.id === settlementSubstitutionsNeighbour2.settlementId &&
    //       settlement.fieldId === settlementSubstitutionsNeighbour2.fieldId
    //   );
    //   checkSubstituteThirdSettlement = state.settlements.some(
    //     settlement =>
    //       settlement.id === settlementSubstitutionsNeighbour3.settlementId &&
    //       settlement.fieldId === settlementSubstitutionsNeighbour4.fieldId
    //   );
    //   checkSubstituteFourthSettlement = state.settlements.some(
    //     settlement =>
    //       settlement.id === settlementSubstitutionsNeighbour4.settlementId &&
    //       settlement.fieldId === settlementSubstitutionsNeighbour4.fieldId
    //   );

    //   var checkFirstSettlement = state.settlements.some(
    //     settlement =>
    //       settlement.id === neighbourSettlement1.settlementId &&
    //       settlement.fieldId === neighbourSettlement1.fieldId
    //   );
    //   var checkSecondSettlement = state.settlements.some(
    //     settlement =>
    //       settlement.id === neighbourSettlement2.settlementId &&
    //       settlement.fieldId === neighbourSettlement2.fieldId
    //   );

    //   var checkThirdSettlement = {};
    //   var checkFourthSettlement = {};
    //   var checkSixthSettlement = {};
    //   var checkSeventhSettlement = {};

    //   if (settlementOneSubstitutions) {
    //     checkThirdSettlement = state.settlements.some(
    //       settlement =>
    //         settlement.id === settlementOneSubstitutions[0].settlementId &&
    //         settlement.fieldId === settlementOneSubstitutions[0].fieldId
    //     );
    //     if (settlementOneSubstitutions.length === 2)
    //       checkFourthSettlement = state.settlements.some(
    //         settlement =>
    //           settlement.id === settlementOneSubstitutions[1].settlementId &&
    //           settlement.fieldId === settlementOneSubstitutions[1].fieldId
    //       );
    //   }

    //   if (settlementTwoSubstitutions) {
    //     checkSixthSettlement = state.settlements.some(
    //       settlement =>
    //         settlement.id === settlementTwoSubstitutions[0].settlementId &&
    //         settlement.fieldId === settlementTwoSubstitutions[0].fieldId
    //     );
    //     if (settlementTwoSubstitutions.length === 2)
    //       checkSeventhSettlement = state.settlements.some(
    //         settlement =>
    //           settlement.id === settlementTwoSubstitutions[1].settlementId &&
    //           settlement.fieldId === settlementTwoSubstitutions[1].fieldId
    //       );
    //   }
    //   listOfSubs.push(settlementOneSubstitutions)
    //   listOfSubs.push(settlementSubstitutionsNeighbour1)
    //   listOfSubs.push(settlementTwoSubstitutions)
    //   listOfSubs.push(settlementSubstitutionsNeighbour2)
    //   listOfSubs.push(settlementSubstitutionsNeighbour1)
    //   listOfSubs.push(settlementSubstitutionsNeighbour3)
    //   listOfSubs.push(settlementSubstitutionsNeighbour4)
    //   listOfSubs.push(neighbourSettlement2)
    //   listOfSubs.push(neighbourSettlement1)
    //   listOfSubs.forEach((item)=>{

    //     if(state.settlements.some(
    //         settlement =>
    //           settlement.id === item.settlementId &&
    //           settlement.fieldId === item.fieldId))
    //           console.log("dobro je sve2")

    //   });


    
    //   console.log(settlementSubstitutionsNeighbour1)
    //   console.log(settlementOneSubstitutions);
    //   console.log(settlementTwoSubstitutions)
    //   console.log(settlementSubstitutionsNeighbour2)
    //   console.log(settlementSubstitutionsNeighbour3)
    //   console.log(settlementSubstitutionsNeighbour4)
    // //   console.log(checkSubstituteFirstSettlement)
    // //   console.log(checkSubstituteSecondtSettlement)
    // //   console.log(checkSubstituteThirdSettlement)
    // //   console.log(checkSubstituteFourthSettlement)
    //   console.log(neighbourSettlement2);
    //   console.log(neighbourSettlement1);




    // //   console.log(checkSubstituteFirstSettlement);
    // //   console.log(checkSubstituteSecondtSettlement);
    // //   console.log(checkSubstituteThirdSettlement);
    // //   console.log(checkSubstituteFourthSettlement);
    // //   console.log(checkFirstSettlement);
    // //   console.log(checkSecondSettlement)
    // //   console.log(checkThirdSettlement);
    // //   console.log(checkFourthSettlement);
    // //   console.log(checkSixthSettlement);
    // //   console.log(checkSeventhSettlement);
    // //   console.log(Object.getOwnPropertyNames(checkSeventhSettlement).length === 0);


    //   if(Object.getOwnPropertyNames(checkThirdSettlement).length === 0)
    //   checkThirdSettlement=false;

    //   if(Object.getOwnPropertyNames(checkFourthSettlement).length === 0)
    //   checkFourthSettlement=false;

    //   if(Object.getOwnPropertyNames(checkSixthSettlement).length === 0)
    //   checkSixthSettlement=false;

    //   if(Object.getOwnPropertyNames(checkSeventhSettlement).length === 0)
    //   checkSeventhSettlement=false;

      




    //   if (
    //     checkSubstituteFirstSettlement ||
    //     checkSubstituteSecondtSettlement ||
    //     checkSubstituteThirdSettlement ||
    //     checkSubstituteFourthSettlement ||
    //     checkFirstSettlement ||
    //     checkSecondSettlement ||
    //     checkThirdSettlement ||
    //     checkFourthSettlement ||
    //     checkSixthSettlement||
    //     checkSeventhSettlement



    //     // (!Object.getOwnPropertyNames(checkThirdSettlement).length === 0 &&
    //     //   checkThirdSettlement) ||
    //     // (!Object.getOwnPropertyNames(checkFourthSettlement).length === 0 &&
    //     //   checkFourthSettlement) ||
    //     // (!Object.getOwnPropertyNames(checkSixthSettlement).length === 0 &&
    //     //   checkSixthSettlement) ||
    //     // (!Object.getOwnPropertyNames(checkSeventhSettlement).length === 0 &&
    //     //   checkSeventhSettlement)
    //   ) {
    //       console.log("wtf")
    //     return {
    //       ...state,
    //       message: "there is settlement nearby"
    //     };
    //   }

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

      if (state.settlements.find(x => x.playerId === action.payload.playerId))
        return {
          ...state,
          message: "you cant make more settlements on first turn"
        };
      else
        return Object.assign({}, state, {
          settlements: state.settlements.concat(action.payload)
        });
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

      var newArray = state.settlements.filter(function (settlement) {
        return settlement.playerId===road.playerId
      });
      var newArraySub = [];
      newArray.forEach((item)=>
        newArraySub.push(SettlementCoords[item.fieldId][item.id]) );



      var allRoads = [];
      var newSettlement = {};
      var newSettlement2={};
      var oldSettlement={};

      if(newArraySub[0])
      {
      
       newSettlement = newArraySub[0][0];
       if(newArraySub[0].length===2)
       newSettlement2 = newArraySub[0][1];






      var newSettlementRoad1 = {fieldId:newSettlement.fieldId,roadId:newSettlement.settlementId-1}
      var newSettlementRoad2 = {fieldId:newSettlement.fieldId,roadId:newSettlement.settlementId}

    if(newSettlement.settlementId===0)
    newSettlementRoad1 = {fieldId:newSettlement.fieldId,roadId:5}


    var newSettlement2Road1 = {fieldId:newSettlement2.fieldId,roadId:newSettlement2.settlementId-1}
      var newSettlement2Road2 = {fieldId:newSettlement2.fieldId,roadId:newSettlement2.settlementId}

    if(newSettlement2.settlementId===0)
    newSettlement2Road1 = {fieldId:newSettlement2.fieldId,roadId:5}




      
    allRoads.push(newSettlementRoad1);      
    allRoads.push(newSettlementRoad2);      
    allRoads.push(newSettlement2Road1);      
    allRoads.push(newSettlement2Road2); 
      }


      if(newArray[0])
      {
    oldSettlement = newArray[0];

    var oldSettlementRoad1 = {fieldId:oldSettlement.fieldId,roadId:oldSettlement.id-1}
      var oldSettlementRoad2 = {fieldId:oldSettlement.fieldId,roadId:oldSettlement.id}

    if(oldSettlement.settlementId===0)
    oldSettlementRoad1 = {fieldId:oldSettlement.fieldId,roadId:5}
    allRoads.push(oldSettlementRoad1);
    allRoads.push(oldSettlementRoad2);


      }

  



      
    
    allRoads.forEach((item)=>
    {
        if(item.fieldId===road.fieldId && item.roadId===road.id)
        return Object.assign({}, state, {
            roads: state.roads.concat(action.payload)
          });
      }
    );
    return{
        ...state,
        message:"road not near settlement"
    }
    















    //   var neighbourSettlement1 = {
    //     fieldId: road.fieldId,
    //     settlementId: road.id
    //   };
    //   var neighbourSettlement2 = {
    //     fieldId: road.fieldId,
    //     settlementId: road.id + 1
    //   };
    //   if (road.roadId === 5)
    //     neighbourSettlement2 = { fieldId: road.fieldId, settlementId: 0 };

    //   var settlementOneSubstitutions =
    //     SettlementCoords[neighbourSettlement1.fieldId][
    //       neighbourSettlement1.settlementId
    //     ];

    //   var settlementTwoSubstitutions =
    //     SettlementCoords[neighbourSettlement2.fieldId][
    //       neighbourSettlement2.settlementId
    //     ];

    //     var checkNeighbour1= state.settlements.some(
    //         settlement =>
    //           settlement.id === neighbourSettlement1.settlementId &&
    //           settlement.fieldId === neighbourSettlement1.fieldId && settlement.playerId=== road.playerId
    //       );

    //       var checkNeighbour2= state.settlements.some(
    //         settlement =>
    //           settlement.id === neighbourSettlement2.settlementId &&
    //           settlement.fieldId === neighbourSettlement2.fieldId && settlement.playerId=== road.playerId
    //       );
    //       var checkNeighbour3= {}
    //       var checkNeighbour4= {}

    //       var checkNeighbour5= {}
    //       var checkNeighbour6= {}
    //         if(settlementOneSubstitutions)
    //         {
    //        checkNeighbour3= state.settlements.some(
    //         settlement =>
    //           settlement.id === settlementOneSubstitutions[0].settlementId &&
    //           settlement.fieldId === settlementOneSubstitutions[0].fieldId && settlement.playerId=== road.playerId
    //       );
    //       if(settlementOneSubstitutions.length==2)

    //        checkNeighbour4= state.settlements.some(
    //         settlement =>
    //           settlement.id === settlementOneSubstitutions[1].settlementId &&
    //           settlement.fieldId === settlementOneSubstitutions[1].fieldId && settlement.playerId=== road.playerId
    //       );
    //     }
    //     if(settlementTwoSubstitutions)
    //     {
    //        checkNeighbour5= state.settlements.some(
    //         settlement =>
    //           settlement.id === settlementTwoSubstitutions[0].settlementId &&
    //           settlement.fieldId === settlementTwoSubstitutions[0].fieldId && settlement.playerId=== road.playerId
    //       );
    //       if(settlementTwoSubstitutions.length===2)
    //        checkNeighbour6= state.settlements.some(
    //         settlement =>
    //           settlement.id === settlementTwoSubstitutions[1].settlementId &&
    //           settlement.fieldId === settlementTwoSubstitutions[1].fieldId && settlement.playerId=== road.playerId
    //       );
    //        }

          



    //        if(Object.getOwnPropertyNames(checkNeighbour3).length === 0)
    //        checkNeighbour3=false;
    //        if(Object.getOwnPropertyNames(checkNeighbour4).length === 0)
    //        checkNeighbour4=false;
    //        if(Object.getOwnPropertyNames(checkNeighbour5).length === 0)
    //        checkNeighbour5=false;
    //        if(Object.getOwnPropertyNames(checkNeighbour6).length === 0)
    //        checkNeighbour6=false;

    //        var road2 = RoadCoords[road.fieldId][road.id]

    //        if(road2)
    //        {
           
    //        var neighbourSubstituteSettlement1 = {
    //         fieldId: road2.fieldId,
    //         settlementId: road2.roadId
    //       };
    //       var neighbourSubstituteSettlement2 = {
    //         fieldId: road2.fieldId,
    //         settlementId: road2.roadId + 1
    //       };
    //       if (road2.roadId === 5)
    //       neighbourSubstituteSettlement2 = { fieldId: road2.fieldId, settlementId: 0 };

    //       console.log(neighbourSubstituteSettlement1);
    
    //       var substituteSettlementOneSubstitutions =
    //         SettlementCoords[neighbourSubstituteSettlement1.fieldId][
    //             neighbourSubstituteSettlement1.settlementId
    //         ];
            


    //       var substituteSettlementTwoSubstitutions =
    //         SettlementCoords[neighbourSubstituteSettlement2.fieldId][
    //             neighbourSubstituteSettlement2.settlementId
    //         ];
           
    
    //         var checkSubstituteNeighbour1= state.settlements.some(
    //             settlement =>
    //               settlement.id === neighbourSubstituteSettlement1.settlementId &&
    //               settlement.fieldId === neighbourSubstituteSettlement1.fieldId && settlement.playerId=== road.playerId
    //           );
    
    //           var checkSubstituteNeighbour2= state.settlements.some(
    //             settlement =>
    //               settlement.id === neighbourSubstituteSettlement2.settlementId &&
    //               settlement.fieldId === neighbourSubstituteSettlement2.fieldId && settlement.playerId=== road.playerId
    //           );
    //           var checkSubstituteNeighbour3= {}
    //           var checkSubstituteNeighbour4= {}
    
    //           var checkSubstituteNeighbour5= {}
    //           var checkSubstituteNeighbour6= {}
    //             if(substituteSettlementOneSubstitutions)
    //             {
    //                 checkSubstituteNeighbour3= state.settlements.some(
    //             settlement =>
    //               settlement.id === substituteSettlementOneSubstitutions[0].settlementId &&
    //               settlement.fieldId === substituteSettlementOneSubstitutions[0].fieldId && settlement.playerId=== road.playerId
    //           );
    //           if(substituteSettlementOneSubstitutions.length==2)
    
    //           checkSubstituteNeighbour4= state.settlements.some(
    //             settlement =>
    //               settlement.id === substituteSettlementOneSubstitutions[1].settlementId &&
    //               settlement.fieldId === substituteSettlementOneSubstitutions[1].fieldId && settlement.playerId=== road.playerId
    //           );
    //         }
    //         if(substituteSettlementTwoSubstitutions)
    //         {
    //             checkSubstituteNeighbour5= state.settlements.some(
    //             settlement =>
    //               settlement.id === substituteSettlementTwoSubstitutions[0].settlementId &&
    //               settlement.fieldId === substituteSettlementTwoSubstitutions[0].fieldId && settlement.playerId=== road.playerId
    //           );
    //           if(substituteSettlementTwoSubstitutions.length===2)
    //           checkSubstituteNeighbour6= state.settlements.some(
    //             settlement =>
    //               settlement.id === substituteSettlementTwoSubstitutions[1].settlementId &&
    //               settlement.fieldId === substituteSettlementTwoSubstitutions[1].fieldId && settlement.playerId=== road.playerId
    //           );
    //            }

        //   console.log(checkNeighbour1)
        //   console.log(checkNeighbour2)

        //   console.log(checkNeighbour3);
        //   console.log(checkNeighbour4);
        //   console.log(checkNeighbour5);
        //   console.log(checkNeighbour6);
        //   console.log(checkSubstituteNeighbour1)
        //   console.log(checkSubstituteNeighbour2)
        //   console.log(checkSubstituteNeighbour3)
        //   console.log(substituteSettlementOneSubstitutions)
        //   console.log(checkSubstituteNeighbour4)

        // console.log(neighbourSubstituteSettlement1);
        // console.log(neighbourSubstituteSettlement2);
        // console.log(substituteSettlementOneSubstitutions);
        // console.log(substituteSettlementTwoSubstitutions)

        //   console.log(Object.getOwnPropertyNames(checkSubstituteNeighbour4).length === 0 );
        //   console.log(Object.getOwnPropertyNames(checkSubstituteNeighbour5).length === 0 );
        //   console.log(Object.getOwnPropertyNames(checkSubstituteNeighbour6).length === 0 );

        // if(Object.getOwnPropertyNames(checkSubstituteNeighbour4).length === 0)
        // checkSubstituteNeighbour4=false;
        // if(Object.getOwnPropertyNames(checkSubstituteNeighbour5).length === 0)
        // checkSubstituteNeighbour5=false;
        // if(Object.getOwnPropertyNames(checkSubstituteNeighbour6).length === 0)
        // checkSubstituteNeighbour6=false;

        //   if (
        //     checkSubstituteNeighbour1	 ||
        //     checkSubstituteNeighbour2  ||
        //     checkSubstituteNeighbour3 ||
        //     checkSubstituteNeighbour4 ||
        //     checkSubstituteNeighbour5 ||
        //     checkSubstituteNeighbour6  ||
        //     checkNeighbour1	 ||
        //     checkNeighbour2 ||
        //     checkNeighbour3 ||
        //     checkNeighbour4 ||
        //     checkNeighbour5 ||
        //     checkNeighbour6 



            // (!Object.getOwnPropertyNames(checkSubstituteNeighbour3).length === 0 &&
            // checkSubstituteNeighbour3) ||
            // (!Object.getOwnPropertyNames(checkSubstituteNeighbour4).length === 0 &&
            // checkSubstituteNeighbour4) ||
            // (!Object.getOwnPropertyNames(checkSubstituteNeighbour5).length === 0 &&
            // checkSubstituteNeighbour5) ||
            // (!Object.getOwnPropertyNames(checkSubstituteNeighbour6).length === 0 &&
            // checkSubstituteNeighbour6) ||
            // checkNeighbour1	 ||
            // checkNeighbour2 ||
            // (!Object.getOwnPropertyNames(checkNeighbour3).length === 0 &&
            //   checkNeighbour3) ||
            // (!Object.getOwnPropertyNames(checkNeighbour4).length === 0 &&
            //   checkNeighbour4) ||
            // (!Object.getOwnPropertyNames(checkNeighbour5).length === 0 &&
            //   checkNeighbour5) ||
            // (!Object.getOwnPropertyNames(checkNeighbour6).length === 0 &&
            //   checkNeighbour6)
              
        //   )
        //   {
        //     console.log("road je dobar2")

        //     return Object.assign({}, state, {
        //         roads: state.roads.concat(action.payload)
        //       });
        //   }
        //   console.log(!Object.getOwnPropertyNames(checkNeighbour3).length === 0 &&
        //   checkNeighbour3)
        //   console.log(Object.getOwnPropertyNames(checkNeighbour6).length === 0)
        //     console.log(checkNeighbour3)


        // console.log(settlementOneSubstitutions);
        // console.log(settlementTwoSubstitutions);
        // console.log(checkNeighbour1);
        // console.log(neighbourSettlement1);
        // console.log(neighbourSettlement2);




        // }

        // console.log(Object.getOwnPropertyNames(checkNeighbour3).length === 0)
        // console.log(Object.getOwnPropertyNames(checkNeighbour4).length === 0)

        // console.log(Object.getOwnPropertyNames(checkNeighbour5).length === 0)
        
        
        // if (
        //     checkNeighbour1	 ||
        //     checkNeighbour2 ||
        //     checkNeighbour3 ||
        //     checkNeighbour4 ||
        //     checkNeighbour5 ||
        //     checkNeighbour6 

            
            // (!Object.getOwnPropertyNames(checkNeighbour3).length === 0 &&
            //   checkNeighbour3) ||
            // (!Object.getOwnPropertyNames(checkNeighbour4).length === 0 &&
            //   checkNeighbour4) ||
            // (!Object.getOwnPropertyNames(checkNeighbour5).length === 0 &&
            //   checkNeighbour5) ||
            // (!Object.getOwnPropertyNames(checkNeighbour6).length === 0 &&
            //   checkNeighbour6)
              
        //   )
        //   {
        //        console.log("road je dobar")
        //     return Object.assign({}, state, {
        //         roads: state.roads.concat(action.payload)
        //       });
        //   }

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
    console.log(action)
      return Object.assign({}, state, {
        roads: state.roads.concat(action.road)
      });

    case CREATE_ROAD:
      return Object.assign({}, state, {
        roads: state.roads.concat(action.payload)
      });

    default:
      return state;
  }
};

export default reducer;
