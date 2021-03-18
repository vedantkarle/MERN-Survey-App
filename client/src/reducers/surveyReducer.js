import {
  SET_MESSAGE,
  REMOVE_MESSAGE,
  FETCH_SURVEYS,
  SET_ERROR,
} from "../constants";

export default function (
  state = { message: null, error: null, surveys: null },
  action
) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return { ...state, surveys: action.payload };
    case SET_MESSAGE:
      return { ...state, message: action.payload.message };
    case SET_ERROR:
      return { ...state, error: action.payload.error };
    case REMOVE_MESSAGE:
      return { message: "" };
    default:
      return state;
  }
}
