import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentPostsPage: 1,
  postsPerPage: 15,
  posts: [0, 1, 3, 5],
};

const MgmtSlice = createSlice({
  name: "mgmtSlice",
  initialState,
  reducers: {
    setPostsPerPage: (state, { payload }) => {
      state.postsPerPage = payload;
    },
  },
});
export const { setPostsPerPage } = MgmtSlice.actions;
export default MgmtSlice.reducer;
