import * as React from "react";
import * as renderer from "react-test-renderer";
import withActiveTab from "./with-active-tab";
import {noop} from "../../const";

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withActiveTab(MockComponent);

it(`withActiveTab is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      activeTab={`Overview`}
      onClick={noop}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
