import { Col, Modal, Row } from "react-bootstrap";
import NavbarComponent from "../../../../components/Header";
import { InputBox } from "../../../../components/InputBox";
import CustomContainer from "../../../../components/commonContainer";
import TaskDetails from "../TaskDetails";
import style from "./BOQForm.module.css";
import CommonButton from "../../../../components/CommonButton";
import { useState } from "react";
const BOQForm = () => {
  const styles = { marginTop: "0.4rem" };
    const [show, setShow] = useState(false);

  return (
    <>
      <NavbarComponent />
      <CustomContainer heading={"Task Management"}>
        <TaskDetails />
        <div>
          <p className={style.heading}>BOQ Form</p>
          <div>
            <p className={style.semiHeading}>Home Passes count </p>
            <div className={style.border}>
              <Row>
                <Col md="3">
                  <p className={style.label}>Model Generated count/length</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3">
                  <p className={style.label}>User Given count/ length</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3"></Col>
                <Col md="3"></Col>
              </Row>
            </div>
          </div>
          <div>
            <p className={style.semiHeading}>Fat Box </p>
            <div className={style.border}>
              <Row>
                <Col md="3">
                  <p className={style.label}>Model Generated count/length</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3">
                  <p className={style.label}>User Given count/ length</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3">
                  <p className={style.label}>Cost per unit (Piece/KM)</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3">
                  <p className={style.label}>Total Cost</p>
                  <InputBox type="text" styles={styles} />
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <p className={style.semiHeading}>ODF </p>
            <div className={style.border}>
              <Row>
                <Col md="3">
                  <p className={style.label}>Model Generated count/length</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3">
                  <p className={style.label}>User Given count/ length</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3">
                  <p className={style.label}>Cost per unit (Piece/KM)</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3">
                  <p className={style.label}>Total Cost</p>
                  <InputBox type="text" styles={styles} />
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <p className={style.semiHeading}>OLT </p>
            <div className={style.border}>
              <Row>
                <Col md="3">
                  <p className={style.label}>Model Generated count/length</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3">
                  <p className={style.label}>User Given count/ length</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3">
                  <p className={style.label}>Cost per unit (Piece/KM)</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3">
                  <p className={style.label}>Total Cost</p>
                  <InputBox type="text" styles={styles} />
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <p className={style.semiHeading}>Fibre Length </p>
            <div className={style.border}>
              <Row>
                <Col md="3">
                  <p className={style.label}>Model Generated count/length</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3">
                  <p className={style.label}>User Given count/ length</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3">
                  <p className={style.label}>Cost per unit (Piece/KM)</p>
                  <InputBox type="text" styles={styles} />
                </Col>
                <Col md="3">
                  <p className={style.label}>Total Cost</p>
                  <InputBox type="text" styles={styles} />
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <Row>
              <Col md="3"></Col>
              <Col md="3"></Col>
              <Col md="3"></Col>
              <Col md="3" className={style.totalCast}>
                <p className={style.semiHeading}>Total Cost</p>
                <InputBox type="text" styles={styles} />
              </Col>
            </Row>
          </div>
          <div className={style.btnAllignment}>
            <CommonButton label={"Cancel"} height={true} />
            <CommonButton label={"Add + "} height={true} type={"filled"} onClick={()=>setShow(true)} />
            <CommonButton label={"Submit"} height={true} type={"filled"} />
          </div>
        </div>
      </CustomContainer>
      <Modal show={show} onHide={() => setShow(false)} className="customModal" centered>
           
            <Modal.Body >
            <div className={style.modalConatiner}>
            <Modal.Title>Add New Added Field</Modal.Title>
                <div className={style.modalBody}>
                    <InputBox type="text" placeholder="Field Label Name" />
                    <InputBox type="text" placeholder="User Given Count" />
                    <InputBox type="text" placeholder="Cost Per Unit (Price/KM)" />
                    <InputBox type="text" placeholder="Total Cost" />
                </div>
                <div className={style.btnAllignment}>
                <CommonButton label={"Cancel"} height={true} onClick={()=>setShow(false)}/>
                <CommonButton label={"Submit"} height={true} type={"filled"} />
                </div>
                </div>
            </Modal.Body>
           
            

    </Modal>
    </>
  );
};
export default BOQForm;
