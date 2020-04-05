import * as React from "react";
import {Subtract} from "utility-types";
import {TabName} from "../../const";

interface State {
  activeTab: string;
}

interface InjectingProps {
  onClick: (tab: string) => void;
}

const withActiveTab = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  return class WithActiveTab extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.handleTabClick = this.handleTabClick.bind(this);

      this.state = {
        activeTab: TabName.OVERVIEW,
      };
    }

    handleTabClick(tab) {
      this.setState({
        activeTab: TabName[tab],
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          activeTab={this.state.activeTab}
          onClick={this.handleTabClick}
        />
      );
    }
  };
};

export default withActiveTab;
