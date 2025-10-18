import { SET_AUTHED_USER } from "../actions/authedUser";

export default function authedUser(state = loadAuthedUser(), action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      saveAuthedUser(action.id);
      return action.id;
    default:
      return state;
  }
}

function saveAuthedUser(id) {
  try {
    if (id) {
      localStorage.setItem("authedUser", id);
    } else {
      localStorage.removeItem("authedUser");
    }
  } catch (err) {
    console.error("Error saving authedUser to localStorage", err);
  }
}

function loadAuthedUser() {
  try {
    const stored = localStorage.getItem("authedUser");
    return stored ? stored : null;
  } catch (err) {
    console.error("Error loading authedUser from localStorage", err);
    return null;
  }
}
