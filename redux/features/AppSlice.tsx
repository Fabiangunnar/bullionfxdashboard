import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginAdminApi,
  GetUserApi,
  UpdateUserApi,
  GetAllUsersApi,
} from "../services/appServices";

export interface AdminType {
  username: string;
  password: string;
  id: string;
}
export interface UserTypes {
  id: string;
  fullname: string;
  username: string;
  email: string;
  password: string;
  balance: number;
  createdAt?: string;
}

let adminInfo: AdminType = {
  username: "",
  password: "",
  id: "",
};

let users: UserTypes[] = [];

const userManageData: UserTypes = {
  id: "",
  fullname: "",
  username: "",
  email: "",
  password: "",
  balance: 0,
  createdAt: "",
};

interface initialTypes {
  adminInfo: AdminType | null;
  userState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  usersState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };

  getState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };

  sendState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  updateState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  updateDepositState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  adminState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  adminState2: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  adminState3: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  errorMessage: {
    statusCode: number;
    message: string;
  };
  users: UserTypes[];
  userManageData: UserTypes;
}
const initialState: initialTypes = {
  adminInfo,
  users,
  userManageData,
  userState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  usersState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  getState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  sendState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  updateState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  updateDepositState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  adminState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  adminState2: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  adminState3: {
    isLoading: false,
    isError: false,
    isSuccess: false,
  },
  errorMessage: {
    statusCode: 0,
    message: "",
  },
};

// export const getAdmin: any = createAsyncThunk(
//   "get/admin",
//   async (id, thunkApi) => {
//     try {
//       return await GetAdminApi(id);
//     } catch (error: any) {
//       return thunkApi.rejectWithValue(error.response.data);
//     }
//   }
// );

export const login: any = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      return await loginAdminApi(userData);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const updateUser: any = createAsyncThunk(
  "update/user",
  async ([id, accountInfo]: any, thunkApi) => {
    try {
      return await UpdateUserApi(id, accountInfo);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
export const getUser: any = createAsyncThunk(
  "get/myuser",
  async (id, thunkApi) => {
    try {
      return await GetUserApi(id);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const logout: any = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      if (window !== undefined) {
        localStorage.removeItem("admin");
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers: any = createAsyncThunk(
  "get/allusers",
  async (_, thunkApi) => {
    try {
      return await GetAllUsersApi();
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const AppSlice = createSlice({
  name: "app-slice",
  initialState,
  reducers: {
    reset: (state) => {
      state.userState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetUsersState: (state) => {
      state.usersState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetSendState: (state) => {
      state.sendState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetUpdateState: (state) => {
      state.updateState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetAdminState: (state) => {
      state.adminState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetUpdateDepositState: (state) => {
      state.updateDepositState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    resetAdmin3State: (state) => {
      state.adminState3 = {
        isLoading: false,
        isError: false,
        isSuccess: false,
      };
    },
    setUserManageData: (state, { payload }) => {
      state.userManageData = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.adminInfo = payload;
        state.adminState.isLoading = false;
        state.adminState.isSuccess = true;
        state.adminState.isError = false;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.adminState.isLoading = false;
        state.adminState.isSuccess = false;
        state.adminState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(login.pending, (state, { payload }) => {
        state.adminState.isLoading = true;
        state.adminState.isSuccess = false;
        state.adminState.isError = false;
      });

    builder
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.userState.isLoading = false;
        state.userState.isSuccess = true;
        state.userState.isError = false;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.userState.isLoading = false;
        state.userState.isSuccess = false;
        state.userState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getAllUsers.pending, (state, { payload }) => {
        state.userState.isLoading = true;
        state.userState.isSuccess = false;
        state.userState.isError = false;
      });
    builder
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = true;
        state.getState.isError = false;
        state.userManageData = payload;
      })
      .addCase(getUser.rejected, (state, { payload }) => {
        state.getState.isLoading = false;
        state.getState.isSuccess = false;
        state.getState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getUser.pending, (state, { payload }) => {
        state.getState.isLoading = true;
        state.getState.isSuccess = false;
        state.getState.isError = false;
      });
    builder
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.updateState.isLoading = false;
        state.updateState.isSuccess = true;
        state.updateState.isError = false;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.updateState.isLoading = false;
        state.updateState.isSuccess = false;
        state.updateState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(updateUser.pending, (state, { payload }) => {
        state.updateState.isLoading = true;
        state.updateState.isSuccess = false;
        state.updateState.isError = false;
      });

    // builder
    //   .addCase(getAdmin.fulfilled, (state, { payload }) => {
    //     state.adminInfo = payload;
    //     state.adminState2.isLoading = false;
    //     state.adminState2.isSuccess = true;
    //     state.adminState2.isError = false;
    //   })
    //   .addCase(getAdmin.rejected, (state, { payload }) => {
    //     state.adminState2.isLoading = false;
    //     state.adminState2.isSuccess = false;
    //     state.adminState2.isError = true;
    //     state.errorMessage = payload;
    //   })
    //   .addCase(getAdmin.pending, (state, { payload }) => {
    //     state.adminState2.isLoading = true;
    //     state.adminState2.isSuccess = false;
    //     state.adminState2.isError = false;
    //   });
  },
});
export const {
  resetAdminState,
  resetUsersState,
  resetAdmin3State,
  resetUpdateState,
  resetUpdateDepositState,
  reset,
  setUserManageData,
  resetSendState,
} = AppSlice.actions;
export default AppSlice.reducer;
