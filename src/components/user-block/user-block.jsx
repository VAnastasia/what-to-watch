import React from "react";
import {Link} from "react-router-dom";
import propTypes from "prop-types";

const UserBlock = ({authorizationStatus, avatarUrl}) => {
  return (
    <div className="user-block">
      {authorizationStatus === `AUTH` ? (
        <Link to="/mylist">
          <div className="user-block__avatar">
            <img src={avatarUrl} alt="User avatar" width="63" height="63" />
          </div>
        </Link>
      ) : (
        <Link to="/login" href="#" className="user-block__link">Sign in</Link>
      )}
    </div>
  );
};

UserBlock.propTypes = {
  authorizationStatus: propTypes.string.isRequired,
  avatarUrl: propTypes.string.isRequired,
};

export default UserBlock;
