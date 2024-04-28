import React, { useEffect, useRef, useState } from "react";
import NavbarComponent from "../../components/Header";
import SideBar from "./components/Sidebar";
import style from "./TaskManagement.module.css";
import CommonButton from "../../components/Buttons";
import {
  customButtonStyle,
  customButtonStyle1,
} from "../../components/Style/Style";
import CommonInput from "../../components/inputs";
import { Modal } from "react-bootstrap";
import MapComponent from "./components/MapComponent";
import { accessKeys, validateKey } from "../../helpers/utils";
import { getCircleKMLAction } from "../../store/taskManagement/getCircleKMLFile";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import { createOrderApiAction } from "../../store/taskManagement/createOrder";

const TaskManagement = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [pause, setPause] = React.useState(false);
  const getLocalStorage = JSON.parse(localStorage.getItem("polylineStatus"));
  const [localityName, setLocalityName] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [polylineStatus, setPolylineStatus] = React.useState(
    getLocalStorage
      ? getLocalStorage
      : {
          mainSubPolygon: true,
          mainPolygon: {
            isComplete: false,
            data: [],
          },

          subPolygon: {
            isComplete: false,
            data: [],
          },
        }
  );
  const circleKMLFile = useSelector(
    (state) => state.getCircleKMLReducer.circleKMLFile
  );
  useEffect(() => {
    localStorage.setItem("polylineStatus", JSON.stringify(polylineStatus));
  }, [polylineStatus]);

  const drawingManagerRef = useRef();
  const polylineRefs = useRef([]);
  useEffect(() => {
    const isOrderCreated = secureLocalStorage?.getItem("order_created");
    if (!isOrderCreated) {
      setShow(true);
    }
    return () => {
      setShow(false);
    };
  }, []);
  const handlePauseToggle = () => {
    setPause(false);
  };
  const handleResumeToggle = () => {
    setPause(true);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCircleKMLAction(58));
  }, [dispatch]);

  const handleCreateOrder = async () => {
    if (localityName === "") {
      setErrMsg("Please enter locality name");
      return;
    }

    const unique_id = await secureLocalStorage?.getItem("unique_id");

    if (unique_id) {
      dispatch(
        createOrderApiAction(
          {
            localityName: localityName,
            requestUniqueCode: unique_id,
          },
          navigate,
          setShow
        )
      );
    } else {
      secureLocalStorage?.setItem("unique_id", uuid());
      dispatch(
        createOrderApiAction(
          {
            localityName: localityName,
            requestUniqueCode: uuid(),
          },
          navigate,
          setShow
        )
      );
    }
  };

  if (validateKey(accessKeys?.viewTaskListing)) {
    return (
      <>
        <NavbarComponent />
        <p className={style.locality}>Locality Name</p>
        <div className={style.container}>
          <SideBar
            drawingManagerRef={drawingManagerRef}
            pause={pause}
            polylineRefs={polylineRefs}
            handlePauseToggle={handlePauseToggle}
            handleResumeToggle={handleResumeToggle}
            setPolylineStatus={setPolylineStatus}
            polylineStatus={polylineStatus}
          />
          <div className={style.mapAria}>
            <MapComponent
              drawingManagerRef={drawingManagerRef}
              polylineRefs={polylineRefs}
              handlePauseToggle={handlePauseToggle}
              handleResumeToggle={handleResumeToggle}
              setPolylineStatus={setPolylineStatus}
              polylineStatus={polylineStatus}
              circleKMLFile={circleKMLFile}
            />
          </div>
        </div>
        <Modal centered show={show} className="customModal">
          <Modal.Body>
            <div className={style.modalConatiner}>
              <p className={style.newUserOnboardinP}>Locality Name</p>
              <form>
                <div className={style.inputFieldsAlignment1}>
                  <div className={style.inputWidth1}>
                    <CommonInput
                      type="text"
                      name="localityName"
                      labelShow={false}
                      placeholders={"Enter locality name"}
                      errMsg={errMsg}
                      onChange={(e) => {
                        setLocalityName(e?.target?.value);
                        setErrMsg("");
                      }}
                    />
                  </div>
                </div>

                <div className={style.btnAlignment}>
                  <CommonButton
                    label="Cancel"
                    onClick={() => setShow(false)}
                    type="button"
                    styles={customButtonStyle1}
                  />
                  <CommonButton
                    label="Submit"
                    onClick={() => handleCreateOrder()}
                    type="button"
                    styles={customButtonStyle}
                  />
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  } else {
    return <h1>No Page Task Locality Management</h1>;
  }
};

export default TaskManagement;
