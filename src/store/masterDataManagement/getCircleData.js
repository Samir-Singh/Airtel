import { createSlice } from "@reduxjs/toolkit";
import { Showtoast } from "../../helpers/utils";
import { makeHttpRequest } from "../apiService/apiService";

const initialCircleState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  circleData: [],
};

const getCircleDataSlice = createSlice({
  name: "Get Circle Data",
  initialState: initialCircleState,
  reducers: {
    circleApiRequested(state) {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.circleData = [];
    },

    circleApiSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.circleData = action.payload;
    },

    circleApiFailure(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.circleData = [];
    },
  },
});

export const getCircleDataAction = ({ searchData, page, navigate }) => {
  return (dispatch) => {
    dispatch(CircleDataAction.circleApiRequested());
    makeHttpRequest({
      method: "get",
      url: `/circle?page=${page}&limit=10${
        searchData ? `&searchKeyword=${searchData}` : ""
      }`,
      navigate: navigate,
    })
      .then((res) => {
        if (res && res?.data?.status === "Success") {
          dispatch(CircleDataAction.circleApiSuccess(res?.data?.data));
        } else {
          dispatch(CircleDataAction.circleApiFailure(res?.data?.message));
        }
      })
      .catch((err) => {
        dispatch(CircleDataAction.circleApiFailure(err));
        Showtoast("Something Went Wrong");
      });
  };
};

export const CircleDataAction = getCircleDataSlice.actions;
export default getCircleDataSlice.reducer;
