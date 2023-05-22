import { AUTH } from "../Actions/Types";

const INITIAL_STATE = {
  username: "Guest",
  auth: false,
};

export default function auth_reducer(state = INITIAL_STATE, action) {
  if (action.type === AUTH) {
    return (state = action.payload);
  } else {
    return state;
  }
}
