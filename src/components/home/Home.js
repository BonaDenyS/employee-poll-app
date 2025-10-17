import { useNavigate } from "react-router-dom";
import "./Home.css";
import QuestionCard from "./QuestionCard";
import { connect } from "react-redux";
import { useEffect } from "react";

const Home = (props) => {
    const navigate = useNavigate();
    const { authedUser, questions } = props;
    
    const openQuestion = questions.filter(q => q.active);
    const closeQuestion = questions.filter(q => !q.active)

    useEffect(() => {
        console.log("wkwk: ", authedUser);
        if (!authedUser) {
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
