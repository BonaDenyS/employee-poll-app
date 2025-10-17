import React from "react";
import "./Leaderboard.css";
import { connect } from "react-redux";

const Leaderboard = (props) => {
  return (
    <div className="leaderboard-container">
      <div className="leaderboard-table">
        <table>
          <thead>
            <tr>
              <th>Users</th>
              <th>Answered</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {props.users.map((user, index) => (
              <tr key={index}>
                <td className="user-info">
                  <img src={user.avatar} alt={user.name} className="user-avatar" />
                  <div>
                    <p className="user-name">{user.name}</p>
                    <p className="user-username">{user.username}</p>
                  </div>
                </td>
                <td>{user.answered}</td>
                <td>{user.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users).map((user) => ({
    avatar: user.avatarURL,
    name: user.name,
    username: user.id,
    answered: Object.keys(user.answers).length,
    created: user.questions.length,
  })),
});


export default connect(mapStateToProps)(Leaderboard);
