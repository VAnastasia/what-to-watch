import React, {PureComponent, createRef} from "react";
import propTypes from "prop-types";
import Movie from "../../adapters/movie";
import history from "../../history.js";

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.formRef = createRef();
    this.reviewRef = createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
  }

  handleLogoClick(evt) {
    evt.preventDefault();
    history.push(`/`);
  }

  handleChange() {
    const {
      onSendingChange,
      onValidChange,
      onValidateMessageChange,
    } = this.props;

    if (this.reviewRef.current.value.length < 50 || this.reviewRef.current.value > 400) {
      onValidChange(false);
      onValidateMessageChange(`Length of review must be more 50 and less 400`);
      onSendingChange(false);
    } else {
      onValidChange(true);
      onValidateMessageChange(``);
    }
  }

  handleSubmit(evt) {
    const {
      onSubmit,
      onSendingChange,
      onValidateMessageChange,
    } = this.props;
    const {id} = this.props.film;

    evt.preventDefault();
    if (this.reviewRef.current.value.length < 50 || this.reviewRef.current.value > 400) {
      onValidateMessageChange(`Length of review must be more 50 and less 400`);
      onSendingChange(false);
    } else {
      onValidateMessageChange(``);
      onSendingChange(true);
      onSubmit({
        rating: this.formRef.current.elements.rating.value,
        review: this.reviewRef.current.value,
      }, id);
    }
  }

  componentWillUnmount() {
    const {deleteErrorMessage} = this.props;
    deleteErrorMessage();
  }

  render() {
    const {
      userBlock,
      film,
      errorMessage,
      isSending,
      validateMessage,
    } = this.props;

    const {
      title,
      backgroundImage,
      backgroundColor,
      posterImage,
    } = new Movie(film);
    return (
      <section className="movie-card movie-card--full" style={{backgroundColor}}>
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt="The Grand Budapest Hotel" />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="#" className="logo__link" onClick={this.handleLogoClick}>
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="movie-page.html" className="breadcrumbs__link">{title}</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
            {userBlock}
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={posterImage} alt={`${title} poster`} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form
            action="#"
            className="add-review__form"
            onSubmit={this.handleSubmit}
            ref={this.formRef}
          >
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" defaultChecked />
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="sign-in__message" style={{color: `red`}}>
              <p>{validateMessage ? validateMessage : errorMessage}</p>
            </div>

            <div className="add-review__text" style={{backgroundColor: `rgba(255, 255, 255, 0.3)`}}>
              <textarea
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"
                ref={this.reviewRef}
                onChange={this.handleChange}
              ></textarea>
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled={isSending ? `disabled` : ``}
                >
                  Post
                </button>
              </div>

            </div>
          </form>
        </div>
      </section>
    );
  }
}

AddReview.propTypes = {
  film: propTypes.object.isRequired,
  userBlock: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired,
  onSubmit: propTypes.func.isRequired,
  errorMessage: propTypes.string,
  deleteErrorMessage: propTypes.func.isRequired,
  isSending: propTypes.bool.isRequired,
  isValid: propTypes.bool.isRequired,
  validateMessage: propTypes.string.isRequired,
  onSendingChange: propTypes.func.isRequired,
  onValidChange: propTypes.func.isRequired,
  onValidateMessageChange: propTypes.func.isRequired,
};

export default AddReview;
