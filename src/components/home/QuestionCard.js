import { useNavigate } from "react-router-dom";
import "./Home.css";

const QuestionCard = ({ questions, title }) => {

    const navigate = useNavigate();

    const formatTimestamp = (timestamp) => {
        const dateObj = new Date(timestamp);
        const time = dateObj.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        const date = dateObj.toLocaleDateString([], {
            month: "numeric",
            day: "numeric",
            year: "numeric",
        });
        return `${time} | ${date}`;
    };

    const handleShowPoll = (question) => {
        navigate(`/poll/${question.id}`);
    };

    return (
        <section className="questions-section">
            <h2 className="section-title">{title}</h2>
            <div className="cards-container">
                {questions.map((q) => (
                    <div key={q.id} className="question-card">
                        <h3>{q.author}</h3>
                        <p>
                            {formatTimestamp(q.timestamp)}
                        </p>
                        <button
                            className="show-btn"
                            data-id={q.id}
                            onClick={
                                () => handleShowPoll(q)
                            }>Show</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default QuestionCard;