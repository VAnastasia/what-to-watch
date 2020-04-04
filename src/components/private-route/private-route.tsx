import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../reducers/user/user";
import {getAuthorizationStatus} from "../../reducers/user/selectors";

type PrivateRouteProps = RouteProps & {
  authorizationStatus: string;
  exact: boolean;
  path: string;
  render: (param: RouteProps) => React.ReactNode;
}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = (props: PrivateRouteProps) => {
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

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
