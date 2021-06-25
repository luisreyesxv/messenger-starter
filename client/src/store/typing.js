import { addTyper, removeTyper } from "./utils/reducerFunctions";

// ACTIONS

const ADD_TYPING = "ADD_TYPER";
const REMOVE_TYPING = "REMOVE_TYPER";

// ACTION CREATORS
export const addTyping = (id) => {
  return {
    type: ADD_TYPING,
    id,
  };
};

export const removeTyping = (id) => {
  return {
    type: REMOVE_TYPING,
    id,
  };
};

//   REDUCER

const reducer = (state = new Set(), action) => {
  switch (action.type) {
    case ADD_TYPING:
      return addTyper(state, action.id);
    case REMOVE_TYPING:
      return removeTyper(state, action.id);
    default:
      return state;
  }
};

export default reducer;
