import { Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ authedUser, children }) => {
  const location = useLocation();

  if (authedUser === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(PrivateRoute);
