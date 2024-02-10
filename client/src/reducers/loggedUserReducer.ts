import { IUser } from "../types/user";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUser | null = null as IUser | null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (_state, action: PayloadAction<IUser | null>) => {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
