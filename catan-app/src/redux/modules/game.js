import RoadCoords from "./../../constants/RoadCoords";
import SettlementCoords from "./../../constants/SettlementCoords";
// action types
const CREATE_FIRST_SETTLEMENT = "CREATE_FIRST_SETTLEMENT";
const CREATE_SECOND_SETTLEMENT = "CREATE_SECOND_SETTLEMENT";
const APPLY_ROAD = "APPLY_ROAD";
const SHOW_ERROR = "SHOW_ERROR";
const INCREMENT_ID = "INCREMENT_ID";
const ADD_ROAD = "ADD_ROAD";
const CREATE_ROAD = "CREATE_ROAD";
const CREATE_FIRST_ROAD = "CREATE_FIRST_ROAD";
const ADD_FIELDS = "ADD_FIELDS";
const THROW_DICE = "THROW_DICE";
const TOGGLE_ROAD_CREATE = "TOGGLE_ROAD_CREATE";
const TOGGLE_SETTLEMENT_CREATE = "TOGGLE_SETTLEMENT_CREATE";
const CREATE_CITY="CREATE_CITY";
const IS_DICE_ROLLED="IS_DICE_ROLLED"
const DICE_ROLL_FALSE="DICE_ROLLED_FALSE"
const START_GAME = "START_GAME";

// initial state
const initialState = {
  fieldId: 5,
  color: "blue",
  roads: [],
  settlements: [],
  message: "",
  fields: [],
  dice: 0,
  isRoadCreated: false,
  isSettlementCreated: false,
  isDiceRolled:false,
  isGameStarted:false
};

// action creators
export const throwDice = payload => dispatch => {
  dispatch({
    type: THROW_DICE,
    payload
  });
};
export const startGame = () => dispatch => {
  alert("STARTED GAME")
  dispatch({
    type: START_GAME,
  });
};
export const isDiceRolled = () => dispatch => {
  dispatch({
    type: IS_DICE_ROLLED,
  });
};
export const diceRollFalse = () => dispatch => {
  dispatch({
    type: DICE_ROLL_FALSE,
  });
};
export const createCity = payload => dispatch => {
  dispatch({
    type: CREATE_CITY,
    payload
  });
};
export const toggleRoadCreate = payload => dispatch => {
  dispatch({
    type: TOGGLE_ROAD_CREATE,
    payload
  });
};
export const toggleSettlementCreate = payload => dispatch => {
  dispatch({
    type: TOGGLE_SETTLEMENT_CREATE,
    payload
  });
};
export const createFirstSettlement = payload => dispatch => {
  dispatch({
    type: CREATE_FIRST_SETTLEMENT,
    payload
  });
};
export const applyRoad = () => {
  return {
    type: APPLY_ROAD
  };
};
export const addFields = payload => dispatch => {
  dispatch({
    type: ADD_FIELDS,
    payload
  });
};
export const createRoad = payload => dispatch => {
  dispatch({
    type: CREATE_ROAD,
    payload
  });
};

export const createFirstRoad = payload => dispatch => {
  dispatch({
    type: CREATE_FIRST_ROAD,
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
    var settlementThreeSubstitutionsRoad1 = {
      field: settlementTwoSubstitutions[0].fieldId,
      roadId: settlementTwoSubstitutions[0].settlementId - 1
    };
    var settlementThreeSubstitutionsRoad2 = {
      field: settlementTwoSubstitutions[0].fieldId,
      roadId: settlementTwoSubstitutions[0].settlementId
    };

    if (settlementTwoSubstitutions[0].settlementId === 0)
      settlementThreeSubstitutionsRoad1 = {
        field: settlementTwoSubstitutions[0].fieldId,
        roadId: 5
      };

    neighbourRoads.push(settlementThreeSubstitutionsRoad1);
    neighbourRoads.push(settlementThreeSubstitutionsRoad2);

    var isThereMoreThanTwoSubstitutionForSettlementTwo =
      settlementTwoSubstitutions.length === 2;
    if (isThereMoreThanTwoSubstitutionForSettlementTwo) {
      var settlementTwoSubstitutionsRoad3 = {
        field: settlementTwoSubstitutions[1].fieldId,
        roadId: settlementTwoSubstitutions[1].settlementId - 1
      };
      var settlementTwoSubstitutionsRoad4 = {
        field: settlementTwoSubstitutions[1].fieldId,
        roadId: settlementTwoSubstitutions[1].settlementId
      };

      if (settlementTwoSubstitutions[1].settlementId === 0)
        settlementTwoSubstitutionsRoad4 = {
          field: settlementTwoSubstitutions[1].fieldId,
          roadId: 5
        };

      neighbourRoads.push(settlementTwoSubstitutionsRoad3);
      neighbourRoads.push(settlementTwoSubstitutionsRoad4);
    }
  }

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
    case START_GAME:
    return{
      ...state,
      isGameStarted:true
    }
    case DICE_ROLL_FALSE:
    return{
      ...state,
      isDiceRolled:false
    }
    case IS_DICE_ROLLED:
    return {
      ...state,
      isDiceRolled:true
    }
    case CREATE_CITY:
    let settlements1 = [...state.settlements];
    let settlementToEdit = settlements1.find(x=>x.id===action.payload.id && x.fieldId===action.payload.fieldId);
    settlementToEdit.isCity=true;
    return Object.assign({}, state, {
      settlements: settlements1,
      message:"city created"
    });


    case THROW_DICE:
      return Object.assign({}, state, {
        dice: action.payload
      });
    case ADD_FIELDS:
      return Object.assign({}, state, {
        fields: state.fields.concat(action.payload)
      });

    case CREATE_FIRST_SETTLEMENT:
      var subSettlements =
        SettlementCoords[action.payload.fieldId][action.payload.id];

      var road1 = {};
      var road2 = {};
      var subRoad1 = {};
      var subRoad2 = {};
      var sub2Road1 = {};
      var sub2Road2 = {};

      var allNeighbourRoads = [];
      road1 = {
        fieldId: action.payload.fieldId,
        roadId: action.payload.id - 1
      };
      road2 = { fieldId: action.payload.fieldId, roadId: action.payload.id };

      if (action.payload.id === 0)
        road1 = { fieldId: action.payload.fieldId, roadId: 5 };
      console.log(subSettlements);
      if (subSettlements) {
        subRoad1 = {
          fieldId: subSettlements[0].fieldId,
          roadId: subSettlements[0].settlementId - 1
        };
        subRoad2 = {
          fieldId: subSettlements[0].fieldId,
          roadId: subSettlements[0].settlementId
        };

        if (subSettlements[0].settlementId === 0)
          subRoad1 = { fieldId: subSettlements[0].fieldId, roadId: 5 };

        allNeighbourRoads.push(subRoad1);
        if (RoadCoords[subRoad1.fieldId][subRoad1.roadId])
          allNeighbourRoads.push(RoadCoords[subRoad1.fieldId][subRoad1.roadId]);

        allNeighbourRoads.push(subRoad2);
        if (RoadCoords[subRoad2.fieldId][subRoad2.roadId])
          allNeighbourRoads.push(RoadCoords[subRoad2.fieldId][subRoad2.roadId]);

        if (subSettlements.length > 1) {
          console.log(subSettlements);
          sub2Road1 = {
            fieldId: subSettlements[1].fieldId,
            roadId: subSettlements[1].settlementId - 1
          };
          sub2Road2 = {
            fieldId: subSettlements[1].fieldId,
            roadId: subSettlements[1].settlementId
          };

          if (subSettlements[1].settlementId === 0)
            sub2Road1 = { fieldId: subSettlements[1].fieldId, roadId: 5 };

          allNeighbourRoads.push(sub2Road1);
          if (RoadCoords[sub2Road1.fieldId][sub2Road1.roadId])
            allNeighbourRoads.push(
              RoadCoords[sub2Road1.fieldId][sub2Road1.roadId]
            );

          allNeighbourRoads.push(sub2Road2);
          if (RoadCoords[sub2Road2.fieldId][sub2Road2.roadId])
            allNeighbourRoads.push(
              RoadCoords[sub2Road2.fieldId][sub2Road2.roadId]
            );
        }
      }
      allNeighbourRoads.push(road1);
      if (RoadCoords[road1.fieldId][road1.roadId])
        allNeighbourRoads.push(RoadCoords[road1.fieldId][road1.roadId]);

      allNeighbourRoads.push(road2);

      if (RoadCoords[road2.fieldId][road2.roadId])
        allNeighbourRoads.push(RoadCoords[road2.fieldId][road2.roadId]);

      var isThereNeighbourRoad = false;

      state.roads.forEach(road => {
        allNeighbourRoads.forEach(roadToCheck => {
          console.log(roadToCheck);
          if (
            road.fieldId === roadToCheck.fieldId &&
            road.id === roadToCheck.roadId
          )
            isThereNeighbourRoad = true;
        });
      });

      var substituteStateRoads = [];
      state.roads.forEach(road => {
        if (RoadCoords[road.fieldId][road.id])
          substituteStateRoads.push(RoadCoords[road.fieldId][road.id]);
      });
      console.log(substituteStateRoads);
      if (!Object.getOwnPropertyNames(substituteStateRoads).length === 0) {
        substituteStateRoads.roads.forEach(road => {
          allNeighbourRoads.forEach(roadToCheck => {
            console.log(roadToCheck);
            if (
              road.fieldId === roadToCheck.fieldId &&
              road.roadId === roadToCheck.roadId
            )
              isThereNeighbourRoad = true;
          });
        });
      }

      console.log(isThereNeighbourRoad);

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
      if (isAlreadySettlement && action.payload.playerTurn > 2)
      {

        if(action.payload.isCity)
        return {
          ...state,
          message: "It is already a city"
        };

   
    }

      if (isAlreadySettlement)
        return {
          ...state,
          message: "It is already a settlement"
        };

      var checkNearbySettlements = false;
      allSubsSets.forEach(item => {
        state.settlements.forEach(item2 => {
          if (
            item.fieldId === item2.fieldId &&
            item.settlementId === item2.id
          ) {
            checkNearbySettlements = true;
          }
        });
      });
       console.log(allSubsSets);
      console.log(checkNearbySettlements);

      if (checkNearbySettlements) {
        return {
          ...state,
          message: "there is settlement nearby"
        };
      } else {
        if (
          action.payload.playerTurn < 2 &&
          state.settlements.find(x => x.playerId === action.payload.playerId)
        )
          return {
            ...state,
            message: "you cant make more settlements on first 2 turns"
          };
        else if (action.payload.playerTurn > 2) {
          

          if (isThereNeighbourRoad) {
            return Object.assign({}, state, {
              settlements: state.settlements.concat(action.payload),
              isSettlementCreated: true
            });
          } else
            return {
              ...state,
              message: "there is no nearby road"
            };
        } else if (action.payload.playerTurn === 2) {
          var filteredSettlements = state.settlements.filter(function(
            settlement
          ) {
            return settlement.playerId === action.payload.playerId;
          });
          if (filteredSettlements.length > 1) {
            return {
              ...state,
              message: "you cant make more settlements on first 2 turns"
            };
          } else
            return Object.assign({}, state, {
              settlements: state.settlements.concat(action.payload)
            });
        }  else {
          return Object.assign({}, state, {
            settlements: state.settlements.concat(action.payload)
          });
        }
      }

    case CREATE_SECOND_SETTLEMENT:
      var filteredSettlements = state.settlements.filter(function(settlement) {
        return settlement.playerId === action.payload.playerId;
      });

    case APPLY_ROAD:
      return {
        ...state,
        isVisible: true,
        message: action.message
      };
    case TOGGLE_ROAD_CREATE:
      return {
        ...state,
        isRoadCreated: false
      };
    case TOGGLE_SETTLEMENT_CREATE:
      return {
        ...state,
        isSettlementCreated: false
      };

    case CREATE_FIRST_ROAD:
      var road = action.payload;

      var newArray = state.settlements.filter(function(settlement) {
        return settlement.playerId === road.playerId;
      });
      var newArraySub = [];
      newArray.forEach(item =>
        newArraySub.push(SettlementCoords[item.fieldId][item.id])
      );
      console.log(newArraySub);

      var allRoads = [];
      var newSettlement = {};
      var newSettlement2 = {};
      var oldSettlement = {};

      if (newArraySub[1]) {
        var newSettlement3 = newArraySub[1][0];

        var newSettlementRoad3 = {
          fieldId: newSettlement3.fieldId,
          roadId: newSettlement3.settlementId - 1
        };
        var newSettlementRoad4 = {
          fieldId: newSettlement3.fieldId,
          roadId: newSettlement3.settlementId
        };

        if (newSettlement3.settlementId === 0)
          newSettlementRoad3 = { fieldId: newSettlement3.fieldId, roadId: 5 };

        if (newArraySub[1].length === 2) {
          var newSettlement4 = newArraySub[1][1];
          var newSettlement2Road3 = {
            fieldId: newSettlement4.fieldId,
            roadId: newSettlement4.settlementId - 1
          };
          var newSettlement2Road4 = {
            fieldId: newSettlement4.fieldId,
            roadId: newSettlement4.settlementId
          };

          if (newSettlement4.settlementId === 0)
            newSettlement2Road3 = {
              fieldId: newSettlement4.fieldId,
              roadId: 5
            };
          allRoads.push(newSettlement2Road3);
          allRoads.push(newSettlement2Road4);
        }
        allRoads.push(newSettlementRoad3);
        allRoads.push(newSettlementRoad4);
      }

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

        if (newArray.length > 1) secondSettlement = newArray[1];

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

        if (secondSettlement.id === 0)
          secondSettlementRoad1 = {
            fieldId: secondSettlement.fieldId,
            roadId: 5
          };
        allRoads.push(oldSettlementRoad1);
        allRoads.push(oldSettlementRoad2);
        allRoads.push(secondSettlementRoad1);
        allRoads.push(secondSettlementRoad2);
      }
      var isRoadLegit = false;
      var subMainRoad = RoadCoords[road.fieldId][road.id];

      allRoads.forEach(item => {
        console.log(item);
        if (item.fieldId === road.fieldId && item.roadId === road.id) {
          isRoadLegit = true;
        }
        if (subMainRoad)
          if (
            item.fieldId === subMainRoad.fieldId &&
            item.roadId === subMainRoad.roadId
          ) {
            isRoadLegit = true;
          }
      });
      console.log(isRoadLegit);

      if (!isRoadLegit) {
        return {
          ...state,
          message: "road not legit"
        };
      } else {
        if (
          action.payload.turn < 2 &&
          state.roads.find(x => x.playerId === action.payload.playerId)
        ) {
          return {
            ...state,
            message: "you cant make more roads on first 2 turns"
          };
        } else if (action.payload.turn === 2) {

          var filteredRoads = state.roads.filter(function(road) {
            return road.playerId === action.payload.playerId;
          });
          if (filteredRoads.length > 1) {
            return {
              ...state,
              message: "you cant make more roads on first 2 turns"
            };
          } else
            return Object.assign({}, state, {
              roads: state.roads.concat(action.payload)
            });
        } else {
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
          road.id === action.road.id && road.fieldId === action.road.fieldId
      );

      if (isAlreadyRoad)
        return {
          ...state,
          message: "It is already a road"
        };

      var substituteRoad = RoadCoords[action.road.fieldId][action.road.id];
      console.log(substituteRoad);
      var roadsToCheck = [];

      if (substituteRoad) {
        var substituteRoadNeighbour1 = {
          fieldId: substituteRoad.fieldId,
          roadId: substituteRoad.roadId - 1
        };
        var substituteRoadNeighbour2 = {
          fieldId: substituteRoad.fieldId,
          roadId: substituteRoad.roadId + 1
        };

        if (substituteRoad.roadId === 5)
          substituteRoadNeighbour2 = {
            fieldId: substituteRoad.fieldId,
            roadId: 0
          };

        if (substituteRoad.roadId === 0)
          var substituteRoadNeighbour1 = {
            fieldId: substituteRoad.fieldId,
            roadId: 5
          };

        roadsToCheck.push(substituteRoadNeighbour1);
        roadsToCheck.push(substituteRoadNeighbour2);
        if (
          RoadCoords[substituteRoadNeighbour1.fieldId][
            substituteRoadNeighbour1.roadId
          ]
        )
          roadsToCheck.push(
            RoadCoords[substituteRoadNeighbour1.fieldId][
              substituteRoadNeighbour1.roadId
            ]
          );
        if (
          RoadCoords[substituteRoadNeighbour2.fieldId][
            substituteRoadNeighbour2.roadId
          ]
        )
          roadsToCheck.push(
            RoadCoords[substituteRoadNeighbour2.fieldId][
              substituteRoadNeighbour2.roadId
            ]
          );
      }

      var neighbourRoad1 = {
        fieldId: action.road.fieldId,
        roadId: action.road.id - 1
      };
      var neighbourRoad2 = {
        fieldId: action.road.fieldId,
        roadId: action.road.id + 1
      };

      if (action.road.id === 5)
        neighbourRoad2 = { fieldId: action.road.fieldId, roadId: 0 };

      if (action.road.id === 0)
        neighbourRoad1 = { fieldId: action.road.fieldId, roadId: 5 };
      console.log(neighbourRoad1);
      roadsToCheck.push(neighbourRoad1);
      roadsToCheck.push(neighbourRoad2);
      if (RoadCoords[neighbourRoad1.fieldId][neighbourRoad1.roadId])
        roadsToCheck.push(
          RoadCoords[neighbourRoad1.fieldId][neighbourRoad1.roadId]
        );
      if (RoadCoords[neighbourRoad2.fieldId][neighbourRoad2.roadId])
        roadsToCheck.push(
          RoadCoords[neighbourRoad2.fieldId][neighbourRoad2.roadId]
        );

      var substituteAllRoads = [];
      state.roads.forEach(road => {
        if (RoadCoords[road.fieldId][road.id])
          substituteAllRoads.push(RoadCoords[road.fieldId][road.id]);
      });

      var checkIfThereIsNeighbourRoad = false;
      console.log(substituteAllRoads);
      substituteAllRoads.forEach(road => {
        roadsToCheck.forEach(roadToCheck => {
          if (
            road.id === roadToCheck.roadId &&
            road.fieldId === roadToCheck.fieldId 
          )
            checkIfThereIsNeighbourRoad = true;
        });
      });

      state.roads.forEach(road => {
        roadsToCheck.forEach(roadToCheck => {
          if (
            road.id === roadToCheck.roadId &&
            road.fieldId === roadToCheck.fieldId && action.road.playerId === road.playerId
          )
            checkIfThereIsNeighbourRoad = true;
        });
      });
      console.log(checkIfThereIsNeighbourRoad);

      if (checkIfThereIsNeighbourRoad)
        return Object.assign({}, state, {
          roads: state.roads.concat(action.road),
          isRoadCreated: true
        });
      else
        return {
          ...state,
          message: "no neighbour road"
        };

    case CREATE_ROAD:
      return Object.assign({}, state, {
        roads: state.roads.concat(action.payload)
      });

    default:
      return state;
  }
};

export default reducer;
