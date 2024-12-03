import {
  FORGOT_EMAIL,
  LOGIN,
  RECORDINGS_DATA,
  REFRESHER,
  RESPONDENT_EMAIL,
  ROLE,
} from "./action";

const initState = {
  forgotEmail: "",
  respondentAccount: "",
  refresher: false,
  role: localStorage.getItem("rechtechrole")
    ? JSON.parse(localStorage.getItem("rechtechrole"))
    : sessionStorage.getItem("rechtechrole")
    ? JSON.parse(sessionStorage.getItem("rechtechrole"))
    : "",
  isLogin:
    localStorage.getItem("rechtechrole") ||
    sessionStorage.getItem("rechtechrole")
      ? true
      : false,
  recordingsData: [],
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
    case RESPONDENT_EMAIL:
      return { ...state, respondentAccount: action.payload };
    case RECORDINGS_DATA:
      return { ...state, recordingsData: action.payload };
    default:
      return state;
  }
}
