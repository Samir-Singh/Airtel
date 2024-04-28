import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import style from "./login.module.css";
import * as assets from "../../assets/index";
import LoginForm from "./components/Login";
import ForgetPasswordForm from "./components/ForgetPassword";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router";
import secureLocalStorage from "react-secure-storage";
import ResetPasswordForm from "./components/ResetPassword";
import OtpVerification from "./components/OtpVerification";
import { accessKeys } from "../../helpers/utils";

const LoginPages = () => {
  const [forgetPassword, setForgetPassword] = useState(true);
  const [show, setShow] = useState(false);
  const loginLoader = useSelector((state) => state?.authReducer?.isLoading);
  const resetPasswordLoader = useSelector(
    (state) => state?.resetPasswordReducer?.isLoading
  );
  const resetPassword = useSelector(
    (state) => state?.resetPasswordReducer?.isOtpVerified
  );
  const userRole = JSON.parse(
    secureLocalStorage.getItem("loginResponse")
  )?.roleName;
  const navigate = useNavigate();
  useEffect(() => {
    if (userRole) {
      if (userRole === "Super Admin") {
        navigate("/role-management");
      } else {
        let roles = JSON.parse(
          secureLocalStorage?.getItem("loginResponse")
        )?.navigations;
        if (roles?.includes(accessKeys?.viewUserListing)) {
          navigate("/user-management");
        } else if (roles?.includes(accessKeys?.viewTaskListing)) {
          navigate("/task-management");
        }
      }
    }
  }, [navigate, userRole]);

  const [formData, setFormData] = useState({
    mobileNumber: "",
  });

  return (
    <>
      {(loginLoader || resetPasswordLoader) && <Loading />}
      <Container fluid>
        <Row className={style.fullheight}>
          <Col md={6} className={style.removeExtrapadding}>
            <div className={style.leftSide}>
              <div className={style.mainlogoAlignment}>
                <img src={assets.mainlogo} alt="mainlogo" />
              </div>
              <div className={style.internetImg}>
                <img
                  src={assets.internetLogo}
                  alt="airtelInternetImg"
                  className={style.internetImgWidth}
                />
              </div>
            </div>
          </Col>
          <Col md={6} className={style.removeExtrapadding}>
            {(() => {
              if (forgetPassword) {
                return <LoginForm setForgetPassword={setForgetPassword} />;
              } else if (resetPassword) {
                return (
                  <ResetPasswordForm
                    formValue={formData}
                    setForgetPassword={setForgetPassword}
                  />
                );
              } else {
                return (
                  <ForgetPasswordForm
                    setForgetPassword={setForgetPassword}
                    formData={formData}
                    setFormData={setFormData}
                    setShow={setShow}
                  />
                );
              }
            })()}
            <OtpVerification
              formData={formData}
              setForgetPassword={setForgetPassword}
              show={show}
              setShow={setShow}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPages;
