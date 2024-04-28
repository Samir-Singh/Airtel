import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import NavbarComponent from "../../components/Header";
import style from "./Usermanagement.module.css";
import CustomSelect from "../../components/Select";
import { IoMdMore } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getUserManagementDataAction } from "../../store/userManagement/getUserManagement";
import {
  getCircleListAction,
  getPlanningLeadAction,
  getRoleListAction,
  getTeamListAction,
} from "../../store/getAllDropDownList/getAllDropDownList";
import { addNewUserApiAction } from "../../store/userManagement/newUserOnboarding";
import Loading from "../../components/Loading/Loading";
import {
  Showtoast,
  accessKeys,
  emailValidation,
  validateKey,
} from "../../helpers/utils";
import { errorMessage } from "../../helpers/commonerror";
import Backdrop from "@mui/material/Backdrop";
import secureLocalStorage from "react-secure-storage";
import { InputBox } from "../../components/InputBox";
import CommonButton from "../../components/CommonButton";
import { useNavigate } from "react-router";
import CustomPagination from "../../components/Pagination";
import CustomContainer from "../../components/commonContainer";
import CustomTable from "../../components/Table";

const UserManagement = () => {
  const teamName = JSON.parse(
    secureLocalStorage?.getItem("loginResponse")
  )?.teamName;

  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [userAction, setUserAction] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [formData, setFormData] = useState({
    teamName: "",
    teamId: "",
    roleName: "",
    roleId: "",
    circleName: "",
    circleId: "",
    multiCircle: [],
    name: "",
    mobileNumber: "",
    emailId: "",
    olmId: "",
    reportingLeadId: "",
    reportingLeadName: "",
  });
  const [errMsg, setErrMsg] = useState({
    team: "",
    role: "",
    circle: "",
    multiCircle: "",
    name: "",
    mobile: "",
    olmId: "",
    reportingLead: "",
  });

  const [filterData, setFilterData] = useState({
    teamName: "",
    teamId: "",
    roleName: "",
    roleId: "",
    circleName: "",
    circleId: "",
    statusName: "",
    statusId: "",
  });

  const [page, setPage] = useState(1);

  const options = [
    { id: 1, value: "Active", label: "Active" },
    { id: 2, value: "In Active", label: "In Active" },
  ];

  const handleCancle = () => {
    setShow(false);
  };

  const handleButtonClick1 = () => {
    setErrMsg({
      team: "",
      role: "",
      circle: "",
      multiCircle: "",
      name: "",
      mobile: "",
      olmId: "",
      reportingLead: "",
      email: "",
    });

    if (!formData?.teamId) {
      setErrMsg({
        ...errMsg,
        team: errorMessage?.selectTeam,
      });
      Showtoast(errorMessage?.selectTeam);
      return;
    }

    if (!formData?.roleId) {
      setErrMsg({
        ...errMsg,
        role: errorMessage?.selectRole,
      });
      Showtoast(errorMessage?.selectRole);
      return;
    }

    if (
      (formData?.roleId === 3 ||
        formData?.roleId === 10 ||
        formData?.roleId === 6) &&
      formData?.multiCircle?.length <= 0
    ) {
      setErrMsg({
        ...errMsg,
        multiCircle: errorMessage?.selectCircle,
      });
      Showtoast(errorMessage?.selectCircle);
      return;
    }

    if (
      (formData?.roleId === 4 ||
        formData?.roleId === 7 ||
        formData?.roleId === 8) &&
      !formData?.circleId
    ) {
      setErrMsg({
        ...errMsg,
        circle: errorMessage?.selectCircle,
      });
      Showtoast(errorMessage?.selectCircle);
      return;
    }

    if (formData?.roleId === 8 && !formData?.reportingLeadId) {
      setErrMsg({
        ...errMsg,
        reportingLead: errorMessage?.selectCirclePlanningLead,
      });
      Showtoast(errorMessage?.selectCirclePlanningLead);
      return;
    }

    if (!formData?.name) {
      setErrMsg({
        ...errMsg,
        name: errorMessage?.enterName,
      });
      Showtoast(errorMessage?.enterName);
      return;
    }

    if (!formData?.mobileNumber) {
      setErrMsg({
        ...errMsg,
        mobile: errorMessage?.enterMobileNumber,
      });
      Showtoast(errorMessage?.enterMobileNumber);
      return;
    }

    if (formData?.mobileNumber?.length < 10) {
      setErrMsg({
        ...errMsg,
        mobile: errorMessage?.mobileCharacters,
      });
      Showtoast(errorMessage?.mobileCharacters);
      return;
    }

    if (!formData?.emailId) {
      setErrMsg({
        ...errMsg,
        email: errorMessage?.enterEmail,
      });
      Showtoast(errorMessage?.enterEmail);
      return;
    }

    if (!emailValidation(formData?.emailId)) {
      setErrMsg({
        ...errMsg,
        email: errorMessage?.validEmail,
      });
      Showtoast(errorMessage?.validEmail);
      return;
    }

    if (formData?.roleId !== 8 && !formData?.olmId) {
      setErrMsg({
        ...errMsg,
        olmId: errorMessage?.enterOlmId,
      });
      Showtoast(errorMessage?.enterOlmId);
      return;
    }

    if (formData?.olmId && formData?.olmId?.length < 8) {
      setErrMsg({
        ...errMsg,
        olmId: errorMessage?.olmIdLength,
      });
      Showtoast(errorMessage?.olmIdLength);
      return;
    }

    const payload = {};

    payload["teamId"] = formData?.teamId;
    payload["name"] = formData?.name;
    payload["emailId"] = formData?.emailId;
    payload["roleId"] = formData?.roleId;
    payload["mobileNumber"] = formData?.mobileNumber;

    if (
      formData?.roleName?.includes("Circle Marketing Head") ||
      formData?.roleName?.includes("Circle Planning Head") ||
      formData?.roleName?.includes("Circle Finance Head")
    ) {
      if (formData?.multiCircle) {
        const circleIds = formData?.multiCircle?.map((item) => item?.id);
        payload["circleId"] = circleIds;
      }
    }

    if (
      formData?.roleName?.includes("Circle Marketing Lead") ||
      formData?.roleName?.includes("Circle Planning Lead")
    ) {
      if (formData?.circleId) {
        payload["circleId"] = [formData?.circleId];
      }
    }

    if (formData?.olmId) {
      payload["olmId"] = formData?.olmId;
    }

    if (formData?.reportingLeadId) {
      payload["reportingLeadId"] = formData?.reportingLeadId;
    }

    if (formData?.userId) {
      payload["userId"] = formData?.userId;
    }

    dispatch(
      addNewUserApiAction(
        payload,
        setShow,
        page,
        filterData,
        searchData,
        navigate
      )
    );
  };

  const [showAction, setShowAction] = useState(null);

  useEffect(() => {
    if (searchData === "") {
      dispatch(
        getUserManagementDataAction({
          searchData: null,
          page: page,
          filterData: filterData,
          navigate: navigate,
        })
      );
      return;
    }
    dispatch(
      getUserManagementDataAction({
        searchData: searchData,
        page: page,
        filterData: filterData,
        navigate: navigate,
      })
    );
  }, [page, dispatch, searchData, filterData, navigate]);

  const handlePageChange = (value) => {
    setPage(value);
  };

  const userManagementData = useSelector(
    (state) => state?.getUserManagementReducer
  );

  useEffect(() => {
    dispatch(getTeamListAction(navigate));
    dispatch(getCircleListAction(navigate));
    dispatch(getRoleListAction(null, navigate));
  }, [dispatch, navigate]);

  const allDropDownData = useSelector(
    (state) => state?.getAllDropDownListReducer
  );

  const teamList = allDropDownData?.teamList?.map((item) => {
    return {
      id: item?.id,
      label: item?.name,
      value: item?.name,
    };
  });

  const circleList = allDropDownData?.circleList?.map((item) => {
    return {
      id: item?.id,
      label: item?.name,
      value: item?.name,
    };
  });

  const roleList = allDropDownData?.roleList
    ?.filter((item) => item?.name !== "Super Admin")
    ?.map((item) => {
      return {
        id: item?.id,
        label: item?.name,
        value: item?.name,
      };
    });

  const planningLeadList = allDropDownData?.planningLeadList?.map((item) => {
    return {
      id: item?.id,
      label: item?.name,
      value: item?.name,
    };
  });

  const addUserLoading = useSelector((state) => state?.addNewUserReducer);

  const handleAddnewUser = () => {
    setFormData({
      teamName: "",
      teamId: "",
      roleName: "",
      roleId: "",
      circleName: "",
      circleId: "",
      multiCircle: [],
      name: "",
      mobileNumber: "",
      emailId: "",
      olmId: "",
      reportingLeadId: "",
      reportingLeadName: "",
    });

    const teamObj = teamList?.find((item) => item?.label === teamName);

    if (teamName) {
      setFormData({
        ...formData,
        teamName: teamName,
        teamId: teamObj?.id,
      });
    }

    setShow(true);
    setUserAction("New User Onboarding");
  };

  const onStatusChange = (formData) => {
    const payload = {};

    payload["active"] = !formData?.status;
    payload["userId"] = formData?.userId;
    payload["name"] = formData?.userName;
    payload["emailId"] = formData?.email;
    payload["roleId"] = formData?.roleId;
    payload["mobileNumber"] = formData?.mobileNumber;

    dispatch(
      addNewUserApiAction(
        payload,
        setShow,
        page,
        filterData,
        searchData,
        navigate
      )
    );
  };

  const handleSearch = (e) => {
    setPage(1);
    setSearchData(e?.target?.value);
  };

  useEffect(() => {
    if (formData?.circleId) {
      dispatch(getPlanningLeadAction(formData?.circleId, navigate));
    }
  }, [formData?.circleId, dispatch, navigate]);

  const handleBackdrop = () => {
    setOpenBackdrop(false);
    setShowAction(false);
  };

  if (validateKey(accessKeys?.viewUserListing)) {
    return (
      <>
        {(userManagementData?.isLoading || addUserLoading?.isLoading) && (
          <Loading />
        )}
        <NavbarComponent />
        <CustomContainer
          heading={"User Management"}
          searchInput={true}
          userButton={true}
          exportData={true}
          handleSearch={handleSearch}
          onClick={handleAddnewUser}
          btnLabel={"Add New User"}
          searchRef={inputRef}
        >
          <div className={`select_tab`}>
            {validateKey(accessKeys?.teamFilter) && (
              <div className={`select_div`}>
                <CustomSelect
                  value={
                    filterData?.teamId
                      ? {
                          id: filterData?.teamId,
                          label: filterData?.teamName,
                          value: filterData?.teamName,
                        }
                      : null
                  }
                  onChange={(e) => {
                    setPage(1);
                    setFilterData({
                      ...filterData,
                      teamId: e?.id,
                      teamName: e?.label,
                    });
                    dispatch(getRoleListAction(e?.id, navigate));
                  }}
                  options={teamList}
                  placeholder="Team"
                  backgroundColor="var(--grey-05)"
                />
              </div>
            )}
            {validateKey(accessKeys?.roleFilter) && (
              <div className={`select_div`}>
                <CustomSelect
                  value={
                    filterData?.roleId
                      ? {
                          id: filterData?.roleId,
                          value: filterData?.roleName,
                          label: filterData?.roleName,
                        }
                      : null
                  }
                  onChange={(e) => {
                    setPage(1);
                    setFilterData({
                      ...filterData,
                      roleId: e?.id,
                      roleName: e?.label,
                    });
                  }}
                  options={roleList}
                  placeholder="Role"
                  backgroundColor="var(--grey-05)"
                />
              </div>
            )}
            {validateKey(accessKeys?.circleFilter) && (
              <div className={`select_div`}>
                <CustomSelect
                  value={
                    filterData?.circleId
                      ? {
                          id: filterData?.circleId,
                          value: filterData?.circleName,
                          label: filterData?.circleName,
                        }
                      : null
                  }
                  onChange={(e) => {
                    setPage(1);
                    setFilterData({
                      ...filterData,
                      circleId: e?.id,
                      circleName: e?.label,
                    });
                  }}
                  options={circleList}
                  placeholder="Circle"
                  backgroundColor="var(--grey-05)"
                />
              </div>
            )}
            <div className={`select_div`}>
              <CustomSelect
                value={
                  filterData?.statusId
                    ? {
                        id: filterData?.statusId,
                        value: filterData?.statusName,
                        label: filterData?.statusName,
                      }
                    : null
                }
                onChange={(e) => {
                  setPage(1);
                  setFilterData({
                    ...filterData,
                    statusId: e?.id,
                    statusName: e?.label,
                  });
                }}
                options={options}
                placeholder="Status"
                backgroundColor="var(--grey-05)"
              />
            </div>
            <div className={`select_div reset_div`}>
              <CommonButton
                label="Reset"
                type="filled"
                onClick={() => {
                  setFilterData({
                    teamName: "",
                    teamId: "",
                    roleName: "",
                    roleId: "",
                    circleName: "",
                    circleId: "",
                    statusName: "",
                    statusId: "",
                  });
                  setSearchData("");
                  inputRef.current.value = "";
                }}
              />
            </div>
          </div>

          {userManagementData?.userManagementData?.userDetailsResponses
            ?.length > 0 ? (
            <CustomTable
              header={
                <>
                  <th>Team</th>
                  <th>Role Name</th>
                  <th>Circle</th>
                  <th>Name</th>
                  <th>OLM ID</th>
                  <th>Phone Number</th>
                  <th>Email ID</th>
                  <th>Status</th>
                  {validateKey(accessKeys?.editUser) && <th>Action</th>}
                </>
              }
            >
              {userManagementData?.userManagementData?.userDetailsResponses?.map(
                (item, idx) => (
                  <tr key={item?.id} className={`table_body_row`}>
                    <td>
                      <p className={`ellipsis_para width_14_ch`}>
                        {item?.teamName || "NA"}
                      </p>
                    </td>
                    <td>
                      <p className={`ellipsis_para width_20_ch`}>
                        {item?.roleName || "NA"}
                      </p>
                    </td>
                    <td>
                      <p
                        title={
                          item?.circles
                            ? item?.circles?.length > 0
                              ? item?.circles
                                  ?.map((item) => item?.name)
                                  ?.join(",")
                              : "NA"
                            : "NA"
                        }
                        className={`ellipsis_para width_14_ch`}
                      >
                        {item?.circles
                          ? item?.circles?.length > 0
                            ? item?.circles
                                ?.map((item) => item?.name)
                                ?.join(",")
                            : "NA"
                          : "NA"}
                      </p>
                    </td>
                    <td>
                      <p className={`ellipsis_para width_14_ch`}>
                        {item?.userName || "NA"}
                      </p>
                    </td>
                    <td>
                      <p className={`ellipsis_para width_10_ch`}>
                        {item?.olmId || "NA"}
                      </p>
                    </td>
                    <td>
                      <p className={`ellipsis_para width_16_ch`}>
                        {item?.mobileNumber || "NA"}
                      </p>
                    </td>
                    <td>
                      <p>{item?.email || "NA"}</p>
                    </td>
                    <td>
                      <button
                        className={
                          item?.status === false
                            ? style.inactive_btn
                            : style.active_btn
                        }
                        onClick={() =>
                          validateKey(accessKeys?.editUser)
                            ? onStatusChange(item)
                            : null
                        }
                      >
                        {item?.status === false ? "In-Active" : "Active"}
                      </button>
                    </td>
                    {validateKey(accessKeys?.editUser) && (
                      <td>
                        <p className={style.action_para}>
                          <IoMdMore
                            onClick={() => {
                              setShowAction((prevIdx) =>
                                prevIdx === idx ? null : idx
                              );

                              setOpenBackdrop(!openBackdrop);

                              const teamObj = teamList?.find(
                                (value) => value?.label === item?.teamName
                              );

                              const roleObj = roleList?.find(
                                (value) => value?.label === item?.roleName
                              );

                              const multiCircle = Array.isArray(item?.circles)
                                ? item?.circles?.map((val) => {
                                    return {
                                      id: val?.id,
                                      label: val?.name,
                                      value: val?.name,
                                    };
                                  })
                                : [];

                              setFormData({
                                teamName: item?.teamName,
                                teamId: teamObj?.id,
                                roleName: item?.roleName,
                                roleId: roleObj?.id,
                                name: item?.userName,
                                mobileNumber: item?.mobileNumber,
                                emailId: item?.email,
                                olmId: item?.olmId,
                                reportingLeadName: item?.reportingLeadName,
                                reportingLeadId: item?.reportingLeadId,
                                multiCircle:
                                  item.roleName === "Circle Marketing Head" ||
                                  item.roleName === "Circle Planning Head" ||
                                  item.roleName === "Circle Finance Head"
                                    ? multiCircle
                                    : [],

                                circleId:
                                  item.roleName !== "Circle Marketing Head" ||
                                  item.roleName !== "Circle Planning Head" ||
                                  item.roleName !== "Circle Finance Head"
                                    ? item?.circles[0]?.id
                                    : null,

                                circleName:
                                  item.roleName !== "Circle Marketing Head" ||
                                  item.roleName !== "Circle Planning Head" ||
                                  item.roleName !== "Circle Finance Head"
                                    ? item?.circles[0]?.name
                                    : null,

                                userId: item?.userId,
                              });
                            }}
                            className={`more_action_icon`}
                          />
                          {showAction === idx && (
                            <div className={style.more_actions_div}>
                              <div
                                className={style.more_action_li}
                                onClick={() => {
                                  setShow(true);
                                  setShowAction(false);
                                  setUserAction("Edit User");
                                  setOpenBackdrop(false);
                                }}
                              >
                                Edit
                              </div>
                              <div className={style.more_action_li}>Delete</div>
                            </div>
                          )}
                        </p>
                      </td>
                    )}
                  </tr>
                )
              )}
            </CustomTable>
          ) : null}

          <CustomPagination
            page={page}
            handlePageChange={handlePageChange}
            totalCount={userManagementData?.userManagementData?.count}
          />
        </CustomContainer>

        <Modal centered show={show} className="customModal">
          <Modal.Body>
            <div className={style.modalConatiner}>
              <p className={style.newUserOnboardinP}>{userAction}</p>

              <div className={style.inputFieldsAlignment}>
                <div className={style.inputWidth}>
                  <CustomSelect
                    value={
                      formData?.teamId
                        ? {
                            id: formData?.teamId,
                            value: formData?.teamName,
                            label: formData?.teamName,
                          }
                        : null
                    }
                    onChange={(e) => {
                      dispatch(getRoleListAction(e?.id, navigate));
                      setFormData({
                        ...formData,
                        teamName: e?.label,
                        teamId: e?.id,
                        roleId: "",
                        roleName: "",
                      });
                      setErrMsg({
                        ...errMsg,
                        team: "",
                      });
                    }}
                    options={teamList}
                    placeholder="Select Team"
                    disable={userAction === "Edit User" || teamName !== null}
                  />
                  {errMsg?.team && <p className={`errorMsg`}>{errMsg?.team}</p>}
                </div>
                <div className={style.inputWidth}>
                  <CustomSelect
                    value={
                      formData?.roleId
                        ? {
                            id: formData?.roleId,
                            value: formData?.roleName,
                            label: formData?.roleName,
                          }
                        : null
                    }
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        roleName: e?.label,
                        roleId: e?.id,
                        circleId: "",
                        circleName: "",
                        reportingLeadId: "",
                        reportingLeadName: "",
                      });
                      setErrMsg({
                        ...errMsg,
                        role: "",
                      });
                    }}
                    options={roleList}
                    placeholder="Select Role"
                    disable={userAction === "Edit User"}
                  />
                  {errMsg?.role && <p className={`errorMsg`}>{errMsg?.role}</p>}
                </div>
              </div>
              {(formData?.roleName?.includes("Circle Planning Lead") ||
                formData?.roleName?.includes("Circle Marketing Lead") ||
                formData?.roleName?.includes("Surveyor")) && (
                <div className={style.inputFieldsAlignment}>
                  <div style={{ width: "27.2rem" }}>
                    <CustomSelect
                      value={
                        formData?.circleId
                          ? {
                              id: formData?.circleId,
                              value: formData?.circleName,
                              label: formData?.circleName,
                            }
                          : null
                      }
                      onChange={(e) => {
                        if (formData?.roleName?.includes("Surveyor")) {
                          dispatch(getPlanningLeadAction(e?.id, navigate));
                        }
                        setFormData({
                          ...formData,
                          circleId: e?.id,
                          circleName: e?.label,
                        });
                        setErrMsg({
                          ...errMsg,
                          circle: "",
                        });
                      }}
                      options={circleList}
                      placeholder="Select Circle"
                    />
                    {errMsg?.circle && (
                      <p className={`errorMsg`}>{errMsg?.circle}</p>
                    )}
                  </div>
                </div>
              )}

              {(formData?.roleName?.includes("Circle Marketing Head") ||
                formData?.roleName?.includes("Circle Planning Head") ||
                formData?.roleName?.includes("Circle Finance Head")) && (
                <div className={style.inputFieldsAlignment}>
                  <div style={{ width: "27.2rem" }}>
                    <CustomSelect
                      value={formData?.multiCircle || []}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          multiCircle: [...e],
                        });
                        setErrMsg({
                          ...errMsg,
                          multiCircle: "",
                        });
                      }}
                      options={circleList}
                      placeholder="Select Circles"
                      isMulti={true}
                      isClearable={false}
                    />
                    {errMsg?.multiCircle && (
                      <p className={`errorMsg`}>{errMsg?.multiCircle}</p>
                    )}
                  </div>
                </div>
              )}

              {formData?.roleName?.includes("Surveyor") && (
                <div className={style.inputFieldsAlignment}>
                  <div style={{ width: "27.2rem" }}>
                    <CustomSelect
                      value={
                        formData?.reportingLeadId
                          ? {
                              id: formData?.reportingLeadId,
                              value: formData?.reportingLeadName,
                              label: formData?.reportingLeadName,
                            }
                          : null
                      }
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          reportingLeadId: e?.id,
                          reportingLeadName: e?.label,
                        });
                        setErrMsg({
                          ...errMsg,
                          reportingLead: "",
                        });
                      }}
                      options={planningLeadList}
                      placeholder="Select Circle Planning Lead"
                    />
                    {errMsg?.reportingLead && (
                      <p className={`errorMsg`}>{errMsg?.reportingLead}</p>
                    )}
                  </div>
                </div>
              )}
              <div className={style.inputFieldsAlignment1}>
                <div className={style.inputWidth}>
                  <InputBox
                    type="text"
                    value={formData.name}
                    placeholder="Enter Name"
                    onChange={(e) => {
                      const enteredValue = e.target.value;

                      const isAlphabetic = /^[a-zA-Z\s]*$/.test(enteredValue);
                      if (e?.target?.value?.length > 50 || !isAlphabetic) {
                        return;
                      }

                      setFormData({
                        ...formData,
                        name: enteredValue,
                      });
                      setErrMsg({
                        ...errMsg,
                        name: "",
                      });
                    }}
                    errMsg={errMsg?.name}
                    styles={{ padding: "0% 5%" }}
                  />
                </div>
                <div className={style.inputWidth}>
                  <InputBox
                    type="number"
                    value={formData.mobileNumber}
                    placeholder="Enter Mobile Number"
                    onChange={(e) => {
                      if (e?.target?.value?.length > 10) {
                        return;
                      }
                      setFormData({
                        ...formData,
                        mobileNumber: e.target.value,
                      });
                      setErrMsg({
                        ...errMsg,
                        mobile: "",
                      });
                    }}
                    errMsg={errMsg?.mobile}
                    styles={{ padding: "0% 5%" }}
                    onKeyDown={(e) =>
                      (e.keyCode === 38 || e.keyCode === 40) &&
                      e.preventDefault()
                    }
                    onKeyPress={(e) =>
                      ((e.which !== 8 && e.which !== 0 && e.which < 48) ||
                        e.which > 57) &&
                      e.preventDefault()
                    }
                  />
                </div>
              </div>
              <div className={style.inputFieldsAlignment1}>
                <div className={style.inputWidth1}>
                  <InputBox
                    type="text"
                    value={formData.emailId}
                    placeholder="Enter Email Id"
                    onChange={(e) => {
                      if (e?.target?.value?.length > 70) {
                        return;
                      }
                      setFormData({
                        ...formData,
                        emailId: e?.target?.value,
                      });
                      setErrMsg({
                        ...errMsg,
                        email: "",
                      });
                    }}
                    errMsg={errMsg?.email}
                  />
                </div>
              </div>
              {(formData?.roleName?.includes("Central Marketing Head") ||
                formData?.roleName?.includes("Circle Marketing Head") ||
                formData?.roleName?.includes("Circle Marketing Lead") ||
                formData?.roleName?.includes("Central Planning Head") ||
                formData?.roleName?.includes("Circle Planning Head") ||
                formData?.roleName?.includes("Circle Planning Lead") ||
                formData?.roleName?.includes("Central Finance Head") ||
                formData?.roleName?.includes("Circle Finance Head")) && (
                <div className={style.inputFieldsAlignment1}>
                  <div className={style.inputWidth1}>
                    <InputBox
                      type="text"
                      value={formData.olmId}
                      placeholder="Enter OLM ID"
                      onChange={(e) => {
                        const inputValue = e?.target?.value;

                        if (
                          /^[a-zA-Z0-9]*$/.test(inputValue) &&
                          inputValue.length <= 8
                        ) {
                          const formattedValue = inputValue.toUpperCase();

                          setFormData({
                            ...formData,
                            olmId: formattedValue,
                          });
                          setErrMsg({
                            ...errMsg,
                            olmId: "",
                          });
                        }
                      }}
                      errMsg={errMsg?.olmId}
                    />
                  </div>
                </div>
              )}
              <div className={`btn_alignment_div`}>
                <CommonButton
                  label="Cancel"
                  height={true}
                  onClick={handleCancle}
                />
                <CommonButton
                  label="Submit"
                  onClick={handleButtonClick1}
                  type="filled"
                  height={true}
                />
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Backdrop
          sx={{
            color: "#fff",
            backgroundColor: "transparent",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={openBackdrop}
          onClick={handleBackdrop}
        ></Backdrop>
      </>
    );
  } else {
    return <h1>No Page user</h1>;
  }
};

export default UserManagement;
