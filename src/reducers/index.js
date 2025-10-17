import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import loadingBar from "./loadingBar";
import questions from "./questions";

export default combineReducers({
  authedUser,
  users,
  questions,
  loadingBar,
});
