import React from "react";
import propTypes from "prop-types";

const ShowMore = ({onClick}) => {
  return (
    <div className="catalog__more" onClick={onClick}>
      <button className="catalog__button" type="button">Show more</button>
    </div>
  );
};

ShowMore.propTypes = {
  onClick: propTypes.func.isRequired,
};

export default ShowMore;
