import { createSlice } from "@reduxjs/toolkit";
import { Showtoast } from "../../helpers/utils";
import { makeHttpRequest } from "../apiService/apiService";

const initialDropDownData = {
  isTeamLoading: false,
  isRoleLoading: false,
  isRoleIdLoading: false,
  isCircleLoading: false,
  isPlanningLeadLoading: false,
  isTeamError: false,
  isRoleError: false,
  isCircleError: false,
  isRoleIdError: false,
  isPlanningLeadError: false,
  teamList: [],
  roleList: [],
  circleList: [],
  roleIdList: [],
  planningLeadList: [],
};

const getAllDropDownSlice = createSlice({
  name: "Get All Drop Down List",
  initialState: initialDropDownData,
  reducers: {
    teamApiRequested(state) {
      state.isTeamLoading = true;
      state.isTeamError = false;
      state.teamList = [];
    },
    teamApiSuccess(state, action) {
      state.isTeamLoading = false;
      state.isTeamError = false;
      state.teamList = action.payload;
    },
    teamApiFailure(state, action) {
      state.isTeamLoading = false;
      state.isTeamError = true;
      state.teamList = [];
    },

    roleApiRequested(state) {
      state.isRoleLoading = true;
      state.isRoleError = false;
      state.roleList = [];
    },
    roleApiSuccess(state, action) {
      state.isRoleLoading = false;
      state.isRoleError = false;
      state.roleList = action.payload;
    },
    roleApiFailure(state, action) {
      state.isRoleLoading = false;
      state.isRoleError = true;
      state.roleList = [];
    },

    circleApiRequested(state) {
      state.isCircleLoading = true;
      state.isCircleError = false;
      state.circleList = [];
    },
    circleApiSuccess(state, action) {
      state.isCircleLoading = false;
      state.isCircleError = false;
      state.circleList = action.payload;
    },
    circleApiFailure(state, action) {
      state.isCircleLoading = true;
      state.isCircleError = true;
      state.circleList = [];
    },

    roleByIdApiRequested(state) {
      state.isRoleIdLoading = true;
      state.isRoleIdError = false;
      state.roleIdList = [];
    },
    roleByIdApiSuccess(state, action) {
      state.isRoleIdLoading = false;
      state.isRoleError = false;
      state.roleIdList = action.payload;
    },
    roleByIdApiFailure(state, action) {
      state.isRoleIdLoading = false;
      state.isRoleError = true;
      state.roleIdList = [];
    },
    planningLeadApiRequested(state) {
      state.isPlanningLeadLoading = true;
      state.isPlanningLeadError = false;
      state.planningLeadList = [];
    },
    planningLeadApiSuccess(state, action) {
      state.isPlanningLeadLoading = false;
      state.isPlanningLeadError = false;
      state.planningLeadList = action.payload;
    },
    planningLeadApiFailure(state, action) {
      state.isPlanningLeadLoading = false;
      state.isPlanningLeadError = true;
      state.planningLeadList = [];
    },
  },
});

export const getTeamListAction = (navigate) => {
  return (dispatch) => {
    dispatch(dropDownListActions.teamApiRequested());
    makeHttpRequest({ method: "get", url: "/team-list", navigate })
      .then((res) => {
        if (res && res?.data?.status === "Success") {
          dispatch(dropDownListActions.teamApiSuccess(res?.data?.data));
        } else {
          dispatch(dropDownListActions.teamApiFailure(res?.data?.message));
        }
      })
      .catch((err) => {
        dispatch(dropDownListActions.teamApiFailure(err));
        Showtoast("Something Went Wrong");
      });
  };
};

export const getRoleListAction = (teamId, navigate) => {
  return (dispatch) => {
    dispatch(dropDownListActions.roleApiRequested());
    let url = `/roles-list`;

    if (teamId) {
      url += `?teamId=${teamId}`;
    }

    makeHttpRequest({ method: "get", url: url, navigate: navigate })
      .then((res) => {
        if (res && res?.data?.status === "Success") {
          dispatch(dropDownListActions.roleApiSuccess(res?.data?.data));
        } else {
          dispatch(dropDownListActions.roleApiFailure(res?.data?.message));
        }
      })
      .catch((err) => {
        dispatch(dropDownListActions.roleApiFailure(err));
        Showtoast("Something Went Wrong");
      });
  };
};

export const getCircleListAction = (navigate) => {
  return (dispatch) => {
    dispatch(dropDownListActions.circleApiRequested());

    makeHttpRequest({ method: "get", url: "/circle-list", navigate: navigate })
      .then((res) => {
        if (res && res?.data?.status === "Success") {
          dispatch(dropDownListActions.circleApiSuccess(res?.data?.data));
        } else {
          dispatch(dropDownListActions.circleApiFailure(res?.data?.message));
        }
      })
      .catch((err) => {
        dispatch(dropDownListActions.circleApiFailure(err));
        Showtoast("Something Went Wrong");
      });
  };
};

export const getRoleListByTeamId = (id, navigate) => {
  return (dispatch) => {
    dispatch(dropDownListActions.roleByIdApiRequested());

    makeHttpRequest({
      method: "get",
      url: `/role-by-team-id?teamId=${id}`,
      navigate,
    })
      .then((res) => {
        if (res && res?.data?.status === "Success") {
          dispatch(dropDownListActions.roleByIdApiSuccess(res?.data?.data));
        } else {
          dispatch(dropDownListActions.roleByIdApiFailure(res?.data?.message));
        }
      })
      .catch((err) => {
        dispatch(dropDownListActions.roleByIdApiFailure(err));
        Showtoast("Something Went Wrong");
      });
  };
};

export const getPlanningLeadAction = (id, navigate) => {
  return (dispatch) => {
    dispatch(dropDownListActions.planningLeadApiRequested());

    makeHttpRequest({
      method: "get",
      url: `/get-planning-lead-by-circle?circleId=${id}`,
      navigate,
    })
      .then((res) => {
        if (res && res?.data?.status === "Success") {
          dispatch(dropDownListActions.planningLeadApiSuccess(res?.data?.data));
        } else {
          dispatch(
            dropDownListActions.planningLeadApiFailure(res?.data?.message)
          );
        }
      })
      .catch((err) => {
        dispatch(dropDownListActions.planningLeadApiFailure(err));
        Showtoast("Something Went Wrong");
      });
  };
};

export const dropDownListActions = getAllDropDownSlice.actions;
export default getAllDropDownSlice.reducer;
