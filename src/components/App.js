import { useEffect, Fragment } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

import Nav from './Nav';
import Home from './home/Home';
import NewPoll from './new/NewPoll';
import Login from './login/Login';
import Poll from './poll/Poll';
import Leaderboard from './leaderboard/Leaderboard';
import Profile from './profile/Profile';
import PrivateRoute from './PrivateRoute';
import NotFound from './notfound/NotFound';
import Loading from './loading/Loading';

function App({ dispatch, isLoggedIn, loading }) {

  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="container">
        {isLoggedIn && <Nav />}
        {loading && <Loading />}
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute>
                <Leaderboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/new"
            element={
              <PrivateRoute>
                <NewPoll />
              </PrivateRoute>
            }
          />
          <Route
            path="/poll/:id"
            element={
              <PrivateRoute>
                <Poll />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <NotFound />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser, loading }) => ({
  isLoggedIn: authedUser !== null,
  loading,
});

export default connect(mapStateToProps)(App);
