import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import style from "./OtpVerification.module.css";
import * as assets from "../../../../assets/index";
import OtpInput from "react-otp-input";
import CommonButton from "../../../../components/CommonButton";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  otpActionGet,
  otpActionPost,
} from "../../../../store/resetPassword/resetPassword";
import { useNavigate } from "react-router";

function OtpVerification({ formData, setForgetPassword, show, setShow }) {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);

  const handleButtonClick = () => {
    if (otp?.length < 4) {
      return;
    }
    dispatch(
      otpActionGet(
        {
          mobileNumber: formData?.mobileNumber,
          verificationCode: Number(otp),
        },
        setShow,
        navigate
      )
    );
  };
  const handlerBackToLogin = () => {
    setShow(false);
    setForgetPassword(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <div className={style.modal_main_div}>
        <div className={style.LockIcon}>
          <img src={assets.LockIcon} alt="lockIcon" />
        </div>
        <Modal.Body>
          <div className={style.otpVerification}>
            <p className={style.otpverification}>OTP Verification</p>
            <p className={style.enter_otp_para}>
              Enter OTP code Sent To{" "}
              {"XXXX" + formData?.mobileNumber?.slice(-4)}
            </p>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span> </span>}
              inputType="tel"
              containerStyle={{ display: "unset" }}
              inputStyle={{
                width: "2.5rem",
                height: "2.4rem",
                border: "1px solid var(--grey-30)",
                borderRadius: "8px",
                margin: "2em 0.5em",
                marginTop: "1em",
              }}
              renderInput={(props) => (
                <input {...props} className="otp-input" />
              )}
            />

            <p className={style.send_code_para}>
              <span
                onClick={() =>
                  dispatch(
                    otpActionPost(
                      { mobileNumber: formData?.mobileNumber },
                      setShow,
                      navigate
                    )
                  )
                }
                className={style.send_code_span}
              >
                Send the code again
              </span>
            </p>
            <div className={style.btn_div}>
              <CommonButton
                label="Verify & Proceed"
                onClick={handleButtonClick}
                type="filled"
                height={true}
                fullWidth={true}
                isDisabled={otp?.length < 4}
              />
            </div>
            <div
              className={style.BackToLogIn}
              onClick={() => handlerBackToLogin()}
            >
              Back To Login
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
}

OtpVerification.propTypes = {
  formData: PropTypes.shape({
    mobileNumber: PropTypes.string.isRequired,
  }),
};

export default OtpVerification;
