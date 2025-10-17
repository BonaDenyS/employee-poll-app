import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "../components/home/Home";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockStore = configureStore([]);

describe("Home Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("redirects to /login when authedUser is null", () => {
    const store = mockStore({
      authedUser: null,
      questions: {},
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("does NOT redirect when authedUser is set", () => {
    const store = mockStore({
      authedUser: "sarahedo",
      questions: {},
    });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
