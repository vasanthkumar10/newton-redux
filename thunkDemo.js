const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const axios = require("axios");
const thunkMiddleware = require("redux-thunk").default;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

function fetchUserRequested() {
  return {
    type: FETCH_USERS_REQUESTED,
  };
}

function fetchUserSucceeded(users) {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
}

function fetchUserFailed(error) {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return { ...state, loading: true };

    case FETCH_USERS_SUCCEEDED:
      return { ...state, loading: false, users: action.payload, error: "" };

    case FETCH_USERS_FAILED:
      return { ...state, loading: false, users: [], error: action.payload };

    default:
      return state;
  }
};

// thunk expects a function to be passed to the dispatch
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequested());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // console.log("response", response.data);
        const users = response.data.map((user) => user.name);
        dispatch(fetchUserSucceeded(users));
      })
      .catch((err) => {
        dispatch(fetchUserFailed(err.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));
console.log("Initial state is ", store.getState());
const unsubscribe = store.subscribe(() => {
  //   console.log("updating the user --> ", store.getState());
});
store.dispatch(fetchUsers());
