import loggedUserReducer from "./reducers/loggedUserReducer";
import notificationReducer from "./reducers/notificationReducer";

import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

// Configure the Redux store holding the state of the app.
const store = configureStore({
  reducer: {
    loggedUser: loggedUserReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IRootState = ReturnType<typeof store.getState>;

// Inferred type: {loggedUser: IUser | null, notification: INotification | null}
export type AppDispatch = typeof store.dispatch;
