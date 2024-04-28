import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import NavbarComponent from "../../components/Header";
import style from "./Rolemanagements.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { getRoleManagementAction } from "../../store/roleManagement/getRoleManagement";
import { editRoleManagementAction } from "../../store/roleManagement/editRoleManagement";
import { accessKeys, validateKey } from "../../helpers/utils";
import CommonButton from "../../components/CommonButton";
import { useNavigate } from "react-router";
import SelectTab from "../../components/SelectTab";

const RoleManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Marketing Team");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const [RoleListingData, setRoleListingData] = useState([]);
  const [EditAccess, setEditAccess] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const [editRoleAccess, setEditRoleAccess] = useState([]);
  const handleChange = (roleId, platform, platformId) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [roleId]: platform,
    }));
    const existingRole = editRoleAccess.find((item) => item.roleId === roleId);
    if (!existingRole) {
      setEditRoleAccess([
        ...editRoleAccess,
        {
          roleId: roleId,
          platformId: platformId,
        },
      ]);
    } else {
      const updatedArr = editRoleAccess.filter(
        (item) => item.roleId !== roleId
      );
      setEditRoleAccess([
        ...updatedArr,
        {
          roleId: roleId,
          platformId: platformId,
        },
      ]);
    }
  };

  const dispatch = useDispatch();
  const Roledata = useSelector((state) => state.getRoleManagementReducer);
  const editRoleLoading = useSelector(
    (state) => state.editRoleManagementReducer?.isLoading
  );

  useEffect(() => {
    const result = Roledata?.roleManagementData?.filter(
      (team) => team.teamName === activeTab
    );
    setRoleListingData(result);
  }, [activeTab, Roledata]);

  const EditAccessHandle = () => {
    setEditAccess(true);
  };
  const SaveAccessHandle = () => {
    setEditAccess(false);
    dispatch(editRoleManagementAction(editRoleAccess, navigate));
  };

  useEffect(() => {
    dispatch(getRoleManagementAction(navigate));
  }, [dispatch, navigate]);

  useEffect(() => {
    if (RoleListingData) {
      if (RoleListingData[0]?.roles) {
        const obj = {};
        RoleListingData[0]?.roles.forEach((role) => {
          obj[role.roleId] = role.platform;
        });
        setSelectedOptions(obj);
      }
    }
  }, [RoleListingData]);

  if (validateKey(accessKeys?.viewRoleListing)) {
    return (
      <>
        {(Roledata?.isLoading || editRoleLoading) && <Loading />}
        <NavbarComponent />
        <Container className={style.containerWithNavbarOffset}>
          <div>
            <h5 className={style.RoleManagement}>Role Management</h5>
          </div>
          <div className={style.tabAlignments}>
            {Roledata?.roleManagementData?.map((team, index) => (
              <SelectTab
                label={team?.teamName}
                onClick={() => handleTabClick(team.teamName)}
                active={activeTab === team?.teamName}
              />
            ))}
          </div>
          <div className={style.tableConatainer}>
            <Table responsive="lg">
              <thead>
                <tr className={style.tr}>
                  <th>Role Name</th>
                  {Array?.isArray(RoleListingData) &&
                    RoleListingData[0]?.roles?.map((role) => (
                      <th key={role.roleId}>{role.roleName}</th>
                    ))}
                  {validateKey(accessKeys?.editRole) && <th></th>}
                </tr>
              </thead>
              <tbody>
                <tr className={style.tr}>
                  <td className={style.tdStyle}>Access</td>
                  {Array.isArray(RoleListingData) &&
                    RoleListingData[0]?.roles?.map((role) => (
                      <React.Fragment key={role.roleId}>
                        {EditAccess === false ? (
                          <td key={role.roleId}>{role.platform}</td>
                        ) : (
                          <td key={role.roleId}>
                            {role?.roleName === "Surveyor" ? (
                              role?.platform
                            ) : (
                              <>
                                <label className={style.RadioLabel}>
                                  <input
                                    type="radio"
                                    name={`group_${role.roleId}`}
                                    value="MOBILE"
                                    checked={
                                      selectedOptions[role.roleId] === "MOBILE"
                                    }
                                    onChange={() =>
                                      handleChange(role.roleId, "MOBILE", 1)
                                    }
                                  />{" "}
                                  MOBILE
                                </label>
                                <label className={style.RadioLabel}>
                                  <input
                                    type="radio"
                                    name={`group_${role.roleId}`}
                                    value="WEB"
                                    checked={
                                      selectedOptions[role.roleId] === "WEB"
                                    }
                                    onChange={() =>
                                      handleChange(role.roleId, "WEB", 2)
                                    }
                                  />{" "}
                                  WEB
                                </label>
                                <label className={style.RadioLabel}>
                                  <input
                                    type="radio"
                                    name={`group_${role.roleId}`}
                                    value="BOTH"
                                    checked={
                                      selectedOptions[role.roleId] === "BOTH"
                                    }
                                    onChange={() =>
                                      handleChange(role.roleId, "BOTH", 3)
                                    }
                                  />{" "}
                                  BOTH
                                </label>
                              </>
                            )}
                          </td>
                        )}
                      </React.Fragment>
                    ))}

                  {validateKey(accessKeys?.editRole) && (
                    <td>
                      {EditAccess === false ? (
                        <CommonButton
                          label="Edit"
                          type="filled"
                          height={true}
                          onClick={EditAccessHandle}
                        />
                      ) : (
                        <CommonButton
                          label="Save"
                          type="filled"
                          height={true}
                          onClick={SaveAccessHandle}
                        />
                      )}
                    </td>
                  )}
                </tr>

                <tr className={style.tr}>
                  <td className={style.tdStyle}>Feature</td>
                  {Roledata?.roleManagementData
                    ?.find((team) => team.teamName === activeTab)
                    ?.roles.map((role) => (
                      <React.Fragment key={role.roleId}>
                        <td>
                          {role.features.map((feature, index) => (
                            <div key={index}>{feature.label}</div>
                          ))}
                        </td>
                      </React.Fragment>
                    ))}
                  {validateKey(accessKeys?.editRole) && <td></td>}
                </tr>
              </tbody>
            </Table>
          </div>
        </Container>
      </>
    );
  } else {
    return <h1>No Page Role</h1>;
  }
};

export default RoleManagement;
