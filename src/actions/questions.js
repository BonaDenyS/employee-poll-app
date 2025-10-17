import { saveQuestion, saveQuestionAnswer } from "../utils/api";
import { hideLoading, showLoading } from "./loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER = "ADD_ANSWER";

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    };
}

export function handleAddQuestion({ optionOneText, optionTwoText }) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        const author = authedUser;

        dispatch(showLoading());

        return saveQuestion({
            optionOneText, optionTwoText, author
        })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(hideLoading()));
    };
}

function addAnswer({ authedUser, qid, answer }) {
    return {
        type: ADD_ANSWER,
        qid,
        authedUser,
        answer,
    };
}

export function handleAddAnswer({ qid, answer }) {
    return (dispatch, getState) => {
        const { authedUser } = getState();
        dispatch(showLoading());

        console.log("wkwk: ", authedUser, qid, answer);

        return saveQuestionAnswer({
            authedUser, qid, answer
        })
            .then(() => dispatch(addAnswer({ authedUser, qid, answer })))
            .then(() => dispatch(hideLoading()));
    }
};

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}