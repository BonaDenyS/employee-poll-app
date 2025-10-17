import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import NewPoll from "../components/new/NewPoll";
import { handleAddQuestion } from "../actions/questions";

jest.mock("../actions/questions", () => ({
    handleAddQuestion: jest.fn((data) => ({
        type: "ADD_QUESTION",
        payload: data,
    })),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

const mockStore = configureMockStore([thunk]);

describe("NewPoll Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
        jest.clearAllMocks();
    });

    it("renders the form with title and input fields", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <NewPoll />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText("Would You Rather")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Option One")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Option Two")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeDisabled();
    });

    it("enables submit button when both options are filled", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <NewPoll />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.change(screen.getByPlaceholderText("Option One"), {
            target: { value: "Be invisible" },
        });
        fireEvent.change(screen.getByPlaceholderText("Option Two"), {
            target: { value: "Fly" },
        });

        expect(screen.getByText("Submit")).not.toBeDisabled();
    });

    it("does not dispatch or navigate if inputs are empty", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <NewPoll />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.submit(screen.getByRole("button", { name: /submit/i }));
        expect(handleAddQuestion).not.toHaveBeenCalled();
        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
