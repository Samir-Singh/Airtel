import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";
import { generateKMLFileToCoordinates } from "../../helpers/utils";

const initialCircleState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  circleKMLFile: [],
};

const getCircleKMLFileSlice = createSlice({
  name: "Get KML FIle",
  initialState: initialCircleState,
  reducers: {
    apiRequested(state) {
      state.isLoading = true;
      state.isError = false;
      state.circleKMLFile = [];
    },

    apiSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.circleKMLFile = action.payload;
    },

    apiFailure(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.circleKMLFile = [];
    },
  },
});

export const getCircleKMLAction = (id) => {
  return (dispatch) => {
    dispatch(getCircleDataAction.apiRequested());

    axios({
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_URL}/download/${id}`,
      responseType: "arraybuffer", // Set the response type to arraybuffer
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("loginResponse"))?.bearerToken
        }`,
        platform: "WEB",
      },
    })
      .then((res) => {
        const data = generateKMLFileToCoordinates(res.data);
        dispatch(getCircleDataAction.apiSuccess(data));
      })
      .catch(() => {
        dispatch(getCircleDataAction.apiFailure());
      });
  };
};

export const getCircleDataAction = getCircleKMLFileSlice.actions;
export default getCircleKMLFileSlice.reducer;
