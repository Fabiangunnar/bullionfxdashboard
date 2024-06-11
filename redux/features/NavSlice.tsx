import { navData } from "@/data/sidenav";
import { createSlice } from "@reduxjs/toolkit";

interface initialTypes {
  navData: any[];
  prevPage: any[];
  currentPage: string;
  openNav: boolean;
}
const initialState: initialTypes = {
  navData,
  prevPage: ["user"],
  currentPage: "user",
  openNav: false,
};

export const NavSlice = createSlice({
  name: "nav-slice",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      if (state.prevPage.length <= 0) state.prevPage.push("user");
      state.prevPage.push(payload);
      state.currentPage = payload;
    },
    resetNav: (state) => {
      state.navData = navData;
    },
    setNavLink: (state, { payload }) => {
      const newNavData: any = state.navData.map((item) => {
        return item.id === payload.id
          ? { ...item, state: true }
          : { ...item, state: false };
      });
      state.navData = newNavData;
    },
    setPrevPage: (state) => {
      if (state.prevPage.length <= 0) return;
      state.prevPage.pop();
      const previousState = state.prevPage[state.prevPage.length - 1];
      if (previousState === undefined) return;
      state.currentPage = previousState;
    },
    setOpenNav: (state) => {
      state.openNav = !state.openNav;
    },
    closeNav: (state) => {
      state.openNav = false;
    },
  },
});
export const {
  setCurrentPage,
  setNavLink,
  setOpenNav,
  closeNav,
  resetNav,
  setPrevPage,
} = NavSlice.actions;
export default NavSlice.reducer;
