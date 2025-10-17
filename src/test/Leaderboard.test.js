import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Leaderboard from "../components/leaderboard/Leaderboard";

const mockStore = configureMockStore();

describe("Leaderboard Component", () => {
    it("renders leaderboard table with user data", () => {
        const store = mockStore({
            users: {
                sarahedo: {
                    id: "sarahedo",
                    name: "Sarah Edo",
                    avatarURL: "https://example.com/sarah.png",
                    answers: { q1: "optionOne", q2: "optionTwo" },
                    questions: ["q1", "q3"],
                },
                tylermcginnis: {
                    id: "tylermcginnis",
                    name: "Tyler McGinnis",
                    avatarURL: "https://example.com/tyler.png",
                    answers: { q1: "optionOne" },
                    questions: ["q2"],
                },
            },
        });

        render(
            <Provider store={store}>
                <Leaderboard />
            </Provider>
        );

        expect(screen.getByText("Users")).toBeInTheDocument();
        expect(screen.getByText("Answered")).toBeInTheDocument();
        expect(screen.getByText("Created")).toBeInTheDocument();

        expect(screen.getByText("Sarah Edo")).toBeInTheDocument();
        expect(screen.getByText("sarahedo")).toBeInTheDocument();
        expect(screen.getByText("Tyler McGinnis")).toBeInTheDocument();
        expect(screen.getByText("tylermcginnis")).toBeInTheDocument();
    });
});
