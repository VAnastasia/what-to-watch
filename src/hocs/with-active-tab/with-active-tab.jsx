import React, {PureComponent} from "react";
import {TabName} from "../../const";

const withActiveTab = (Component) => {
  return class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.handleTabClick = this.handleTabClick.bind(this);

      this.state = {
        activeTab: TabName.OVERVIEW,
      };
    }

    handleTabClick(tab) {
      return () => {
        this.setState({
          activeTab: TabName[tab],
        });
      };
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
