const counterActionType = {
  INCREASE: "INCREASE",
  DECREASE: "DECREASE",
  SET_DIFF: "SET_DIFF",
};

export const counterActions = {
  increase: () => ({ type: counterActionType.INCREASE }),
  decrease: () => ({ type: counterActionType.DECREASE }),
  setDiff: (diff) => ({ type: counterActionType.SET_DIFF, diff }),
};

const initialState = {
  number: 0,
  diff: 1,
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case counterActionType.INCREASE:
      return {
        ...state,
        number: state.number + state.diff,
      };
    case counterActionType.DECREASE:
      return {
        ...state,
        number: state.number - state.diff,
      };
    case counterActionType.SET_DIFF:
      return {
        ...state,
        diff: action.diff,
      };
    default:
      return state;
  }
}
