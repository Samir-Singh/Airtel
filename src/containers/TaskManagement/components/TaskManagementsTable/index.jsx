import NavbarComponent from "../../../../components/Header";
import { useNavigate } from "react-router-dom";
import { accessKeys, validateKey } from "../../../../helpers/utils";
import CustomContainer from "../../../../components/commonContainer";
import CustomTable from "../../../../components/Table";
import SelectTab from "../../../../components/SelectTab";
import DateRangeFilterModal from "../../../../components/Modal/DateRangeFilterModal";
import { useState } from "react";
import CustomSelect from "../../../../components/Select";
import CustomPagination from "../../../../components/Pagination";
import CommonButton from "../../../../components/CommonButton";
import secureLocalStorage from "react-secure-storage";

const TaskManagementsTable = () => {
  secureLocalStorage?.setItem("order_created", false);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleNavigation = () => {
    navigate("/task-management-details");
  };

  if (validateKey(accessKeys?.viewTaskListing)) {
    return (
      <>
        <NavbarComponent />
        <CustomContainer
          heading={"Task Management"}
          searchInput={true}
          userButton={true}
          exportData={true}
          onClick={() => navigate("/task-locality-management")}
          btnLabel={"Add New Task"}
        >
          <div className={`select_tab`}>
            <SelectTab label={"Assigned"} active={true} />
            <SelectTab label={"Rejected"} active={false} />
            <SelectTab label={"Ongoning"} active={false} />
            <SelectTab label={"All Task"} active={false} />
          </div>

          <div className={`select_tab`}>
            <div className={`select_div`}>
              <CustomSelect
                placeholder="Status"
                backgroundColor="var(--grey-05)"
              />
            </div>
            <div className={`select_div`}>
              <CustomSelect
                placeholder="Circle"
                backgroundColor="var(--grey-05)"
              />
            </div>
            <div className={`select_div reset_div`}>
              <CommonButton label="Reset" type="filled" />
            </div>
          </div>

          <CustomTable
            header={[
              "Task ID",
              "Locality Name",
              "Created At",
              "Created By",
              "Circle",
              "Details",
              "Status",
              "Last Updated At",
              "Last Updated By",
              "Last Updated Role",
            ]?.map((item) => (
              <th className={`table_heading`}>{item}</th>
            ))}
          >
            {
              <>
                <tr
                  className={`table_body_row`}
                  onClick={() => handleNavigation()}
                >
                  <td>
                    <p className={`ellipsis_para width_5_ch`}>12345</p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_14_ch`}>Noida Sec 126</p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_16_ch`}>
                      30-10-2023 28:23
                    </p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_20_ch`}>
                      User Name(A1HTYSP)
                    </p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_16_ch`}>Uttar Pradesh</p>
                  </td>
                  <td>
                    <CommonButton
                      label="View Details"
                      type="filled"
                      height={true}
                    />
                  </td>
                  <td>
                    <p className={`ellipsis_para width_20_ch`}>
                      Circle Planning Lead BOQ Planning Update
                    </p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_16_ch`}>
                      30-10-2023 28:23
                    </p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_16_ch`}>
                      30-10-2023 28:23
                    </p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_20_ch`}>
                      Circle Marketing Lead
                    </p>
                  </td>
                </tr>
                <tr className={`table_body_row`}>
                  <td>
                    <p className={`ellipsis_para width_5_ch`}>12345</p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_14_ch`}>Noida Sec 126</p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_16_ch`}>
                      30-10-2023 28:23
                    </p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_20_ch`}>
                      User Name(A1HTYSP)
                    </p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_16_ch`}>Uttar Pradesh</p>
                  </td>
                  <td>
                    <CommonButton
                      label="View Details"
                      type="filled"
                      height={true}
                    />
                  </td>
                  <td>
                    <p className={`ellipsis_para width_20_ch`}>
                      Circle Planning Lead BOQ Planning Update
                    </p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_16_ch`}>
                      30-10-2023 28:23
                    </p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_16_ch`}>
                      30-10-2023 28:23
                    </p>
                  </td>
                  <td>
                    <p className={`ellipsis_para width_20_ch`}>
                      Circle Marketing Lead
                    </p>
                  </td>
                </tr>
              </>
            }
          </CustomTable>
          <CustomPagination
            handlePageChange={() => null}
            page={1}
            totalCount={30}
          />
        </CustomContainer>
        <DateRangeFilterModal show={show} handleClose={setShow} />
      </>
    );
  } else {
    return <h1>No Page Found</h1>;
  }
};
export default TaskManagementsTable;
