import * as React from "react";
import {Subtract} from "utility-types";

interface State {
  isSending: boolean;
  isValid: boolean;
  validateMessage: string;
}

interface InjectingProps {
  onSendingChange: (value: boolean) => void;
  onValidChange: (value: boolean) => void;
  onValidateMessageChange: (value: string) => void;
}

const withForm = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  return class WithForm extends React.PureComponent<T, State> {
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
