import NavbarComponent from "../../../../components/Header";
import CustomContainer from "../../../../components/commonContainer";
import MapAction from "../MapAction";
import TaskDetails from "../TaskDetails";

import style from "./TaskManagementDetails.module.css";
const TaskManagementDetails = () => {
  return (
    <>
      <NavbarComponent />
      <CustomContainer heading={"Task Management"}>
        <TaskDetails />
        <div className={style.taskContainer}>
          {/* Task Action */}
          <MapAction />
          {/* Task view */}
          <div className={style.taskDetails}> 
          <p className={style.heading}>
          view Task
          </p>
          </div>
        </div>
      </CustomContainer>
    </>
  );
};
export default TaskManagementDetails;
