import { createSlice } from "@reduxjs/toolkit";
import { Showtoast } from "../../helpers/utils";
import { makeHttpRequest } from "../apiService/apiService";

const initialRoleState = {
  isLoading: false,
  isError: false,
  roleManagementData: [],
};

const getRoleManagementSlice = createSlice({
  name: "Get Role Management",
  initialState: initialRoleState,
  reducers: {
    roleManagementApiRequested(state) {
      state.isLoading = true;
      state.isError = false;
      state.roleManagementData = [];
    },
    roleManagementApiSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.roleManagementData = action.payload;
    },
    roleManagementApiFailure(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.roleManagementData = [];
    },
  },
});

export const getRoleManagementAction = (navigate) => {
  return (dispatch) => {
    dispatch(GetRoleManagementActions.roleManagementApiRequested());

    makeHttpRequest({ method: "get", url: "/roles", navigate: navigate })
      .then((res) => {
        if (res?.data?.status === "Success") {
          dispatch(
            GetRoleManagementActions.roleManagementApiSuccess(res.data.data)
          );
        } else {
          dispatch(
            GetRoleManagementActions.roleManagementApiFailure(
              res?.data?.message
            )
          );
        }
      })
      .catch((err) => {
        Showtoast("Something Went Wrong");
        dispatch(GetRoleManagementActions.roleManagementApiFailure(err));
      });
  };
};

export const GetRoleManagementActions = getRoleManagementSlice.actions;
export default getRoleManagementSlice.reducer;
