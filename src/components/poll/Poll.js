import { useParams, useNavigate } from "react-router-dom";
import "./Poll.css";
import { connect } from "react-redux";
import { handleAddAnswer } from "../../actions/questions";
import NotFound from "../notfound/NotFound";

const Poll = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { questions, users, dispatch } = props;

  const question = questions[id];

  if (!question) {
    return <NotFound />;
  }

  const user = users[question.author];
  const name = user?.name || "Unknown";

  function toSentenceCase(text) {
    return text
      .toLowerCase()
      .split(/([.!?]\s*)/)
      .map((part) =>
        part.charAt(0).match(/[a-z]/i)
          ? part.charAt(0).toUpperCase() + part.slice(1)
          : part
      )
      .join('');
  }

  const handlePollAnswer = (qid, answer) => {
    if (!qid || !answer) return;

    dispatch(handleAddAnswer({ qid, answer }));
    navigate("/");
  };

  return (
    <div className="poll-container">
      <h2 className="poll-author">Poll by {name}</h2>

      {user && (
        <img
          className="poll-avatar"
          src={user.avatarURL}
          alt={`${name}'s avatar`}
        />
      )}

      <h3 className="poll-title">Would You Rather</h3>

      <div className="poll-options">
        <div className="poll-option">
          <p>{toSentenceCase(question.optionOne.text)}</p>
          <button onClick={() => handlePollAnswer(question.id, "optionOne")}>
            Click
          </button>
        </div>

        <div className="poll-option">
          <p>{toSentenceCase(question.optionTwo.text)}</p>
          <button onClick={() => handlePollAnswer(question.id, "optionTwo")}>
            Click
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser, questions }) => ({
  users,
  authedUser,
  questions,
});

export default connect(mapStateToProps)(Poll);
