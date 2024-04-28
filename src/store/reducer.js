import { combineReducers } from "redux";
import authReducer from "./login/auth";
import circleListReducer from "./masterDataManagement/getCircleData";
import getUserManagementReducer from "./userManagement/getUserManagement";
import addNewCircleReducer from "./masterDataManagement/addNewCircle";
import getAllDropDownListReducer from "./getAllDropDownList/getAllDropDownList";
import addNewUserReducer from "./userManagement/newUserOnboarding";
import downloadKMLReducer from "./masterDataManagement/downloadKMLFile";
import getRoleManagementReducer from "./roleManagement/getRoleManagement";
import editRoleManagementReducer from "./roleManagement/editRoleManagement";
import resetPasswordReducer from "./resetPassword/resetPassword";
import getCircleKMLReducer from "./taskManagement/getCircleKMLFile";
import createOrderReducer from "./taskManagement/createOrder";

export default combineReducers({
  authReducer: authReducer,
  circleListReducer: circleListReducer,
  getUserManagementReducer: getUserManagementReducer,
  addNewCircleReducer: addNewCircleReducer,
  getAllDropDownListReducer: getAllDropDownListReducer,
  addNewUserReducer: addNewUserReducer,
  downloadKMLReducer: downloadKMLReducer,
  getRoleManagementReducer: getRoleManagementReducer,
  editRoleManagementReducer: editRoleManagementReducer,
  resetPasswordReducer: resetPasswordReducer,
  getCircleKMLReducer: getCircleKMLReducer,
  createOrderReducer: createOrderReducer,
});
