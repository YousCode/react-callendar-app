const defaultState = {
  modal: false,
};

export const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "OPEN MODAL":
      return { ...state, modal: action.payload };
    case "CLOSE MODAL":
      return { ...state, modal: action.payload };
    default:
      return state;
  }
};
