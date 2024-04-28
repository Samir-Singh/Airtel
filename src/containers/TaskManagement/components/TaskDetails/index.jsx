import style from "./TaskDetails.module.css";
const TaskDetails = ({ task }) => {
  return (
    <>
        <div className={style.container}>
              <div className={style.col}>
                <p className={style.label}>Task ID</p>
                <p className={style.value}>123232</p>
              </div>
              <div className={style.col}>
                <p className={style.label}>Locality Name</p>
                <p className={style.value}>Noida</p>
              </div>
              <div className={style.col}>
                <p className={style.label}>Created At</p>
                <p className={style.value}>123232</p>
              </div>
              <div className={style.col}>
                <p className={style.label}>Created By</p>
                <p className={style.value}>Super Admin </p>
              </div>
              <div className={style.col}>
                <p className={style.label}>Circle</p>
                <p className={style.value}>Gujrat</p>
              </div>
              
        </div>
    </>
  )
}
export default TaskDetails;