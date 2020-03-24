import React, {PureComponent, createRef} from "react";
import propTypes from "prop-types";
import Movie from "../../adapters/movie";

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.formRef = createRef();
    this.reviewRef = createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;
    const {id} = this.props.film;

    evt.preventDefault();
    console.log({
      rating: this.formRef.current.elements.rating.value,
      review: this.reviewRef.current.value,
    });

    onSubmit({
      rating: this.formRef.current.elements.rating.value,
      review: this.reviewRef.current.value,
    }, id);
  }

  render() {
    const {userBlock, film} = this.props;

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
              <a href="main.html" className="logo__link">
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
          <form action="#" className="add-review__form" onSubmit={this.handleSubmit} ref={this.formRef}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" checked />
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" ref={this.reviewRef}></textarea>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit">Post</button>
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
};

export default AddReview;
