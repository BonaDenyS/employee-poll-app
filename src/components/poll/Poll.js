import { useLocation, useNavigate } from "react-router-dom";
import "./Poll.css";
import { connect } from "react-redux";
import { handleAddAnswer } from "../../actions/questions";

const Poll = (props) => {

  const navigate = useNavigate();
  const location = useLocation();
  const { question } = location.state || {};
  const user = props.users[question.author]
  const name = user.name

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
    const { dispatch } = props;

    if (!qid || !answer) {
      return
    }

    dispatch(handleAddAnswer({ qid, answer }));
    navigate("/");
  };

  return (
    <div className="poll-container">
      <h2 className="poll-author">Poll by {name}</h2>

      <img
        className="poll-avatar"
        src={user.avatarURL}
        alt="Author Avatar"
      />

      <h3 className="poll-title">Would You Rather</h3>

      <div className="poll-options">
        <div className="poll-option">
          <p>{toSentenceCase(question.optionOne.text)}</p>
          <button
            onClick={() => handlePollAnswer(question.id, "optionOne")}
          >Click</button>
        </div>

        <div className="poll-option">
          <p>{toSentenceCase(question.optionTwo.text)}</p>
          <button
            onClick={() => handlePollAnswer(question.id, "optionTwo")}
          >Click</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authedUser }) => ({
  users,
  authedUser,
});

export default connect(mapStateToProps)(Poll);
