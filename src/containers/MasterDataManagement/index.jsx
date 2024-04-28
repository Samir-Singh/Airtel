import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import NavbarComponent from "../../components/Header";
import style from "./MasterData.module.css";
import * as assets from "../../assets/index";
import CommonButton from "../../components/CommonButton";
import { useDispatch, useSelector } from "react-redux";
import { getCircleDataAction } from "../../store/masterDataManagement/getCircleData";
import moment from "moment";
import { addNewCircleApiAction } from "../../store/masterDataManagement/addNewCircle";
import { IoMdMore } from "react-icons/io";
import Backdrop from "@mui/material/Backdrop";
import Loading from "../../components/Loading/Loading";
import { downloadKMLAction } from "../../store/masterDataManagement/downloadKMLFile";
import { Showtoast, accessKeys, validateKey } from "../../helpers/utils";
import { errorMessage } from "../../helpers/commonerror";
import { InputBox, InputFileBox } from "../../components/InputBox";
import { useNavigate } from "react-router";
import SelectTab from "../../components/SelectTab";
import CustomContainer from "../../components/commonContainer";
import CustomTable from "../../components/Table";
import CustomPagination from "../../components/Pagination";

const MasterDataManagement = () => {
  const kmlFileRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [circleId, setCircleId] = useState(null);
  const [activeTab, setActiveTab] = useState("Circle File Management");
  const [circleAction, setCircleAction] = useState(null);
  const [page, setPage] = useState(1);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddnewUser = () => {
    setShow(true);
    setFormField({
      circleName: "",
      circleAbb: "",
      kml: "",
    });
    setErrMsg({
      circleName: "",
      circleAbb: "",
      kml: "",
    });
    setCircleAction("Add New Circle");
  };

  const handleCancle = () => {
    setShow(false);
  };

  useEffect(() => {
    if (searchData === "") {
      dispatch(
        getCircleDataAction({
          searchData: null,
          page: page,
          navigate: navigate,
        })
      );
    } else {
      dispatch(
        getCircleDataAction({
          searchData: searchData,
          page: page,
          navigate: navigate,
        })
      );
    }
  }, [dispatch, searchData, page, navigate]);

  const circleDataList = useSelector((state) => state?.circleListReducer);

  const [formField, setFormField] = useState({
    circleName: "",
    circleAbb: "",
    kml: "",
  });

  const [errMsg, setErrMsg] = useState({
    circleName: "",
    circleAbb: "",
    kml: "",
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFormField({
        ...formField,
        kml: file,
      });
      setErrMsg({
        ...errMsg,
        kml: "",
      });
    }
  };

  const handleSubmit = () => {
    if (!formField?.circleName) {
      setErrMsg({
        ...errMsg,
        circleName: errorMessage?.enterCircleName,
      });
      Showtoast(errorMessage?.enterCircleName);
      return;
    }

    if (!formField?.circleAbb) {
      setErrMsg({
        ...errMsg,
        circleAbb: errorMessage?.enterCircleAbb,
      });
      Showtoast(errorMessage?.enterCircleAbb);
      return;
    }

    if (!formField?.kml) {
      setErrMsg({
        ...errMsg,
        kml: errorMessage?.selectFile,
      });
      Showtoast(errorMessage?.selectFile);
      return;
    }

    const data = new FormData();
    data.append("circleName", formField?.circleName);
    data.append("circleAbb", formField?.circleAbb);
    if (formField?.kml instanceof File) {
      data.append("kml", formField?.kml);
    }
    if (circleAction === "Edit Circle") {
      data.append("id", circleId);
    }
    dispatch(addNewCircleApiAction(data, setShow, navigate));
  };

  const handlePageChange = (value) => {
    setPage(value);
  };

  const handleBackdrop = () => {
    setOpenBackdrop(false);
    setShowAction(false);
  };

  const addCircleLoading = useSelector(
    (state) => state?.addNewCircleReducer?.isLoading
  );

  const handleSearch = (e) => {
    setPage(1);
    setSearchData(e?.target?.value);
  };

  if (validateKey(accessKeys?.viewMasterListing)) {
    return (
      <>
        {(circleDataList?.isLoading || addCircleLoading) && <Loading />}
        <NavbarComponent />
        <CustomContainer
          heading="Master Data Management"
          searchInput={true}
          userButton={true}
          exportData={true}
          handleSearch={handleSearch}
          onClick={handleAddnewUser}
          btnLabel={"Add New Circle"}
        >
          <div className={`select_tab`}>
            <SelectTab
              label="Circle File Management"
              active={activeTab === "Circle File Management"}
            />
            <SelectTab label="Master BOQ" active={activeTab === "Master BOQ"} />
            <SelectTab
              label="GIS File Management"
              active={activeTab === "GIS File Management"}
            />
          </div>

          <CustomTable
            header={[
              "Circle Name",
              "Circle Abbreviation",
              "Last Updated At",
              "KML File",
              "Action",
            ]?.map((item) => (
              <th className={`table_heading`}>{item}</th>
            ))}
          >
            {circleDataList?.circleData?.circleEntityList?.map((item, idx) => (
              <tr className={`table_body_row`} key={idx}>
                <td>
                  <p className={`ellipsis_para width_14_ch`}>
                    {item?.circleName || "NA"}
                  </p>
                </td>
                <td>
                  <p className={`ellipsis_para width_10_ch`}>
                    {item?.circleAbbreviation || "NA"}
                  </p>
                </td>
                <td>
                  <p
                    className={`ellipsis_para width_16_ch ${style.last_update_para}`}
                  >
                    {item?.updatedDate ? (
                      <>
                        <span>
                          {moment(item?.updatedDate)?.format("DD-MM-YYYY")}
                        </span>
                        <span>
                          {moment(item?.updatedDate)?.format("HH:mm")}
                        </span>
                      </>
                    ) : (
                      "NA"
                    )}
                  </p>
                </td>
                <td>
                  <p className={style.kml_file_para}>
                    <CommonButton
                      label="Download File"
                      height={true}
                      onClick={() => {
                        dispatch(
                          downloadKMLAction(
                            item?.id,
                            item?.circleName,
                            item?.circleAbbreviation,
                            navigate
                          )
                        );
                      }}
                      type="filled"
                      icon={assets?.downloadkml}
                    />
                  </p>
                </td>
                <td>
                  <p className={style.action_para}>
                    <span className={style.more_icon_span}>
                      <IoMdMore
                        onClick={() => {
                          setShowAction((prevIdx) =>
                            prevIdx === idx ? null : idx
                          );
                          setFormField({
                            circleName: item?.circleName,
                            circleAbb: item?.circleAbbreviation,
                            kml: item?.filePath
                              ? item?.filePath?.split("/upload/")[1]
                              : "",
                          });
                          setOpenBackdrop(!openBackdrop);
                        }}
                        className={`more_action_icon`}
                      />
                    </span>
                    {showAction === idx && (
                      <div className={style.more_actions_div}>
                        <div
                          onClick={() => {
                            setShow(true);
                            setShowAction(false);
                            setCircleAction("Edit Circle");
                            setCircleId(item?.id);
                            setOpenBackdrop(false);
                          }}
                          className={style.more_action_li}
                        >
                          Edit
                        </div>
                      </div>
                    )}
                  </p>
                </td>
              </tr>
            ))}
          </CustomTable>

          <CustomPagination
            page={page}
            handlePageChange={handlePageChange}
            totalCount={circleDataList?.circleData?.count}
          />

          {/* {circleDataList?.circleData?.circleEntityList?.length > 0 ? (
            <div className={`table_container`}>
              <Table responsive="lg">
                <thead className={`table_head`}>
                  <tr className={`table_heading_row`}>
                    <th>Circle Name</th>
                    <th>Circle Abbreviation</th>
                    <th>Last Updated At</th>
                    <th>KML File </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {circleDataList?.circleData?.circleEntityList?.map(
                    (item, idx) => (
                      <tr className={`table_body_row`} key={idx}>
                        <td>
                          <p className={`ellipsis_para width_14_ch`}>
                            {item?.circleName || "NA"}
                          </p>
                        </td>
                        <td>
                          <p className={`ellipsis_para width_10_ch`}>
                            {item?.circleAbbreviation || "NA"}
                          </p>
                        </td>
                        <td>
                          <p
                            className={`ellipsis_para width_16_ch ${style.last_update_para}`}
                          >
                            {item?.updatedDate ? (
                              <>
                                <span>
                                  {moment(item?.updatedDate)?.format(
                                    "DD-MM-YYYY"
                                  )}
                                </span>
                                <span>
                                  {moment(item?.updatedDate)?.format("HH:mm")}
                                </span>
                              </>
                            ) : (
                              "NA"
                            )}
                          </p>
                        </td>
                        <td>
                          <p className={style.kml_file_para}>
                            <CommonButton
                              label="Download File"
                              height={true}
                              onClick={() => {
                                dispatch(
                                  downloadKMLAction(
                                    item?.id,
                                    item?.circleName,
                                    item?.circleAbbreviation,
                                    navigate
                                  )
                                );
                              }}
                              type="filled"
                              icon={assets?.downloadkml}
                            />
                          </p>
                        </td>
                        <td>
                          <p className={style.action_para}>
                            <span className={style.more_icon_span}>
                              <IoMdMore
                                onClick={() => {
                                  setShowAction((prevIdx) =>
                                    prevIdx === idx ? null : idx
                                  );
                                  setFormField({
                                    circleName: item?.circleName,
                                    circleAbb: item?.circleAbbreviation,
                                    kml: item?.filePath
                                      ? item?.filePath?.split("/upload/")[1]
                                      : "",
                                  });
                                  setOpenBackdrop(!openBackdrop);
                                }}
                                className={`more_action_icon`}
                              />
                            </span>
                            {showAction === idx && (
                              <div className={style.more_actions_div}>
                                <div
                                  onClick={() => {
                                    setShow(true);
                                    setShowAction(false);
                                    setCircleAction("Edit Circle");
                                    setCircleId(item?.id);
                                    setOpenBackdrop(false);
                                  }}
                                  className={style.more_action_li}
                                >
                                  Edit
                                </div>
                              </div>
                            )}
                          </p>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>

              {circleDataList?.circleData?.count > 10 ? (
                <div className={`pagination_div`}>
                  <Stack spacing={2}>
                    <Pagination
                      count={Math.ceil(
                        (circleDataList?.circleData?.count || 0) / 10
                      )}
                      variant="outlined"
                      shape="rounded"
                      onChange={(e, value) => handlePageChange(value)}
                      page={page}
                    />
                  </Stack>
                </div>
              ) : null}
            </div>
          ) : null} */}
        </CustomContainer>
        <Modal style={{ zIndex: "1203" }} centered show={show}>
          <Modal.Body>
            <div className={style.modalConatiner}>
              <p className={style.newUserOnboardinP}>{circleAction}</p>

              <div className={style.inputFieldsAlignment}>
                <div className={style.inputWidth1}>
                  <InputBox
                    type="text"
                    placeholder="Circle Name"
                    value={formField?.circleName}
                    onChange={(e) => {
                      const enteredValue = e.target.value;

                      const isAlphabetic = /^[a-zA-Z\s]*$/.test(enteredValue);

                      if (e?.target?.value?.length > 50 || !isAlphabetic) {
                        return;
                      }

                      setFormField({
                        ...formField,
                        circleName: e?.target?.value,
                      });
                      setErrMsg({
                        ...errMsg,
                        circleName: "",
                      });
                    }}
                    errMsg={errMsg?.circleName}
                  />
                </div>
              </div>
              <div className={style.inputFieldsAlignment}>
                <div className={style.inputWidth1}>
                  <InputBox
                    type="text"
                    placeholder="Circle Abbreviation"
                    value={formField?.circleAbb}
                    onChange={(e) => {
                      const enteredValue = e.target.value;

                      const isAlphabetic = /^[a-zA-Z]*$/.test(enteredValue);

                      if (e?.target?.value?.length > 5 || !isAlphabetic) {
                        return;
                      }
                      setFormField({
                        ...formField,
                        circleAbb: enteredValue?.toUpperCase(),
                      });
                      setErrMsg({
                        ...errMsg,
                        circleAbb: "",
                      });
                    }}
                    errMsg={errMsg?.circleAbb}
                  />
                </div>
              </div>
              <div className={style.kmlFileDiv}>
                <InputFileBox
                  value={formField?.kml}
                  fileRef={kmlFileRef}
                  onChange={handleFileChange}
                  accept=".kml"
                  placeholder="Attach Circle File (KML File Only)"
                  errMsg={errMsg?.kml}
                />
              </div>
              <div className={`btn_alignment_div`}>
                <CommonButton
                  label="Cancel"
                  onClick={handleCancle}
                  height={true}
                />
                <CommonButton
                  label="Submit"
                  onClick={handleSubmit}
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
    return <h1>No Page Master</h1>;
  }
};

export default MasterDataManagement;
