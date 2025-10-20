import { render, screen, fireEvent } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { Provider } from "react-redux";
import { MemoryRouter, useNavigate, useParams } from "react-router-dom";
import Poll from "../components/poll/Poll";

jest.mock("../actions/questions", () => ({
    handleAddAnswer: jest.fn(() => ({ type: "ADD_ANSWER" })),
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
    useParams: jest.fn(),
    useLocation: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockStore = configureMockStore([thunk.default || thunk]);

describe("Poll Component", () => {
    let store;

    const mockQuestion = {
        id: "question_1",
        author: "sarahedo",
        optionOne: { text: "be invisible" },
        optionTwo: { text: "fly" },
    };

    const mockUser = {
        sarahedo: {
            id: "sarahedo",
            name: "Sarah Edo",
            avatarURL: "https://placekitten.com/100/100",
        },
    };

    beforeEach(() => {
        store = mockStore({
            users: mockUser,
            authedUser: "sarahedo",
            questions: { question_1: mockQuestion },
        });

        jest.clearAllMocks();

        const router = require("react-router-dom");
        router.useNavigate.mockReturnValue(mockNavigate);
        router.useParams.mockReturnValue({ id: "question_1" });
        router.useLocation.mockReturnValue({
            state: { question: mockQuestion },
        });
    });

    it("renders poll question and author info", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Poll />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Poll by Sarah Edo/i)).toBeInTheDocument();
        expect(screen.getByText(/Would You Rather/i)).toBeInTheDocument();
        expect(screen.getByText(/Be invisible/i)).toBeInTheDocument();
        expect(screen.getByText(/Fly/i)).toBeInTheDocument();
    });

    it("does nothing if qid or answer is missing", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Poll />
                </MemoryRouter>
            </Provider>
        );

        const { handleAddAnswer } = require("../actions/questions");
        expect(handleAddAnswer).not.toHaveBeenCalled();
    });
});
