import dayjs from "dayjs";

const defaultState = {
  timeStart: dayjs(),
  timeEnd: dayjs().add(1, "hour"),
};

export const timeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE TIME START":
      return { ...state, timeStart: action.payload };
    case "CHANGE TIME END":
      return { ...state, timeEnd: action.payload };
    default:
      return state;
  }
};
