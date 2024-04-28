import React, { useState } from "react";
import style from "./Login.module.css";
import * as assets from "../../../../assets/index";
import CommonInput from "../../../../components/inputs";
import { userAuthentication } from "../../../../store/login/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { errorMessage } from "../../../../helpers/commonerror";
import { Showtoast } from "../../../../helpers/utils";
import CommonButton from "../../../../components/CommonButton";

const LoginForm = ({ setForgetPassword }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
  });
  const [password, setPassword] = useState(true);

  const handlepasswordIconClick = () => {
    setPassword(!password);
  };

  const handleButtonClick = () => {
    setErrMsg({
      mobileNumber: "",
      password: "",
    });

    if (formData?.mobileNumber === "") {
      setErrMsg({
        ...errMsg,
        mobileNumber: errorMessage?.enterMobileNumber,
      });
      Showtoast(errorMessage?.enterMobileNumber);
      return;
    }
    if (formData?.mobileNumber?.length < 10) {
      setErrMsg({
        ...errMsg,
        mobileNumber: errorMessage?.mobileCharacters,
      });
      Showtoast(errorMessage?.mobileCharacters);
      return;
    }
    if (formData?.password === "") {
      setErrMsg({
        ...errMsg,
        password: errorMessage?.enterPassword,
      });
      Showtoast(errorMessage?.enterPassword);
      return;
    }
    dispatch(userAuthentication(formData, navigate));
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

    if (name === "password") {
      setErrMsg({
        ...errMsg,
        password: "",
      });
    }
  };
  const handlerForgetPassword = () => {
    setForgetPassword(false);
  };

  const [errMsg, setErrMsg] = useState({
    mobileNumber: "",
    password: "",
  });

  return (
    <div className={style.rightSide}>
      <p className={style.ftthapplicationlogin}>FTTH Application Login</p>
      <div className={style.formControl}>
        <div className={style.formWidth}>
          <CommonInput
            label="Mobile"
            type="number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            errMsg={errMsg?.mobileNumber}
            onKeyDown={(e) =>
              (e.keyCode === 38 || e.keyCode === 40) && e.preventDefault()
            }
            onKeyPress={(e) =>
              ((e.which !== 8 && e.which !== 0 && e.which < 48) ||
                e.which > 57) &&
              e.preventDefault()
            }
          />
          <div className={style.passwordCheck}>
            <CommonInput
              label="Password"
              type={password ? "password" : "text"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              errMsg={errMsg?.password}
              icon={
                <img
                  src={password ? assets?.hideEyeIcon : assets?.showEyeIcon}
                  alt="eyeICon"
                  onClick={() => {
                    handlepasswordIconClick();
                  }}
                  className={
                    errMsg?.password ? style.errIconHandle : style.eyeIconHandle
                  }
                />
              }
            />
          </div>
          <p className={style.forgetPassword}>
            <span
              onClick={() => handlerForgetPassword()}
              className={style.cursor_pointer}
            >
              Forget password?
            </span>
          </p>
          <div className={style.login_btn_div}>
            <CommonButton
              label="Login"
              type="filled"
              height={true}
              fullWidth={true}
              onClick={handleButtonClick}
            />
          </div>
          <div className={style.OrRow}>
            <div className={style.line}></div>
            <div className={style.or}>Or</div>
            <div className={style.line}></div>
          </div>
          <div className={style.sso_login_div}>
            <span className={style.loginWithCompany}>
              Login with company SSO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
