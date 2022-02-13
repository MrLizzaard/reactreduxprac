import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../modules/counter";

const CounterContainer = (props) => {
  const { number, diff } = useSelector((state) => ({
    number: state.counter.number,
    diff: state.counter.diff,
  }));
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(counterActions.increase());
  };

  const onDecrease = () => {
    dispatch(counterActions.decrease());
  };

  const onSetDiff = (diff) => {
    dispatch(counterActions.setDiff(diff));
  };

  return <Counter number={number} diff={diff} onIncrease={onIncrease} onDecrease={onDecrease} onSetDiff={onSetDiff} />;
};

// Counter
const Counter = ({ number, diff, onIncrease, onDecrease, onSetDiff }) => {
  const onChange = (e) => {
    onSetDiff(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <h1>{number}</h1>
      <div>
        <input type="number" value={diff} onChange={onChange} />
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  );
};

export default CounterContainer;
