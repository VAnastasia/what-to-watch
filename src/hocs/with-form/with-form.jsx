import React, {PureComponent} from "react";

const withForm = (Component) => {
  return class WithForm extends PureComponent {
    constructor(props) {
      super(props);
      this.handleSendingChange = this.handleSendingChange.bind(this);
      this.handleValidChange = this.handleValidChange.bind(this);
      this.handleValidateMessageChange = this.handleValidateMessageChange.bind(this);

      this.state = {
        isSending: false,
        isValid: false,
        validateMessage: ``,
      };
    }

    handleSendingChange(value) {
      this.setState({
        isSending: value,
      });
    }

    handleValidChange(value) {
      this.setState({
        isValid: value,
      });
    }

    handleValidateMessageChange(value) {
      this.setState({
        validateMessage: value,
      });
    }

    render() {
      return (
        <Component
          {...this.props}
          isSending={this.state.isSending}
          isValid={this.state.isValid}
          validateMessage={this.state.validateMessage}
          onSendingChange={this.handleSendingChange}
          onValidChange={this.handleValidChange}
          onValidateMessageChange={this.handleValidateMessageChange}
        />
      );
    }
  };
};

export default withForm;
