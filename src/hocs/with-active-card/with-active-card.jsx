import React, {PureComponent} from "react";

const TIMEOUT = 1000;

const withActiveCard = (Component) => {
  return class WithActiveCard extends PureComponent {
    constructor(props) {
      super(props);
      this.handleCardHover = this.handleCardHover.bind(this);
      this.handleCardOut = this.handleCardOut.bind(this);
      this.timer = null;

      this.state = {
        activeCard: -1,
      };
    }

    handleCardHover(id) {
      return (evt) => {
        evt.preventDefault();
        this.timer = setTimeout(() => {
          this.setState({
            activeCard: id,
          });
        }, TIMEOUT);
      };
    }

    handleCardOut() {
      clearTimeout(this.timer);
      this.setState({
        activeCard: -1,
      });
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
      this.handleCardHover = null;
      this.handleCardOut = null;
    }

    render() {
      return (
        <Component
          {...this.props}
          onMovieCardHover={this.handleCardHover}
          onMovieCardOut={this.handleCardOut}
          isPlayer={true}
          activeCard={this.state.activeCard}
        />
      );
    }
  };
};

export default withActiveCard;
