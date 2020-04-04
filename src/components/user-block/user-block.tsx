import * as React from "react";
import {Link} from "react-router-dom";
import {AuthorizationStatus} from "../../const";

interface Props {
  authorizationStatus: string;
  avatarUrl: string;
}

const UserBlock: React.FunctionComponent<Props> = (props: Props) => {
  const {authorizationStatus, avatarUrl} = props;
  return (
    <div className="user-block">
      {authorizationStatus === AuthorizationStatus.AUTH ? (
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

export default UserBlock;
