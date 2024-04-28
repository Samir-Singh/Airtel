import { createSlice } from "@reduxjs/toolkit";
import { Showtoast } from "../../helpers/utils";
import { makeHttpRequest } from "../apiService/apiService";

const initialUserManagementState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  userManagementData: [],
};

const getUserManagementSlice = createSlice({
  name: "Get User Management Data",
  initialState: initialUserManagementState,
  reducers: {
    userManagementApiRequested(state) {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.userManagementData = [];
    },
    userManagementApiSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.userManagementData = action.payload;
    },
    userManagementApiFailure(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.userManagementData = [];
    },
  },
});

export const getUserManagementDataAction = ({
  searchData,
  page,
  filterData,
  navigate,
}) => {
  return (dispatch) => {
    dispatch(GetUserManagementActions.userManagementApiRequested());
    let url = `/users?page=${page}&limit=10`;
    if (searchData) {
      url += `&searchKeyword=${searchData}`;
    }

    if (filterData?.teamId) {
      url += `&teamId=${filterData?.teamId}`;
    }

    if (filterData?.roleId) {
      url += `&roleId=${filterData?.roleId}`;
    }

    if (filterData?.circleId) {
      url += `&circleId=${filterData?.circleId}`;
    }

    if (filterData?.statusId) {
      url += `&status=${filterData?.statusId === 1}`;
    }

    makeHttpRequest({ method: "get", url: url, navigate })
      .then((res) => {
        if (res?.data?.status === "Success") {
          dispatch(
            GetUserManagementActions.userManagementApiSuccess(res?.data?.data)
          );
        } else {
          dispatch(
            GetUserManagementActions.userManagementApiFailure(
              res?.data?.message
            )
          );
          Showtoast(res?.data?.message);
        }
      })
      .catch((err) => {
        dispatch(GetUserManagementActions.userManagementApiFailure(err));
        Showtoast("Something Went Wrong");
      });
  };
};

export const GetUserManagementActions = getUserManagementSlice.actions;
export default getUserManagementSlice.reducer;
