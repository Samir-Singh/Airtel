import { createSlice } from "@reduxjs/toolkit";
import { getCircleDataAction } from "./getCircleData";
import { Showtoast, ShowtoastSuccess } from "../../helpers/utils";
import { makeHttpRequest } from "../apiService/apiService";

const initialCircleState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  result: "",
};

const addNewCircleSlice = createSlice({
  name: "Add New Circle",
  initialState: initialCircleState,
  reducers: {
    addNewCircleApiRequested(state) {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.result = "";
    },
    addNewCircleApiSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.result = action.payload;
    },
    addNewCircleApiFailure(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.result = "";
    },
  },
});

export const addNewCircleApiAction = (data, setShow, navigate) => {
  return (dispatch) => {
    dispatch(addNewCircleActions.addNewCircleApiRequested());

    makeHttpRequest({ method: "post", url: `/circle`, data: data, navigate })
      .then((res) => {
        if (res?.data?.status === "Success") {
          dispatch(
            addNewCircleActions.addNewCircleApiSuccess(res?.data?.message)
          );
          dispatch(
            getCircleDataAction({
              searchData: null,
              page: 1,
              navigate: navigate,
            })
          );
          setShow(false);
          ShowtoastSuccess(res?.data?.message);
        } else {
          dispatch(
            addNewCircleActions.addNewCircleApiFailure(res?.data?.message)
          );
          Showtoast(res?.data?.message);
        }
      })
      .catch((err) => {
        dispatch(addNewCircleActions.addNewCircleApiFailure(err));
        Showtoast("Something Went Wrong");
      });
  };
};

export const addNewCircleActions = addNewCircleSlice.actions;
export default addNewCircleSlice.reducer;
