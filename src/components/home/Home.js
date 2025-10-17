import { useNavigate } from "react-router-dom";
import authedUser from "../../reducers/authedUser";
import "./Home.css";
import QuestionCard from "./QuestionCard";
import { connect } from "react-redux";
import { useEffect } from "react";

const Home = (props) => {
    const navigate = useNavigate();
    const openQuestion = props.questions.filter(q => q.active);
    const closeQuestion = props.questions.filter(q => !q.active)

    useEffect(() => {
        if (props.authedUser === null) {
            navigate("/login");
        }
    }, [authedUser, navigate]);

    return (
        <div className="home-container">
            <div className="questions-container">
                <QuestionCard questions={openQuestion} title={"New Questions"} />
                <QuestionCard questions={closeQuestion} title={"Done"} />
            </div>
        </div>
    );
};

const mapStateToProps = ({ questions, authedUser }) => ({
    questions: Object.values(questions).sort(
        (a, b) => b.timestamp - a.timestamp
    ),
    authedUser,
});

export default connect(mapStateToProps)(Home);
