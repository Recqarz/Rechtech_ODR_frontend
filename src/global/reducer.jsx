import { FORGOT_EMAIL, LOGIN, REFRESHER, ROLE } from "./action";

const initState = {
  forgotEmail: "",
  refresher: false,
  role: localStorage.getItem("rechtechrole")
    ? JSON.parse(localStorage.getItem("rechtechrole"))
    : "",
  isLogin : localStorage.getItem("rechtechrole")? true:false,
};

export function Reducer(state = initState, action) {
  switch (action.type) {
    case FORGOT_EMAIL:
      return { ...state, forgotEmail: action.payload };
    case REFRESHER:
      return { ...state, refresher: action.payload };
    case ROLE:
      return { ...state, role: action.payload };
    case LOGIN:
      return { ...state, isLogin: action.payload };
    default:
      return state;
  }
}
