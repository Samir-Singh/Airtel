import CommonButton from "../../../../components/CommonButton";
import style from "./MapAction.module.css";
import { useState } from "react";
import * as images from "../../../../assets/index";
import { AcceptRejectModal } from "../../../../components/Modal/AcceptRejectModal";
import { useNavigate } from "react-router-dom";
const MapAction = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState({
    show: false,
    actionType: "",
  });
  const [show, setShow] = useState([]);
  const handleDelete = (item) => {
    setShow((prev) => prev.filter((ele) => ele !== item));
  };

  return (
    <>
      <div className={style.container}>
        <p className={style.heading}>Action</p>
        <div className={style.actionContent}>
          <p className={style.headAction}>Central Finance Head Action</p>
          {/* <div className={style.btnContainer}>
            <CommonButton
              label={"Accept"}
              height={true}
              fullWidth={true}
              type={"filled"}
              onClick={() => setAction({ show: true, actionType: "Accept" })}
            />
            <CommonButton
              label={"Reject"}
              height={true}
              fullWidth={true}
              onClick={() => setAction({ show: true, actionType: "Reject" })}
            />
          </div> */}
          {/* <div className={style.btnContainer}>
            <CommonButton
              label={"Assign Circle Planning Lead"}
              height={true}
              fullWidth={true}
              type={"filled"}
              onClick={() => navigate("/assign-circle-planning-lead")}
            />
          </div> */}
          <div className={style.btnContainer}>
            <CommonButton
              label={"Update BOQ Form"}
              height={true}
              fullWidth={true}
              type={"filled"}
              onClick={() => navigate("/update-boq-form/")}
            />
          </div>
          <p className={style.correction}>Send For Correction</p>
        </div>

        <p className={style.heading}>Status</p>
        <div className={style.statusContent}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <div className={style.order} key={item}>
              <div className={style.imagesSection}>
                <img src={images?.accept} alt="Accpet" height={"35rem"} />
                <div>
                  <p className={style.orderStatus}>
                    Order Acceptance from Planning Lead
                  </p>
                  <div className={style.dateContainer}>
                    <div className={style.date}>
                      <p>12 Nov 2021</p>
                      <ul>
                        <li>09:23AM</li>
                      </ul>
                    </div>
                    <div
                      className={show.includes(item) ? style.show : style.hide}
                    >
                      <p>Created By: Nikhil Singh</p>
                      <p>OLM ID: A12323232</p>
                      <p>Mobile Number: +917478383894</p>
                    </div>
                  </div>
                </div>
              </div>
              {show.includes(item) ? (
                <img
                  src={images?.downArrow}
                  alt="downArrow"
                  className={style.downImage}
                  onClick={() => handleDelete(item)}
                />
              ) : (
                <img
                  src={images?.downArrow}
                  alt="downArrow"
                  className={style.downImage}
                  onClick={() => setShow((prev) => [...prev, item])}
                />
              )}
            </div>
          ))}
          {console.log(show)}
          <div className={style.order}>
            <div className={style.imagesSection}>
              <img src={images?.accept} alt="Accpet" />
              <p className={style.orderStatus}>
                Order Acceptance from Planning Lead
              </p>
            </div>
            <img
              src={images?.downArrow}
              alt="downArrow"
              className={style.downImage}
            />
          </div>
        </div>
      </div>
      <AcceptRejectModal
        show={action?.show}
        label={"Are you sure you want to accept"}
        handleClose={() => setAction((prev) => ({ ...prev, show: false }))}
        handleCancel={() => setAction((prev) => ({ ...prev, show: false }))}
      />
    </>
  );
};
export default MapAction;
