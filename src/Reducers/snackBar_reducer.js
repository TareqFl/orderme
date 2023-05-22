import { SNACKBAR } from "../Actions/Types";

const INITIAL_STATE = {
  open: false,
  message: "",
};

export default function snackBar(state = INITIAL_STATE, action) {
  if (action.type === SNACKBAR) {
    return (state = action.payload);
  } else {
    return state;
  }
}
