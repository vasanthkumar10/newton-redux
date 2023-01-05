// redux -> good to know topic
// Redux -> predictable state management tool

// managing state -> useState and useReducer

// smaller applications -> 20-30 components or 100 states
// then suggested way is using USECONTEXT AND USEREDUCER

// REDUX -> for larger applications
// It makes the code more complex

// Redux -> all JS related frameworks including Vanilla Js
// react-redux -> bridge between react and redux

// ----------------------------
// REDUX - 3 main principles
// ----------------------------

/**
 * Store --> holds the state of the entire application -> always use 1 store
 * Action --> describes the event -> what happened in the components
 * Reducer --> connects my action with the store
 */

// Note:
// 1. The state of the entire application is stored in a single object(store)
// 2. The only way to change the state is by emitting(dispatch) an action
// 3. To specify how the state is going to change, define the ways in reducer

const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAR = "BUY_CAR";
const SELL_CAR = "SELL_CAR";
const BUY_BIKE = "BUY__BIKE";
const SELL_BIKE = "SELL_BIKE";

// action obj -> type which specifies the action
// let obj = {
//   type: BUY_CAR,
//   payload: {},
//   info: "Buying a car",
// };

// Action creator
function buyCar() {
  return {
    type: BUY_CAR,
    info: "Buying a car",
  };
}

function sellCar(num = 1) {
  return {
    type: SELL_CAR,
    quantity: num,
  };
}

function buyBike() {
  return {
    type: BUY_BIKE,
    info: "Buying a bike",
  };
}

function sellBike(num = 1) {
  return {
    type: SELL_BIKE,
    quantity: num,
  };
}

// initial state
const initialState = {
  numOfCars: 10,
  numOfBikes: 15,
};

// reducers
const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAR:
      return { ...state, numOfCars: state.numOfCars - 1 };

    case SELL_CAR:
      return { ...state, numOfCars: state.numOfCars + action.quantity };

    case BUY_BIKE:
      return { ...state, numOfBikes: state.numOfBikes - 1 };

    case SELL_BIKE:
      return { ...state, numOfBikes: state.numOfBikes + action.quantity };

    default:
      return state;
  }
};

// store
const store = createStore(carReducer);
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log(
    "The store is getting updated. The new state is -> ",
    store.getState()
  )
);
store.dispatch(buyCar());
store.dispatch(buyCar());
store.dispatch(buyCar());
store.dispatch(buyCar());
// selling the car
store.dispatch(sellCar());
store.dispatch(sellCar(5));
store.dispatch(buyCar());
store.dispatch(buyCar());
store.dispatch(sellCar(3));
// unsubscribe(); // optional
// console.log("after unsubscription");

store.dispatch(buyBike());
store.dispatch(buyBike());
store.dispatch(buyBike());
store.dispatch(sellBike());
store.dispatch(sellBike(5));
