import Home from './home/Home';
import { useEffect, Fragment } from 'react';
import Nav from './Nav';
import NewPoll from './new/NewPoll';
import Login from './login/Login';
import Poll from './poll/Poll';
import Leaderboard from './leaderboard/Leaderboard';
import { Routes, Route } from "react-router-dom";
import Profile from './profile/Profile';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <div className='container'>
        {props.isLoggedIn ? <Nav /> : null}
        {props.loading === true ? (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/new" element={<NewPoll />} />
            <Route path="/poll" element={<Poll />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        )}
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
  isLoggedIn: authedUser !== null,
});

export default connect(mapStateToProps)(App);
