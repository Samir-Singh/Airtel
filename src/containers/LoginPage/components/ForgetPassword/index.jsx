import React, { useState } from "react";
import style from "./ForgetPassword.module.css";
import * as assets from "./../../../../assets/index";
import CommonButton from "../../../../components/CommonButton";
import CommonInput from "../../../../components/inputs";
import { errorMessage } from "../../../../helpers/commonerror";
import { useDispatch } from "react-redux";
import { otpActionPost } from "../../../../store/resetPassword/resetPassword";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const ForgetPasswordForm = ({
  setForgetPassword,
  formData,
  setFormData,
  setShow,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState({
    mobileNumber: "",
  });

  const handleButtonClick = () => {
    setErrMsg({
      mobileNumber: "",
    });

    if (formData?.mobileNumber === "") {
      setErrMsg({
        ...errMsg,
        mobileNumber: errorMessage?.enterMobileNumber,
      });
      return;
    }

    if (formData?.mobileNumber?.length < 10) {
      setErrMsg({
        ...errMsg,
        mobileNumber: errorMessage?.mobileCharacters,
      });
      return;
    }

    dispatch(otpActionPost(formData, setShow, navigate));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber" && value.length > 10) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "mobileNumber") {
      setErrMsg({
        ...errMsg,
        mobileNumber: "",
      });
    }
  };
  const handlerBackToLogin = () => {
    setForgetPassword(true);
  };
  return (
    <div className={style.rightSide}>
      <div className={style.forgetPasswordIcon}>
        <div className={style.LockIcon}>
          <img src={assets.LockIcon} alt="lockImg" />
        </div>
        <div>
          <p className={style.forgotPassword}>Forgot Password</p>
          <p className={style.forgotpasswordText}>
            Please Enter Your Registered Mobile Number To Receive a Verification
            Code.
          </p>
        </div>
      </div>

      <div className={style.formControl}>
        <div className={style.formWidth}>
          <CommonInput
            label="Mobile Number"
            type="text"
            name="mobileNumber"
            errMsg={errMsg?.mobileNumber}
            value={formData.mobileNumber}
            onChange={handleInputChange}
            onKeyDown={(e) =>
              (e.keyCode === 38 || e.keyCode === 40) && e.preventDefault()
            }
            onKeyPress={(e) =>
              ((e.which !== 8 && e.which !== 0 && e.which < 48) ||
                e.which > 57) &&
              e.preventDefault()
            }
          />
          <div className={style.btn_div}>
            <CommonButton
              label="Send OTP"
              onClick={handleButtonClick}
              type="filled"
              height={true}
              fullWidth={true}
            />
          </div>
          <div
            className={style.BackToLogIn}
            onClick={() => handlerBackToLogin()}
          >
            Back To Login
          </div>
        </div>
      </div>
    </div>
  );
};

ForgetPasswordForm.propTypes = {
  setPasswordPassword: PropTypes.func.isRequired,
  formData: PropTypes.shape({
    mobileNumber: PropTypes.string.isRequired,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default ForgetPasswordForm;
