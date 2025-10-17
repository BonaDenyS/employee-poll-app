import { render, screen, fireEvent } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "../components/login/Login";

jest.mock("../actions/authedUser", () => ({
    setAuthedUser: jest.fn((id) => ({ type: "SET_AUTHED_USER", id })),
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockStore = configureMockStore([thunk]);

describe("Login Component", () => {
    let store;

    const mockUsers = {
        sarahedo: { id: "sarahedo", name: "Sarah Edo", password: "password123" },
        tylermcginnis: { id: "tylermcginnis", name: "Tyler McGinnis", password: "abc123" },
    };

    beforeEach(() => {
        store = mockStore({ users: mockUsers });
        jest.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
    });

    it("renders login form correctly", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Employee Polls/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
        expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    });

    it("disables submit button when username or password is missing", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </Provider>
        );

        const button = screen.getByText("Submit");
        expect(button).toBeDisabled();

        fireEvent.change(screen.getByPlaceholderText("Username"), {
            target: { value: "sarahedo" },
        });
        expect(button).toBeDisabled();

        fireEvent.change(screen.getByPlaceholderText("Password"), {
            target: { value: "password123" },
        });
        expect(button).not.toBeDisabled();
    });
});
