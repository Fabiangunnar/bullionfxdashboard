import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginAdminApi,
  GetUserApi,
  UpdateUserApi,
  GetAllUsersApi,
  UpdateUserCurrencyApi,
  GetTransactionsApi,
  DeleteTransactionApi,
  CreateTransactionApi,
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
  btc_balance: number;
  eth_balance: number;
  usdt_balance: number;
  xrp_balance: number;
  createdAt?: string;
}
export interface TransactionType {
  id: string;
  message: string;
  userId: string;
  createdAt: string;
  user: {
    username: string;
    fullname: string;
    email: string;
  };
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
  btc_balance: 0,
  eth_balance: 0,
  usdt_balance: 0,
  xrp_balance: 0,
};
interface QueryState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}
const queryState: QueryState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
};
interface initialTypes {
  adminInfo: AdminType | null;
  userState: QueryState;
  usersState: QueryState;
  createTransactionState: QueryState;
  getTransactionState: QueryState;
  transactionState: QueryState;
  getState: QueryState;
  sendState: QueryState;
  updateState: QueryState;
  updateDepositState: QueryState;
  adminState: QueryState;
  adminState2: QueryState;
  adminState3: QueryState;
  errorMessage: {
    statusCode: number;
    message: string;
  };
  users: UserTypes[];
  transactions: TransactionType[];
  userManageData: UserTypes;
}
const initialState: initialTypes = {
  adminInfo,
  users,
  transactions: [],
  userManageData,
  userState: queryState,
  usersState: queryState,
  getState: queryState,
  sendState: queryState,
  updateState: queryState,
  updateDepositState: queryState,
  adminState: queryState,
  adminState2: queryState,
  adminState3: queryState,
  getTransactionState: queryState,
  createTransactionState: queryState,
  transactionState: queryState,
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

export const updateUserCurrencyBalance: any = createAsyncThunk(
  "update/user/currency/balance",
  async ([id, currencyid, accountInfo]: any, thunkApi) => {
    try {
      return await UpdateUserCurrencyApi(id, currencyid, accountInfo);
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
export const createTransaction: any = createAsyncThunk(
  "create/transaction",
  async ([id, accountInfo]: any, thunkApi) => {
    try {
      return await CreateTransactionApi(id, accountInfo);
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

export const getTransactions: any = createAsyncThunk(
  "get/transactions",
  async (id: string, thunkApi) => {
    try {
      return await GetTransactionsApi(id);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const deleteTransaction: any = createAsyncThunk(
  "delete/transactions",
  async (id: string, thunkApi) => {
    try {
      return await DeleteTransactionApi(id);
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
    resetTransactionState: (state) => {
      state.transactionState = queryState;
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
    builder
      .addCase(updateUserCurrencyBalance.fulfilled, (state, { payload }) => {
        state.updateState.isLoading = false;
        state.updateState.isSuccess = true;
        state.updateState.isError = false;
      })
      .addCase(updateUserCurrencyBalance.rejected, (state, { payload }) => {
        state.updateState.isLoading = false;
        state.updateState.isSuccess = false;
        state.updateState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(updateUserCurrencyBalance.pending, (state, { payload }) => {
        state.updateState.isLoading = true;
        state.updateState.isSuccess = false;
        state.updateState.isError = false;
      });
    builder
      .addCase(getTransactions.fulfilled, (state, { payload }) => {
        state.getTransactionState.isLoading = false;
        state.getTransactionState.isSuccess = true;
        state.getTransactionState.isError = false;
        state.transactions = payload;
      })
      .addCase(getTransactions.rejected, (state, { payload }) => {
        state.getTransactionState.isLoading = false;
        state.getTransactionState.isSuccess = false;
        state.getTransactionState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getTransactions.pending, (state, { payload }) => {
        state.getTransactionState.isLoading = true;
        state.getTransactionState.isSuccess = false;
        state.getTransactionState.isError = false;
      });
    builder
      .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
        state.transactionState.isLoading = false;
        state.transactionState.isSuccess = true;
        state.transactionState.isError = false;
      })
      .addCase(deleteTransaction.rejected, (state, { payload }) => {
        state.transactionState.isLoading = false;
        state.transactionState.isSuccess = false;
        state.transactionState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(deleteTransaction.pending, (state, { payload }) => {
        state.transactionState.isLoading = true;
        state.transactionState.isSuccess = false;
        state.transactionState.isError = false;
      });

    builder
      .addCase(createTransaction.fulfilled, (state, { payload }) => {
        state.createTransactionState.isLoading = false;
        state.createTransactionState.isSuccess = true;
        state.createTransactionState.isError = false;
      })
      .addCase(createTransaction.rejected, (state, { payload }) => {
        state.createTransactionState.isLoading = false;
        state.createTransactionState.isSuccess = false;
        state.createTransactionState.isError = true;
        state.errorMessage = payload;
      })
      .addCase(createTransaction.pending, (state, { payload }) => {
        state.createTransactionState.isLoading = true;
        state.createTransactionState.isSuccess = false;
        state.createTransactionState.isError = false;
      });
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
  resetTransactionState,
} = AppSlice.actions;
export default AppSlice.reducer;
