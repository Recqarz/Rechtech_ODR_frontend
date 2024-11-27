export const FORGOT_EMAIL = "FORGOT_EMAIL";
export const REFRESHER = "REFRESHER";
export const ROLE = "ROLE";

export const forgotEmail = (payload) => {
  return {
    type: FORGOT_EMAIL,
    payload,
  };
};

export const refreshers = (payload) => {
  return {
    type: REFRESHER,
    payload,
  };
};

export const updateRole = (payload) => {
  return {
    type: ROLE,
    payload,
  };
};

