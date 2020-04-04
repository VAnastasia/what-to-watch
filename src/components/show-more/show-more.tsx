import * as React from "react";

interface Props {
  onClick: () => void;
}

const ShowMore: React.FunctionComponent<Props> = (props: Props) => {
  const {onClick} = props;
  return (<div className="catalog__more" onClick={onClick}>
    <button className="catalog__button" type="button">Show more</button>
  </div>);
};

export default ShowMore;
