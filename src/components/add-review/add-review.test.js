import React from "react";
import renderer from "react-test-renderer";
import AddReview from "./add-review.jsx";
import {film} from "../../test-data";

const noop = () => {};

it(`AddReview renders correctly`, () => {
  const tree = renderer
    .create(
        <AddReview
          errorMessage={`error`}
          film={film}
          onSubmit={noop}
          userBlock={<div></div>}
          deleteErrorMessage={noop}
          isSending={false}
          isValid={true}
          validateMessage={`error`}
          onSendingChange={noop}
          onValidChange={noop}
          onValidateMessageChange={noop}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
