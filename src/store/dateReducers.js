import dayjs from "dayjs";

const defaultState = {
  date: dayjs(),
};

export const dateReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE DATE":
      return { ...state, date: action.payload };
    default:
      return state;
  }
};
