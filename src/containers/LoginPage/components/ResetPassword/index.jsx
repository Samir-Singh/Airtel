import React, { useState } from "react";
import style from "./ResetPassword.module.css";
import * as assets from "../../../../assets/index";
import CommonInput from "../../../../components/inputs";
import { errorMessage } from "../../../../helpers/commonerror";
import {
  passMatchWithCPass,
  passwordValidation,
} from "../../../../helpers/utils";
import { useDispatch } from "react-redux";
import { resetPasswordAction } from "../../../../store/resetPassword/resetPassword";
import CommonButton from "../../../../components/CommonButton";
import { useNavigate } from "react-router";

const ResetPasswordForm = ({ formValue, setForgetPassword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newpassword, setNewPassword] = useState(true);
  const [confirmPassword, setConFirmPassword] = useState(true);
  const [formData, setFormData] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const [errMsg, setErrMsg] = useState({
    newpassword: "",
    confirmPassword: "",
  });

  const handleButtonClick = () => {
    setErrMsg({
      newpassword: "",
      confirmPassword: "",
    });

    if (formData?.newpassword === "") {
      setErrMsg({
        newpassword: errorMessage?.enterPassword,
      });
      return;
    }

    if (!passwordValidation(formData?.newpassword)) {
      setErrMsg({
        newpassword: errorMessage?.passwordNotValid,
      });
      return;
    }

    if (formData?.newpassword?.length < 8) {
      setErrMsg({
        newpassword: errorMessage?.passwordLength,
      });
      return;
    }

    if (formData?.confirmpassword === "") {
      setErrMsg({
        confirmPassword: errorMessage?.enterPassword,
      });
      return;
    }

    if (!passMatchWithCPass(formData?.newpassword, formData?.confirmpassword)) {
      setErrMsg({
        confirmPassword: errorMessage?.shouldSamePassword,
      });
      return;
    }

    dispatch(
      resetPasswordAction(
        {
          resetPassword: formData?.newpassword,
          mobileNumber: formValue?.mobileNumber,
        },
        setForgetPassword,
        navigate
      )
    );
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "newpassword" && value?.length > 15) {
      return;
    }

    if (name === "confirmpassword" && value?.length > 15) {
      return;
    }

    if (name === "newpassword") {
      setErrMsg({
        newpassword: "",
      });
    }

    if (name === "confirmpassword") {
      setErrMsg({
        confirmPassword: "",
      });
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className={style.rightSide}>
      <div className={style.forgetPasswordIcon}>
        <div className={style.LockIcon}>
          <img src={assets.ChangePassswordIcon} alt="lockImg" />
        </div>
        <div>
          <p className={style.forgotPassword}>Password Reset</p>
        </div>
      </div>

      <div className={style.formControl}>
        <div className={style.formWidth}>
          <CommonInput
            label="New Password"
            type={newpassword ? "password" : "text"}
            name="newpassword"
            value={formData.newpassword}
            onChange={handleInputChange}
            errMsg={errMsg?.newpassword}
            icon={
              <img
                src={newpassword ? assets?.hideEyeIcon : assets?.showEyeIcon}
                alt="eyeICon"
                onClick={() => {
                  setNewPassword(!newpassword);
                }}
                className={
                  errMsg?.newpassword === errorMessage?.enterPassword ||
                  errMsg?.newpassword === errorMessage?.passwordLength
                    ? style.errIconHandle
                    : errMsg?.newpassword === errorMessage?.passwordNotValid
                    ? style.errIconHandle1
                    : style.eyeIconHandle
                }
              />
            }
          />
          <div className={style.confirmPassword}>
            <CommonInput
              label="Confirm Password"
              type={confirmPassword ? "password" : "text"}
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleInputChange}
              errMsg={errMsg?.confirmPassword}
              icon={
                <img
                  src={
                    confirmPassword ? assets?.hideEyeIcon : assets?.showEyeIcon
                  }
                  alt="eyeICon"
                  onClick={() => {
                    setConFirmPassword(!confirmPassword);
                  }}
                  className={
                    errMsg?.confirmPassword
                      ? style.errIconHandle
                      : style.eyeIconHandle
                  }
                />
              }
            />
          </div>

          <div className={style.btn_div}>
            <CommonButton
              label="Submit"
              onClick={handleButtonClick}
              type="filled"
              height={true}
              fullWidth={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
