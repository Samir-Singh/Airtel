import { createSlice } from "@reduxjs/toolkit";
import { Showtoast, ShowtoastSuccess } from "../../helpers/utils";
import { makeHttpRequest } from "../apiService/apiService";

const initialResetPasswordState = {
  isLoading: false,
  isOtpSent: false,
  isError: "",
  isOtpVerified: false,
  isPasswordReset: false,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: initialResetPasswordState,
  reducers: {
    // Reducer for sending otp
    sendOtpRequested(state) {
      state.isLoading = true;
      state.isOtpSent = false;
      state.isError = "";
      state.isOtpVerified = false;
      state.isPasswordReset = false;
    },

    sendOtpSuccess(state) {
      state.isLoading = false;
      state.isOtpSent = true;
      state.isError = "";
      state.isOtpVerified = false;
      state.isPasswordReset = false;
    },

    sendOtpFailure(state, action) {
      state.isLoading = false;
      state.isOtpSent = false;
      state.isError = action.payload;
      state.isOtpVerified = false;
      state.isPasswordReset = false;
    },

    // Reducer for verify otp
    verifyOtpRequested(state) {
      state.isLoading = true;
      state.isOtpVerified = false;
      state.isError = "";
      state.isOtpSent = false;
      state.isPasswordReset = false;
    },

    verifyOtpSuccess(state) {
      state.isLoading = false;
      state.isOtpVerified = true;
      state.isError = "";
      state.isOtpSent = false;
      state.isPasswordReset = false;
    },

    verifyOtpFailure(state, action) {
      state.isLoading = false;
      state.isOtpVerified = false;
      state.isError = action.payload;
      state.isOtpSent = false;
      state.isPasswordReset = false;
    },

    // Reducer for reset password
    resetPasswordRequested(state) {
      state.isLoading = true;
      state.isPasswordReset = false;
      state.isError = "";
      state.isOtpVerified = false;
      state.isOtpSent = false;
    },

    resetPasswordSuccess(state) {
      state.isLoading = false;
      state.isPasswordReset = true;
      state.isError = "";
      state.isOtpVerified = false;
      state.isOtpSent = false;
    },

    resetPasswordFailure(state, action) {
      state.isLoading = false;
      state.isPasswordReset = false;
      state.isError = action.payload;
      state.isOtpVerified = false;
      state.isOtpSent = false;
    },
  },
});

export const otpActionGet = (data, setShow, navigate) => {
  return (dispatch) => {
    dispatch(resetPasswordActions.verifyOtpRequested());

    makeHttpRequest({
      method: "post",
      url: `/otp/verify`,
      data: data,
      headers: { Authorization: null },
      navigate,
    })
      .then((response) => {
        if (response?.data?.status === "Success") {
          dispatch(resetPasswordActions.verifyOtpSuccess());
          ShowtoastSuccess(response?.data?.message);
          setShow(false);
        } else {
          dispatch(
            resetPasswordActions.verifyOtpFailure(response?.data?.message)
          );
          Showtoast(response?.data?.message);
        }
      })
      .catch((error) => {
        dispatch(resetPasswordActions.verifyOtpFailure(error?.message));
      });
  };
};

export const otpActionPost = (data, setShow, navigate) => {
  return (dispatch) => {
    dispatch(resetPasswordActions.sendOtpRequested());

    makeHttpRequest({
      method: "post",
      data: data,
      url: `/otp`,
      headers: { Authorization: null },
      navigate,
    })
      .then((response) => {
        if (response?.data?.status === "Success") {
          dispatch(resetPasswordActions.sendOtpSuccess());
          ShowtoastSuccess(response?.data?.message);
          setShow(true);
        } else {
          dispatch(
            resetPasswordActions.sendOtpFailure(response?.data?.message)
          );
          Showtoast(response?.data?.message);
        }
      })
      .catch((error) => {
        dispatch(resetPasswordActions.sendOtpFailure(error?.message));
      });
  };
};

export const resetPasswordAction = (data, setForgetPassword, navigate) => {
  return (dispatch) => {
    dispatch(resetPasswordActions.resetPasswordRequested());

    makeHttpRequest({
      method: "put",
      url: `/reset-password`,
      data: data,
      headers: { Authorization: null },
      navigate,
    })
      .then((response) => {
        if (response?.data?.status === "Success") {
          dispatch(resetPasswordActions.resetPasswordSuccess());
          ShowtoastSuccess(response?.data?.message);
          setForgetPassword(true);
        } else {
          dispatch(
            resetPasswordActions.resetPasswordFailure(response?.data?.message)
          );
          Showtoast(response?.data?.message);
        }
      })
      .catch((error) => {
        dispatch(resetPasswordActions.resetPasswordFailure(error?.message));
      });
  };
};

export const resetPasswordActions = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
