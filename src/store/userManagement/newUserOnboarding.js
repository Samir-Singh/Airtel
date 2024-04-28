import { createSlice } from "@reduxjs/toolkit";
import { Showtoast, ShowtoastSuccess } from "../../helpers/utils";
import { getUserManagementDataAction } from "./getUserManagement";
import { makeHttpRequest } from "../apiService/apiService";

const initialUserState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  result: "",
};

const addNewUserSlice = createSlice({
  name: "Add New User",
  initialState: initialUserState,
  reducers: {
    addUserApiRequested(state) {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.result = "";
    },
    addUserApiSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.result = action.payload;
    },
    addUserApiFailure(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.result = "";
    },
  },
});

export const addNewUserApiAction = (
  data,
  setShow,
  page,
  filterData,
  searchData,
  navigate
) => {
  return (dispatch) => {
    dispatch(NewUserOnboardingActions.addUserApiRequested());

    makeHttpRequest({
      method: "post",
      url: `/onboard-user`,
      data: data,
      navigate,
    })
      .then((res) => {
        if (res?.data?.status === "Success") {
          setShow(false);
          dispatch(NewUserOnboardingActions.addUserApiSuccess(res?.data?.data));
          dispatch(
            getUserManagementDataAction({
              searchData: searchData,
              page: page,
              filterData: filterData,
              navigate: navigate,
            })
          );
          ShowtoastSuccess(res?.data?.message);
        } else {
          Showtoast(res?.data?.message);
          dispatch(
            NewUserOnboardingActions.addUserApiFailure(res?.data?.message)
          );
        }
      })
      .catch((err) => {
        dispatch(NewUserOnboardingActions.addUserApiFailure(err));
        Showtoast("Something Went Wrong");
      });
  };
};

export const NewUserOnboardingActions = addNewUserSlice.actions;
export default addNewUserSlice.reducer;
