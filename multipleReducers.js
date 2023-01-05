const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const bindActionCreators = redux.bindActionCreators;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const BUY_CAR = "BUY_CAR";
const SELL_CAR = "SELL_CAR";
const BUY_BIKE = "BUY_BIKE";
const SELL_BIKE = "SELL_BIKE";
const BUY_AUTO = "BUY_AUTO";
const SELL_AUTO = "SELL_AUTO";

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

function buyAuto() {
  return {
    type: BUY_AUTO,
    info: "Buying a auto",
  };
}

function sellAuto(num = 1) {
  return {
    type: SELL_AUTO,
    quantity: num,
  };
}

// initial state
const initialCarState = {
  numOfCars: 10,
};

const initialBikeState = {
  numOfBikes: 15,
};

const initialAutoState = {
  numOfAutos: 10,
};

// reducers
const carReducer = (state = initialCarState, action) => {
  switch (action.type) {
    case BUY_CAR:
      return { ...state, numOfCars: state.numOfCars - 1 };

    case SELL_CAR:
      return { ...state, numOfCars: state.numOfCars + action.quantity };

    default:
      return state;
  }
};

const bikeReducer = (state = initialBikeState, action) => {
  switch (action.type) {
    case BUY_BIKE:
      return { ...state, numOfBikes: state.numOfBikes - 1 };

    case SELL_BIKE:
      return { ...state, numOfBikes: state.numOfBikes + action.quantity };

    default:
      return state;
  }
};

const autoReducer = (state = initialAutoState, action) => {
  switch (action.type) {
    case BUY_AUTO:
      return { ...state, numOfAutos: state.numOfAutos - 1 };

    case SELL_AUTO:
      return { ...state, numOfAutos: state.numOfAutos + action.quantity };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  car: carReducer,
  bike: bikeReducer,
  auto: autoReducer,
});

// console.log("root reducer -> ", rootReducer);

// store
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Initial state", store.getState());
const unsubscribe = store.subscribe(
  () => {}
  //   console.log(
  //     "The store is getting updated. The new state is -> ",
  //     store.getState()
  //   )
);

const actions = bindActionCreators(
  {
    buyCar,
    buyBike,
    buyAuto,
    sellAuto,
    sellBike,
    sellCar,
  },
  store.dispatch
);

// store.dispatch(buyCar());
// store.dispatch(buyCar());
// store.dispatch(buyCar());
// store.dispatch(buyCar());
// // selling the car
// store.dispatch(sellCar());
// store.dispatch(sellCar(5));
// store.dispatch(buyCar());
// store.dispatch(buyCar());
// store.dispatch(sellCar(3));
// // unsubscribe(); // optional
// // console.log("after unsubscription");

// store.dispatch(buyBike());
// store.dispatch(buyBike());
// store.dispatch(buyBike());
// store.dispatch(sellBike());
// store.dispatch(sellBike(5));

// // calling autos
// store.dispatch(buyAuto());
// store.dispatch(buyAuto());
// store.dispatch(buyAuto());
// store.dispatch(sellAuto());
// store.dispatch(sellAuto(10));

actions.buyAuto();
actions.buyBike();
actions.buyCar();
actions.sellAuto(2);
actions.sellBike(2);
actions.sellCar(5);
