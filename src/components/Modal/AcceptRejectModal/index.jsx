import { Modal } from "react-bootstrap";
import { CustomTextArea } from "../../InputBox";
import style from "./AcceptRejectModal.module.css";
import CommonButton from "../../CommonButton";
export const AcceptRejectModal = ({ show, handleClose,handleCancel,handleSave,formData,setFormData,label }) => {
    return (
      <Modal show={show} onHide={handleClose} className="customModal" centered>
        <Modal.Body>
          <div className={style.modalConatiner}>
            <p className={style.newUserOnboardinP}>
              {label}
            </p>
            <form>
              <div className={style.inputWidth1}>
                <CustomTextArea
                  type="text"
                  name="localityName"
                  labelShow={false}
                  placeholder={"Enter Reason"}
                />
              </div>
            </form>
            <div className={style.btnAlignment}>
              <CommonButton label="Cancel" height={true} onClick={handleCancel}/>
              <CommonButton label="Save" height={true} type={"filled"} onClick={handleSave}/>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }