import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPages from "../containers/LoginPage";
import RoleManagement from "../containers/RoleManagements";
import UserManagement from "../containers/UserManagments";
import MasterDataManagement from "../containers/MasterDataManagement";
import TaskManagement from "../containers/TaskManagement";
import TaskManagementsTable from "../containers/TaskManagement/components/TaskManagementsTable";
import ProtectedRoutes from "./ProtectedRoutes";
import TaskManagementDetails from "../containers/TaskManagement/components/TaskManagementDetails";
import AssignCirclePlanningHeadLead from "../containers/TaskManagement/components/AssignCirclePlanningHeadLead";
import BOQForm from "../containers/TaskManagement/components/BOQForm";

const Routing = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoutes redirectTo="/" />}>
        <Route path="/role-management" element={<RoleManagement />} />

        <Route
          path="/master-data-management"
          element={<MasterDataManagement />}
        />

        <Route path="/user-management" element={<UserManagement />} />

        <Route path="/task-management" element={<TaskManagementsTable />} />

        <Route path="/task-locality-management" element={<TaskManagement />} />
        <Route path="/task-management-details/" element={<TaskManagementDetails />} />
        <Route path="/assign-circle-planning-lead/" element={<AssignCirclePlanningHeadLead />} />
        <Route path="/update-boq-form/" element={<BOQForm />} />

      </Route>

      <Route path="/" element={<LoginPages />} />

      <Route path="*" element={<h1>404 No Page Found</h1>} />
    </Routes>
  );
};

export default Routing;
