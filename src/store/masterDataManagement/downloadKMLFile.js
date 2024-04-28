import { createSlice } from "@reduxjs/toolkit";
import { makeHttpRequest } from "../apiService/apiService";

const initialDownloadState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  downloadRes: "",
};

const downloadKMLSlice = createSlice({
  name: "Download KML FIle",
  initialState: initialDownloadState,
  reducers: {
    downloadApiRequested(state) {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.downloadRes = "";
    },

    downloadApiSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.downloadRes = action.payload;
    },

    downloadApiFailure(state, action) {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.downloadRes = "";
    },
  },
});

export const downloadKMLAction = (id, name, abbr, navigate) => {
  return (dispatch) => {
    dispatch(DownloadDataAction.downloadApiRequested());

    makeHttpRequest({ method: "get", url: `/download/${id}`, navigate })
      .then((res) => {
        const blob = new Blob([res.data], { type: "application/xml" });
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element and trigger a click to download
        const link = document.createElement("a");
        link.href = url;
        link.download = `${name}-${abbr}.kml`;
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        dispatch(DownloadDataAction.downloadApiSuccess());
      })
      .catch((err) => {
        dispatch(DownloadDataAction.downloadApiFailure());
      });
  };
};

export const DownloadDataAction = downloadKMLSlice.actions;
export default downloadKMLSlice.reducer;
