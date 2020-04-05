import * as React from "react";
import {mount, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from "react-router-dom";
import AddReview from "./add-review";
import {film} from "../../test-data";
import {noop} from "../../const";

configure({
  adapter: new Adapter(),
});

it(`Should form be submit`, () => {
  const onSendingChange = jest.fn();
  const onValidChange = jest.fn();
  const onValidateMessageChange = jest.fn();

  const addReview = mount(
      <MemoryRouter>
        <AddReview
          errorMessage={`error`}
          film={film}
          userBlock={<div></div>}
          isSending={false}
          isValid={true}
          validateMessage={`error`}
          onSubmit={noop}
          deleteErrorMessage={noop}
          onSendingChange={onSendingChange}
          onValidChange={onValidChange}
          onValidateMessageChange={onValidateMessageChange}
        />
      </MemoryRouter>
  );

  const form = addReview.find(`form`);
  const rating = addReview.find(`.rating__stars`);

  form.simulate(`submit`);
  rating.simulate(`change`);
  expect(onSendingChange.mock.calls.length).toBe(1);
  expect(onValidateMessageChange.mock.calls.length).toBe(2);
  expect(onValidChange.mock.calls.length).toBe(1);
});
