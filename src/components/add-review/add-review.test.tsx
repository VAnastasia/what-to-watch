import * as React from "react";
import * as renderer from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import AddReview from "./add-review";
import {film} from "../../test-data";
import {noop} from "../../const";

it(`AddReview renders correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
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
          />
        </MemoryRouter>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
