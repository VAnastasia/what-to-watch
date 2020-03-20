import React from "react";
import {Link} from "react-router-dom";
import propTypes from "prop-types";

const UserBlock = ({authorizationStatus}) => {
  return (
    <div className="user-block">
      {authorizationStatus === `AUTH` ? (
        <div className="user-block__avatar">
          <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      ) : (
        <Link to="/login" href="sign-in.html" className="user-block__link">Sign in</Link>
      )}
    </div>
  );
};

UserBlock.propTypes = {
  authorizationStatus: propTypes.string.isRequired,
};

export default UserBlock;
