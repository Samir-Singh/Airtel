import { createSlice } from "@reduxjs/toolkit";
import { Showtoast, ShowtoastSuccess } from "../../helpers/utils";
import { makeHttpRequest } from "../apiService/apiService";
import secureLocalStorage from "react-secure-storage";

const initialOrderState = {
  isLoading: true,
  errMsg: "",
  orderRes: "",
  isOrderCreated: null,
};

const createOrderSlice = createSlice({
  name: "Create Order Slice",
  initialState: initialOrderState,
  reducers: {
    createOrderApiRequested(state) {
      state.isLoading = true;
      state.errMsg = "";
      state.orderRes = "";
      state.isOrderCreated = null;
    },
    createOrderApiSuccess(state, action) {
      state.isLoading = false;
      state.errMsg = "";
      state.orderRes = action.payload;
      state.isOrderCreated = true;
    },
    createOrderApiFailure(state, action) {
      state.isLoading = false;
      state.errMsg = action.payload;
      state.orderRes = "";
      state.isOrderCreated = false;
    },
  },
});

export const createOrderApiAction = (data, navigate, setShow) => {
  return (dispatch) => {
    dispatch(createOrderActions.createOrderApiRequested());

    makeHttpRequest({ method: "post", url: `/order`, data: data, navigate })
      .then((res) => {
        if (res?.data?.status === "Success") {
          dispatch(
            createOrderActions.createOrderApiSuccess(res?.data?.message)
          );
          ShowtoastSuccess(res?.data?.message);
          secureLocalStorage?.removeItem("unique_id");
          secureLocalStorage?.setItem("order_created", true);
          setShow(false);
        } else {
          dispatch(
            createOrderActions.createOrderApiFailure(res?.data?.message)
          );
          Showtoast(res?.data?.message);
        }
      })
      .catch((err) => {
        dispatch(createOrderActions.createOrderApiFailure(err?.message));
        Showtoast(err?.message);
      });
  };
};

export const createOrderActions = createOrderSlice.actions;
export default createOrderSlice.reducer;
