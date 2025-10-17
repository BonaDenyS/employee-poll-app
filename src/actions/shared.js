import { getInitialData } from "../utils/api";
import { setAuthedUser } from "./authedUser";
import { hideLoading, showLoading } from "./loading";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";

// const AUTHED_ID = "tylermcginnis";
const AUTHED_ID = null;

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData().then(({ users, questions }) => {
            dispatch(receiveUsers(users));
            dispatch(receiveQuestions(questions));
            dispatch(setAuthedUser(AUTHED_ID));
            dispatch(hideLoading());
        });
    };
}