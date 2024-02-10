import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import { INotification } from "../types/notification";

const initialState: INotification | null = null as INotification | null;

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (_state, action: PayloadAction<INotification | null>) => {
      return action.payload;
    },
  },
});

const { showNotification } = notificationSlice.actions;

let timeoutId: number;
export const setNotification = (
  notification: INotification | null,
  timeoutInSeconds: number = 5,
) => {
  return async (dispatch: Dispatch) => {
    dispatch(showNotification(notification));
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      dispatch(showNotification(null));
    }, timeoutInSeconds * 1000);
  };
};

export default notificationSlice.reducer;
