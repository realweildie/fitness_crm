import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../models/IUser";
import { baseInstance } from "../API/instance";

interface UserSliceState {
  username: string;
  token: string;
  phoneNumber: string;
  isAdmin: boolean | null;
}

export const doLogin = createAsyncThunk<any, IUser>(
  "user/login",
  async ({ phoneNumber, password }) => {
    const { data } = await baseInstance.post("user/login/", {
      phoneNumber,
      password,
    });
    return data;
  }
);

// change to defaults
const initialState: UserSliceState = {
  username: "",
  token: "",
  phoneNumber: "",
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, action) => {
      state.username = action.payload.user.name;
      state.token = action.payload.user.token;
      state.phoneNumber = action.payload.user.phoneNumber;
      state.isAdmin = action.payload.user.isAdmin;
    });
  },
});

export default userSlice.reducer;
