import React from "react";
import propTypes from "prop-types";

const ACTIVE_CLASS = `movie-nav__item movie-nav__item--active`;
const NO_ACTIVE_CLASS = `movie-nav__item`;

const Tabs = ({onClick, activeTab}) => {
  return (
    <nav className="movie-nav movie-card__nav">
      <ul className="movie-nav__list">
        <li className={activeTab === `Overview` ? ACTIVE_CLASS : NO_ACTIVE_CLASS}>
          <a className="movie-nav__link" onClick={onClick(`OVERVIEW`)}>Overview</a>
        </li>
        <li className={activeTab === `Details` ? ACTIVE_CLASS : NO_ACTIVE_CLASS}>
          <a className="movie-nav__link" onClick={onClick(`DETAILS`)}>Details</a>
        </li>
        <li className={activeTab === `Reviews` ? ACTIVE_CLASS : NO_ACTIVE_CLASS}>
          <a className="movie-nav__link" onClick={onClick(`REVIEWS`)}>Reviews</a>
        </li>
      </ul>
    </nav>
  );
};

Tabs.propTypes = {
  onClick: propTypes.func.isRequired,
  activeTab: propTypes.string.isRequired,
};

export default Tabs;
