import { NAVIGATION } from "../Actions/Types";

const INITIALE_STATE = {
  page: "home",
  data: null,
};

export default function Navigation(state = INITIALE_STATE, action) {
  switch (action.type) {
    case NAVIGATION:
      return (state = action.payload);

    default:
      return state;
  }
}
