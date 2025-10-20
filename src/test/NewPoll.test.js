import { render, screen, fireEvent, act } from "@testing-library/react";
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

const mockStore = configureMockStore([thunk || thunk.default]);

describe("NewPoll Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({});
        jest.clearAllMocks();
    });

    it("renders the form with title and input fields", () => {
        store.dispatch = jest.fn();

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
        store.dispatch = jest.fn();

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
        store.dispatch = jest.fn();

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

    it("dispatches action and navigates on valid submit", async () => {
        store.dispatch = jest.fn();

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <NewPoll />
                </MemoryRouter>
            </Provider>
        );

        const dispatchSpy = jest.spyOn(store, "dispatch").mockImplementation(() => ({}));

        fireEvent.change(screen.getByPlaceholderText("Option One"), {
            target: { value: "Have super strength" },
        });
        fireEvent.change(screen.getByPlaceholderText("Option Two"), {
            target: { value: "Read minds" },
        });

        await act(async () => {
            fireEvent.click(screen.getByText("Submit"));
        });

        expect(handleAddQuestion).toHaveBeenCalledTimes(1);
        expect(handleAddQuestion).toHaveBeenCalledWith({
            optionOneText: "Have super strength",
            optionTwoText: "Read minds",
        });

        expect(dispatchSpy).toHaveBeenCalled();

        expect(mockNavigate).toHaveBeenCalledWith("/");

        expect(document.body).toMatchSnapshot();

        dispatchSpy.mockRestore();
    });
});
