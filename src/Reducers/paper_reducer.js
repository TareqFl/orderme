import {
  CATEGORY_BUTTON,
  NOTIFICATION_BUTTON,
  MESSAGE_BUTTON,
  LANGUAGE_BUTTON,
} from "../Actions/Types";

const INITIAL_STATE = {
  category: false,
  notification: false,
  message: false,
  language: false,
};

export default function paper_reducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case CATEGORY_BUTTON:
      return (state = { ...state, category: payload });
    case NOTIFICATION_BUTTON:
      return (state = { ...state, notification: payload });
    case MESSAGE_BUTTON:
      return (state = { ...state, message: payload });
    case LANGUAGE_BUTTON:
      return (state = { ...state, language: payload });

    default:
      return state;
  }
}
