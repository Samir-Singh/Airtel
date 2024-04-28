import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import style from "./DateRangeFilterModal.module.css";
import CustomDatePicker from "../../DatePicker";
import CommonButton from "../../CommonButton";
const DateRangeFilterModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} className="customModal" centered>
      <Modal.Body>
      
        <div className={style.headerContainer}>
          <div className={style.headertab}>
            <div className={style.header}>Date Range Create At</div>
          </div>
          <div className={style.headertab}>
            <div className={style.header}>Date Range Uploaded At</div>
          </div>
        </div>
        <div className={style.container}>
        <div className={style.headerContainer}>
          {/* Create At */}
          <div className={style.createRange}>
            <div>
              <div className={style.label}>Start Date</div>
              <CustomDatePicker />
            </div>
            <div>
              <div className={style.label}>End Date</div>
              <CustomDatePicker />
            </div>
          </div>
          {/* Vertical Rules */}
          <div class="d-flex" style={{ height: "145px" }}>
            <div class="vr redRule"></div>
          </div>
          {/* Updated At */}
          <div className={style.createRange}>
            <div>
              <div className={style.label}>Start Date</div>
              <CustomDatePicker />
            </div>
            <div>
              <div className={style.label}>End Date</div>
              <CustomDatePicker />
            </div>
          </div>
        </div>
        </div>

        <div className={style.btnAlignment}>
            <div className={style.btn}>
                <CommonButton label={"Clear Filter"} height={true} onClick={()=>handleClose()}/>
                <CommonButton label={"Apply Filter"} height={true} type={"filled"}/>
            </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
DateRangeFilterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DateRangeFilterModal;


