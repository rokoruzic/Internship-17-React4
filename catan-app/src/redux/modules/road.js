// import RoadCoords from "./../../constants/RoadCoords";
// import SettlementCoords from "./../../constants/SettlementCoords";
// // action types
// const APPLY_ROAD = "APPLY_ROAD";
// const SHOW_ERROR = "SHOW_ERROR";
// const INCREMENT_ID = "INCREMENT_ID";
// const ADD_ROAD = "ADD_ROAD";
// const CHECK_ROAD_CONNECTION = "CHECK_ROAD_CONNECTION";
// const CREATE_ROAD = "CREATE_ROAD";
// const ADD_FIRST_ROAD = "ADD_FIRST_ROAD";

// // initial state
// const initialState = {
//   fieldId: 5,
//   color: "blue",
//   roads: []
// };

// // action creators
// export const applyRoad = () => {
//   return {
//     type: APPLY_ROAD
//   };
// };
// export const createRoad = payload => dispatch => {
//     dispatch({
//       type: CREATE_ROAD,payload
//     });
//   };

//   export const addFirstRoad = payload => dispatch => {
//     dispatch({
//       type: ADD_FIRST_ROAD,payload
//     });
//   };

// export const addRoad = road => dispatch => {
//   if (road.isRoad)
//     dispatch({
//       type: "ALREADY_ROAD"
//     });
//   var neighbourSettlement1 = {
//     fieldId: road.fieldId,
//     settlementId: road.roadId
//   };
//   var neighbourSettlement2 = {
//     fieldId: road.fieldId,
//     settlementId: road.roadId + 1
//   };
//   if (road.roadId === 5)
//     neighbourSettlement2 = { fieldId: road.fieldId, settlementId: 0 };

//   var neighbourRoads = [];

//   var neighbourSettlement1Road1 = { fieldId: neighbourSettlement1.fieldId, roadId: neighbourSettlement1.settlementId - 1 };
//   var neighbourSettlement1Road2 = { fieldId: neighbourSettlement1.fieldId, roadId: neighbourSettlement1.settlementId };

//   if (neighbourSettlement1.settlementId === 0)
//     neighbourSettlement1Road1 = { fieldId: neighbourSettlement1.fieldId, roadId: 5 };

//   neighbourRoads.push(neighbourSettlement1Road1);
//   neighbourRoads.push(neighbourSettlement1Road2);

//   var neighbourSettlement2Road1 = { fieldId: neighbourSettlement2.fieldId, roadId: neighbourSettlement2.settlementId - 1  };
//   var neighbourSettlement2Road2 = { fieldId: neighbourSettlement2.fieldId, roadId: neighbourSettlement2.settlementId };

//   if (neighbourSettlement2.settlementId === 0)
//     neighbourSettlement2Road1 = { fieldId: neighbourSettlement2.fieldId, roadId: 5 };


//     neighbourRoads.push(neighbourSettlement2Road1);
//     neighbourRoads.push(neighbourSettlement2Road2);

//   var settlementOneSubstitutions = SettlementCoords[neighbourSettlement1.fieldId][neighbourSettlement1.settlementId];

//   if (settlementOneSubstitutions) {
//     var settlementOneSubstitutionsRoad1 = {  field: settlementOneSubstitutions[0].fieldId, roadId: settlementOneSubstitutions[0].settlementId - 1 };
//     var settlementOneSubstitutionsRoad2 = { field: settlementOneSubstitutions[0].fieldId, roadId: settlementOneSubstitutions[0].settlementId };

//     if (settlementOneSubstitutions[0].settlementId === 0)
//       settlementOneSubstitutionsRoad1 = { field: settlementOneSubstitutions[0].fieldId, roadId: 5 };

//     neighbourRoads.push(settlementOneSubstitutionsRoad1);
//     neighbourRoads.push(settlementOneSubstitutionsRoad2);

//     var isThereMoreThanOneSubstitutionForSettlementOne = settlementOneSubstitutions.length === 2;
//     if (isThereMoreThanOneSubstitutionForSettlementOne) {


//       var settlementTwoSubstitutionsRoad1 = {  field: settlementOneSubstitutions[1].fieldId, roadId: settlementOneSubstitutions[1].settlementId - 1 };
//       var settlementTwoSubstitutionsRoad2 = { field: settlementOneSubstitutions[1].fieldId, roadId: settlementOneSubstitutions[1].settlementId };
  

//       if (settlementOneSubstitutions[1].settlementId === 0)
//         settlementTwoSubstitutionsRoad2 = { field: settlementOneSubstitutions[1].fieldId, roadId: 5 };

//       neighbourRoads.push(settlementTwoSubstitutionsRoad1);
//       neighbourRoads.push(settlementTwoSubstitutionsRoad2);
//     }
//   }


//   var settlementTwoSubstitutions = SettlementCoords[neighbourSettlement2.fieldId][neighbourSettlement2.settlementId];

//   if (settlementTwoSubstitutions) {

//       var settlementTwoSubstitutionsRoad1 = {  field: settlementTwoSubstitutions[0].fieldId, roadId: settlementTwoSubstitutions[0].settlementId - 1 };
//       var settlementTwoSubstitutionsRoad2 = { field: settlementTwoSubstitutions[0].fieldId, roadId: settlementTwoSubstitutions[0].settlementId };

//       if (settlementTwoSubstitutions[0].settlementId === 0)
//         settlementTwoSubstitutionsRoad1 = { field: settlementTwoSubstitutions[0].fieldId, roadId: 5 };

//       neighbourRoads.push(settlementTwoSubstitutionsRoad1);
//       neighbourRoads.push(settlementTwoSubstitutionsRoad2);

//       var isThereMoreThanTwoSubstitutionForSettlementTwo = settlementTwoSubstitutions.length === 2;
//       if (isThereMoreThanTwoSubstitutionForSettlementTwo) {


//         var settlementTwoSubstitutionsRoad1 = {  field: settlementTwoSubstitutions[1].fieldId, roadId: settlementTwoSubstitutions[1].settlementId - 1 };
//         var settlementTwoSubstitutionsRoad2 = { field: settlementTwoSubstitutions[1].fieldId, roadId: settlementTwoSubstitutions[1].settlementId };
    

//         if (settlementTwoSubstitutions[1].settlementId === 0)
//           settlementTwoSubstitutionsRoad2 = { field: settlementTwoSubstitutions[1].fieldId, roadId: 5 };

//         neighbourRoads.push(settlementTwoSubstitutionsRoad1);
//         neighbourRoads.push(settlementTwoSubstitutionsRoad2);


//         console.log(neighbourRoads);
//     }
//   }


//   dispatch({
//     type: ADD_ROAD,
//     road
//   });
// };
// export const incrementId = () => {
//   return {
//     type: INCREMENT_ID
//   };
// };

// export const showError = message => {
//   return {
//     type: SHOW_ERROR,
//     message: message
//   };
// };

// // reducer
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case APPLY_ROAD:
//       return {
//         ...state,
//         isVisible: true,
//         message: action.message
//       };
//       case ADD_FIRST_ROAD:
//       var road = action.payload;
//       var neighbourSettlement1 = {
//         fieldId: road.fieldId,
//         settlementId: road.roadId
//       };
//       var neighbourSettlement2 = {
//         fieldId: road.fieldId,
//         settlementId: road.roadId + 1
//       };
//       if (road.roadId === 5)
//         neighbourSettlement2 = { fieldId: road.fieldId, settlementId: 0 };

//     var settlementOneSubstitutions = SettlementCoords[neighbourSettlement1.fieldId][neighbourSettlement1.settlementId];


//      var settlementTwoSubstitutions = SettlementCoords[neighbourSettlement2.fieldId][neighbourSettlement2.settlementId];

   
    



//     case SHOW_ERROR:
//       return {
//         ...state,
//         isVisible: false,
//         message: ""
//       };
//     case INCREMENT_ID:
//       return {
//         ...state,
//         fieldId: state.fieldId + 1
//       };
//     case ADD_ROAD:
//       return Object.assign({}, state, {
//         roads: state.roads.concat(action.payload)
//       });
      
//       case CREATE_ROAD:
//       return Object.assign({}, state, {
//         roads: state.roads.concat(action.payload)
//       });


//     default:
//       return state;
//   }
// };

// export default reducer;
