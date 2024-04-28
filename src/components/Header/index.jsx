import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as assets from "../../assets/index";
import style from "./Header.module.css";
import Backdrop from "@mui/material/Backdrop";
import secureLocalStorage from "react-secure-storage";
import { accessKeys, validateKey } from "../../helpers/utils";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logout, setLogout] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const userRole = JSON.parse(secureLocalStorage.getItem("loginResponse"));

  const handleBackdrop = () => {
    setOpenBackdrop(false);
    setLogout(false);
  };

  return (
    <>
      <Navbar
        onClick={() => {
          if (openBackdrop === true) {
            setOpenBackdrop(false);
          }

          if (logout === true) {
            setLogout(false);
          }
        }}
        expand="lg"
        sticky="top"
        className={`${style.custumCss} px-4`}
      >
        {/* Add padding using Bootstrap utility class px-4 */}
        <Navbar.Brand as={Link} to="/" className={style.Airteliconhandle}>
          <img
            alt="Logo"
            src={assets?.aiterlLogo}
            width="60"
            height="61"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {validateKey(accessKeys?.viewRoleListing) && (
              <Nav.Link className={style.linkWidth}>
                <span
                  className={`${style.headername} ${
                    location.pathname === "/role-management"
                      ? style.headernameActive
                      : ""
                  }`}
                  onClick={() => navigate("/role-management")}
                >
                  Role Management
                </span>
              </Nav.Link>
            )}

            {validateKey(accessKeys?.viewUserListing) && (
              <Nav.Link className={style.linkWidth}>
                <span
                  className={`${style.headername} ${
                    location.pathname === "/user-management"
                      ? style.headernameActive
                      : ""
                  }`}
                  onClick={() => navigate("/user-management")}
                >
                  User Management
                </span>
              </Nav.Link>
            )}

            {validateKey(accessKeys?.viewTaskListing) && (
              <Nav.Link className={style.linkWidth}>
                <span
                  className={`${style.headername} ${
                    location.pathname === "/task-management" ||
                    location?.pathname === "/task-locality-management"
                      ? style.headernameActive
                      : ""
                  }`}
                  // onClick={() => navigate("/task-management")}
                >
                  Task Management
                </span>
              </Nav.Link>
            )}

            {validateKey(accessKeys?.viewMasterListing) && (
              <Nav.Link className={style.linkWidth1}>
                <span
                  className={`${style.headername} ${
                    location.pathname === "/master-data-management"
                      ? style.headernameActive
                      : ""
                  }`}
                  onClick={() => navigate("/master-data-management")}
                >
                  Master Data Management
                </span>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Brand
          onClick={() => {
            setLogout(!logout);
            setOpenBackdrop(!openBackdrop);
          }}
          className={style.Usericonhandle}
        >
          <img
            alt="Logo"
            src={assets?.userIcon}
            width="16"
            height="21"
            className="d-inline-block align-top"
          />{" "}
          <span className={style.admin}>{userRole?.userName}</span>
          {logout && (
            <div className={style.logout_div}>
              <div className={style.logout_li}>Profile</div>
              <div
                onClick={() => {
                  secureLocalStorage.clear();
                  navigate("/");
                }}
                className={style.logout_li}
              >
                Logout
              </div>
            </div>
          )}
        </Navbar.Brand>
      </Navbar>

      <Backdrop
        sx={{
          color: "#fff",
          backgroundColor: "transparent",
          zIndex: "10 !important",
        }}
        open={openBackdrop}
        onClick={handleBackdrop}
      ></Backdrop>
    </>
  );
};

export default NavbarComponent;
