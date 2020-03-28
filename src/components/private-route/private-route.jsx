import React from "react";
import propTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../reducers/user/user.js";
import {getAuthorizationStatus} from "../../reducers/user/selectors.js";

const PrivateRoute = (props) => {
  const {render, path, exact, authorizationStatus} = props;

  return (
    <Route
      path={path}
      exact={exact}
      render={(param) => {
        return (
          authorizationStatus === AuthorizationStatus.AUTH
            ? render(param)
            : <Redirect to="/login" />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: propTypes.string.isRequired,
  exact: propTypes.bool.isRequired,
  path: propTypes.string.isRequired,
  render: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
