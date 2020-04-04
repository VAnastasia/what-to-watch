import * as React from "react";
import * as renderer from "react-test-renderer";
import ShowMore from "./show-more";
import {noop} from "../../const";

it(`ShowMore component render correctly`, () => {
  const tree = renderer.create(
      <ShowMore
        onClick={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
