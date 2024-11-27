import { FORGOT_EMAIL, REFRESHER, ROLE } from "./action";

const initState = {
  forgotEmail: "",
  refresher: false,
  role: localStorage.getItem("rechtechrole")
    ? JSON.parse(localStorage.getItem("rechtechrole"))
    : "",
};

export function Reducer(state = initState, action) {
  switch (action.type) {
    case FORGOT_EMAIL:
      return { ...state, forgotEmail: action.payload };
    case REFRESHER:
      return { ...state, refresher: action.payload };
    case ROLE:
      return { ...state, role: action.payload };
    default:
      return state;
  }
}
