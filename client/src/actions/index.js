import axios from "axios";
import {
  FETCH_USER,
  SET_MESSAGE,
  FETCH_SURVEYS,
  SET_ERROR,
} from "../constants";

export const fetchUser = () => async (dispatch, getState) => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch, getState) => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/api/surveys", values);

    dispatch({ type: SET_MESSAGE, payload: res.data });
    dispatch({ type: FETCH_USER, payload: res.data });

    history.push("/surveys");
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.response.data });
    history.push("/surveys");
  }
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
