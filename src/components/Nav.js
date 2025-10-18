import { Link, useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";

const Nav = (props) => {
    const { authedUser, dispatch, user } = props;
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(setAuthedUser(null));
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/leaderboard">Leaderboard</Link></li>
                <li><Link to="/new">New</Link></li>
            </ul>
            <div className="user-info">
                {authedUser && user && <span className="username">{user.name}</span>}
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
        </nav >
    );
};

const mapStateToProps = ({ authedUser, users }) => ({
    authedUser,
    user: users[authedUser],
});

export default connect(mapStateToProps)(Nav);