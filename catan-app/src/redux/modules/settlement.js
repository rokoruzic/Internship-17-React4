// import RoadCoords from "./../../constants/RoadCoords";
// import SettlementCoords from "./../../constants/SettlementCoords";
// import { init } from "events";
// // action types
// const ADD_PLAYER = "ADD_PLAYER";
// const EDIT_PLAYER_POINTS = "EDIT_PLAYER_POINTS";
// const SET_PLAYER_TURN = "SET_PLAYER_TURN";
// const SUBSTRACT_PLAYER_CARDS = "SUBSTRACT_PLAYER_CARDS";
// const ADD_PLAYER_CARDS = "ADD_PLAYER_CARDS";
// const CREATE_FIRST_SETTLEMENT = "CREATE_FIRST_SETTLEMENT";
// const CREATE_SECOND_SETTLEMENT = "CREATE_SECOND_SETTLEMENT";

// // initial state
// const initialState = {
//   settlements: [],
//   message: ""
// };

// // action creators
// export const createFirstSettlement = payload => dispatch => {
//   if (payload.playerTurn < 2)
//     dispatch({
//       type: CREATE_FIRST_SETTLEMENT,
//       payload
//     });
//   if (payload.playerTurn == 2)
//     dispatch({
//       type: CREATE_SECOND_SETTLEMENT,
//       payload
//     });
// };

// // reducer
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CREATE_FIRST_SETTLEMENT:
//       var neighbourSettlement1 = {
//         fieldId: action.payload.fieldId,
//         settlementId: action.payload.id - 1
//       };
//       var neighbourSettlement2 = {
//         fieldId: action.payload.fieldId,
//         settlementId: action.payload.id + 1
//       };

//       if (action.payload.id === 0)
//         neighbourSettlement1 = {
//           fieldId: action.payload.fieldId,
//           settlementId: 5
//         };
//       if (action.payload.id === 5)
//         neighbourSettlement2 = {
//           fieldId: action.payload.fieldId,
//           settlementId: 0
//         };

//       var settlementOneSubstitutions =
//         SettlementCoords[neighbourSettlement1.fieldId][
//           neighbourSettlement1.settlementId
//         ];
//       var settlementTwoSubstitutions =
//         SettlementCoords[neighbourSettlement2.fieldId][
//           neighbourSettlement2.settlementId
//         ];

//       var settlementSubstitutions =
//         SettlementCoords[action.payload.fieldId][action.payload.id];
//       var settlementSubstitutionsNeighbour1 = {};
//       var settlementSubstitutionsNeighbour2 = {};
//       var settlementSubstitutionsNeighbour3 = {};
//       var settlementSubstitutionsNeighbour4 = {};

//       if (settlementSubstitutions) {
//         settlementSubstitutionsNeighbour1 = {
//           fieldId: settlementSubstitutions[0].fieldId,
//           settlementId: settlementSubstitutions[0].settlementId - 1
//         };
//         settlementSubstitutionsNeighbour2 = {
//           fieldId: settlementSubstitutions[0].fieldId,
//           settlementId: settlementSubstitutions[0].settlementId + 1
//         };

//         if (settlementSubstitutions[0].settlementId === 0)
//           settlementSubstitutionsNeighbour1 = {
//             fieldId: settlementSubstitutions[0].fieldId,
//             settlementId: 5
//           };

//         if (settlementSubstitutions[0].settlementId === 5)
//           settlementSubstitutionsNeighbour2 = {
//             fieldId: settlementSubstitutions[0].fieldId,
//             settlementId: 0
//           };

//         if (settlementSubstitutions.length === 2) {
//           settlementSubstitutionsNeighbour3 = {
//             fieldId: settlementSubstitutions[1].fieldId,
//             settlementId: settlementSubstitutions[1].settlementId - 1
//           };
//           settlementSubstitutionsNeighbour4 = {
//             fieldId: settlementSubstitutions[1].fieldId,
//             settlementId: settlementSubstitutions[1].settlementId + 1
//           };

//           if (settlementSubstitutions[1].settlementId === 0)
//             settlementSubstitutionsNeighbour3 = {
//               fieldId: settlementSubstitutions[1].fieldId,
//               settlementId: 5
//             };

//           if (settlementSubstitutions[1].settlementId === 5)
//             settlementSubstitutionsNeighbour4 = {
//               fieldId: settlementSubstitutions[1].fieldId,
//               settlementId: 0
//             };
//         }
//       }

//       var checkSubstituteFirstSettlement = {};
//       var checkSubstituteSecondtSettlement = {};
//       var checkSubstituteThirdSettlement = {};
//       var checkSubstituteFourthSettlement = {};

//       checkSubstituteFirstSettlement = state.settlements.some(
//         settlement =>
//           settlement.id === settlementSubstitutionsNeighbour1.settlementId &&
//           settlement.fieldId === settlementSubstitutionsNeighbour1.fieldId
//       );
//       checkSubstituteSecondtSettlement = state.settlements.some(
//         settlement =>
//           settlement.id === settlementSubstitutionsNeighbour2.settlementId &&
//           settlement.fieldId === settlementSubstitutionsNeighbour2.fieldId
//       );
//       checkSubstituteThirdSettlement = state.settlements.some(
//         settlement =>
//           settlement.id === settlementSubstitutionsNeighbour3.settlementId &&
//           settlement.fieldId === settlementSubstitutionsNeighbour4.fieldId
//       );
//       checkSubstituteFourthSettlement = state.settlements.some(
//         settlement =>
//           settlement.id === settlementSubstitutionsNeighbour4.settlementId &&
//           settlement.fieldId === settlementSubstitutionsNeighbour4.fieldId
//       );

//       var checkFirstSettlement = state.settlements.some(
//         settlement =>
//           settlement.id === neighbourSettlement1.settlementId &&
//           settlement.fieldId === neighbourSettlement1.fieldId
//       );
//       var checkSecondSettlement = state.settlements.some(
//         settlement =>
//           settlement.id === neighbourSettlement2.settlementId &&
//           settlement.fieldId === neighbourSettlement2.fieldId
//       );

//       var checkThirdSettlement = {};
//       var checkFourthSettlement = {};
//       var checkSixthSettlement = {};
//       var checkSeventhSettlement = {};

//       if (settlementOneSubstitutions) {
//         checkThirdSettlement = state.settlements.some(
//           settlement =>
//             settlement.id === settlementOneSubstitutions[0].settlementId &&
//             settlement.fieldId === settlementOneSubstitutions[0].fieldId
//         );
//         if (settlementOneSubstitutions.length === 2)
//           checkFourthSettlement = state.settlements.some(
//             settlement =>
//               settlement.id === settlementOneSubstitutions[1].settlementId &&
//               settlement.fieldId === settlementOneSubstitutions[1].fieldId
//           );
//       }

//       if (settlementTwoSubstitutions) {
//         checkSixthSettlement = state.settlements.some(
//           settlement =>
//             settlement.id === settlementTwoSubstitutions[0].settlementId &&
//             settlement.fieldId === settlementTwoSubstitutions[0].fieldId
//         );
//         if (settlementTwoSubstitutions.length === 2)
//           checkSeventhSettlement = state.settlements.some(
//             settlement =>
//               settlement.id === settlementTwoSubstitutions[1].settlementId &&
//               settlement.fieldId === settlementTwoSubstitutions[1].fieldId
//           );
//       }

//       if (
//         checkSubstituteFirstSettlement ||
//         checkSubstituteSecondtSettlement ||
//         checkSubstituteThirdSettlement ||
//         checkSubstituteFourthSettlement ||
//         checkFirstSettlement ||
//         checkSecondSettlement ||
//         (!Object.getOwnPropertyNames(checkThirdSettlement).length === 0 &&
//           checkThirdSettlement) ||
//         (!Object.getOwnPropertyNames(checkFourthSettlement).length === 0 &&
//           checkFourthSettlement) ||
//         (!Object.getOwnPropertyNames(checkSixthSettlement).length === 0 &&
//           checkSixthSettlement) ||
//         (!Object.getOwnPropertyNames(checkSeventhSettlement).length === 0 &&
//           checkSeventhSettlement)
//       ) {
//         return {
//           ...state,
//           message: "there is settlement nearby"
//         };
//       }

//       var isAlreadySettlement = state.settlements.some(
//         settlement =>
//           settlement.id === action.payload.id &&
//           settlement.fieldId === action.payload.fieldId
//       );

//       if (isAlreadySettlement)
//         return {
//           ...state,
//           message: "It is already a settlement"
//         };

//       if (state.settlements.find(x => x.playerId === action.payload.playerId))
//         return {
//           ...state,
//           message: "you cant make more settlements on first turn"
//         };
//       else
//         return Object.assign({}, state, {
//           settlements: state.settlements.concat(action.payload)
//         });
//     case CREATE_SECOND_SETTLEMENT:
//       var filteredSettlements = state.settlements.filter(function(settlement) {
//         return settlement.playerId === action.payload.playerId;
//       });
//       console.log(filteredSettlements);
//       console.log(
//         state.settlements.find(x => x.playerId === action.payload.playerId)
//       );

//     default:
//       return state;
//   }
// };

// export default reducer;
