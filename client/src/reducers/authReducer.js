import { FETCH_USER } from "../constants";

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload.user || false;
    default:
      return state;
  }
}
