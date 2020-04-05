import * as React from "react";
import * as renderer from "react-test-renderer";
import withForm from "./with-form";
import {noop} from "../../const";

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withForm(MockComponent);

it(`withForm is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      isSending={false}
      isValid={true}
      validateMessage={``}
      onSendingChange={noop}
      onValidChange={noop}
      onValidateMessageChange={noop}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
