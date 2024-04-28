import { createSlice } from "@reduxjs/toolkit";
import { Showtoast, ShowtoastSuccess } from "../../helpers/utils";
import { getRoleManagementAction } from "./getRoleManagement";
import { makeHttpRequest } from "../apiService/apiService";

const initialRoleState = {
  isLoading: false,
  isError: false,
  errMsg: "",
  successMsg: "",
};

const editRoleManagementSlice = createSlice({
  name: "Edit Role Management",
  initialState: initialRoleState,
  reducers: {
    editRoleApiRequested(state) {
      state.isLoading = true;
      state.isError = false;
      state.errMsg = "";
      state.successMsg = "";
    },
    editRoleApiSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.errMsg = "";
      state.successMsg = action.payload;
    },
    editRoleApiFailure(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.errMsg = action.payload;
      state.successMsg = "";
    },
  },
});

export const editRoleManagementAction = (data, navigate) => {
  return (dispatch) => {
    dispatch(EditRoleManagementActions.editRoleApiRequested());

    makeHttpRequest({ method: "put", data: data, url: `/roles`, navigate })
      .then((res) => {
        if (res?.data?.status === "Success") {
          dispatch(
            EditRoleManagementActions.editRoleApiSuccess(res?.data?.data)
          );
          dispatch(getRoleManagementAction(navigate));
          ShowtoastSuccess(res?.data?.message);
        } else {
          dispatch(
            EditRoleManagementActions.editRoleApiFailure(res?.data?.message)
          );
        }
      })
      .catch((err) => {
        Showtoast("Something Went Wrong");
      });
  };
};

export const EditRoleManagementActions = editRoleManagementSlice.actions;
export default editRoleManagementSlice.reducer;
