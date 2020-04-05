import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  activeCard: number;
}

interface InjectingProps {
  onMovieCardHover: (id: number) => void;
  onMovieCardOut: () => void;
  isPlayer: boolean;
}

const TIMEOUT = 1000;

const withActiveCard = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  return class WithActiveCard extends React.PureComponent<T, State> {
    private timer: ReturnType<typeof setTimeout>;

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
      this.timer = setTimeout(() => {
        this.setState({
          activeCard: id,
        });
      }, TIMEOUT);
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
