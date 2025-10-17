import React, { useState } from "react";
import "./Login.css";
import { setAuthedUser } from "../../actions/authedUser";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Login = (props) => {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password);
    const { dispatch, users } = props;
    const isUserVerify = Object.values(users).find((u) => 
      u.id === username && u.password === password
    );

    if (isUserVerify) {
      dispatch(setAuthedUser(username))
      navigate("/");
    } else {
      dispatch(setAuthedUser(null))
      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <h1 className="title">Employee Polls</h1>

      <img
        src="login_logo.webp"
        alt="Employee Polls"
        className="logo-login"
      />

      <div className="login-box">
        <h2 className="subtitle">Log In</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUser(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button
            type="submit"
            disabled={!username || !password}
            className={`submit-btn ${username && password ? "active" : ""}`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps)(Login);
