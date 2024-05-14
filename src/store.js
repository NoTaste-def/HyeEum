import { createSlice, configureStore } from "@reduxjs/toolkit";

const userUpdate = createSlice({
  name: "userUpdate",
  initialState: {
    polite: true,
    birth: "",
    user_name: "",
  },
  reducers: {
    UpdateUser(state, action) {
      state.userUpdate = action.payload;
    },
  },
});

const toggleState = createSlice({
  name: "toggleState",
  initialState: {
    polite: true,
  },
  reducers: {
    SetIsOn(state, action) {
      state.polite = action.payload;
    },
  },
});

// export let { 함수들 } = 어쩌구.actions;

export let { modify } = userUpdate.actions;
export let { SetIsOn } = toggleState.actions;

export default configureStore({
  reducer: {
    // 작명 : state이름.reducer <--- .reducer 안쓰면 적용 안됨.
    userUpdate: userUpdate.reducer,
    toggleState: toggleState.reducer,
  },
});
