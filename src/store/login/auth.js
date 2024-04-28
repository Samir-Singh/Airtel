import { createSlice } from "@reduxjs/toolkit";
import { Showtoast, ShowtoastSuccess, accessKeys } from "../../helpers/utils";
import secureLocalStorage from "react-secure-storage";
import { makeHttpRequest } from "../apiService/apiService";

const initialAuthState = {
  isAuthenticated: false,
  isLoading: false,
  isError: "",
  authRes: {},
  isRegistered: false,
  RegRes: null,
  isOTPSent: false,
  isOTPResend: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialAuthState,
  reducers: {
    loginAPIRequested(state) {
      state.isLoading = true;
      state.isAuthenticated = false;
    },
    loginAPISuccess(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.authRes = action.payload;
    },
    loginAPIFailure(state, action) {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isError = action.payload;
    },
  },
});

export const userAuthentication = (data, navigate) => {
  return (dispatch) => {
    dispatch(authActions.loginAPIRequested());
    makeHttpRequest({
      method: "post",
      url: `/log-in`,
      data: data,
      headers: { Authorization: null },
      navigate,
    })
      .then((response) => {
        if (response?.data?.status === "Success") {
          secureLocalStorage.setItem(
            "loginResponse",
            JSON.stringify(response?.data?.data)
          );
          dispatch(authActions.loginAPISuccess(response?.data?.data));
          const userRoles = response?.data?.data?.navigations;

          if (userRoles?.includes(accessKeys?.viewRoleListing)) {
            navigate("/role-management");
          } else if (userRoles?.includes(accessKeys?.viewUserListing)) {
            navigate("/user-management");
          } else if (userRoles?.includes(accessKeys?.viewTaskListing)) {
            navigate("/task-management");
          } else {
            navigate("/master-data-management");
          }
          ShowtoastSuccess("User Logged in Successfully");
        } else {
          dispatch(authActions.loginAPIFailure(response?.data?.message));
          Showtoast(response?.data?.message);
        }
      })
      .catch((error) => {
        dispatch(authActions.loginAPIFailure(error));
        Showtoast("Something Went Wrong");
      });
  };
};

export const authActions = loginSlice.actions;

export default loginSlice.reducer;
