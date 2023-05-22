import { TOASTER, TOASTER_SUCCESS, TOASTER_ERROR } from "../Actions/Types";
import { toast } from "react-toastify";

const INITIAL_STATE = "none";

export default function toaster_reducer(state = INITIAL_STATE, action) {
  const { payload } = action;

  switch (action.type) {
    case TOASTER:
      return toast(payload, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    case TOASTER_SUCCESS:
      return toast.success(payload, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    case TOASTER_ERROR:
      return toast.error(payload, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

    default:
      return state;
  }
}
