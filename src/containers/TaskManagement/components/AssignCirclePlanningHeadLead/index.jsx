import CommonButton from "../../../../components/CommonButton";
import NavbarComponent from "../../../../components/Header";
import CustumRadio from "../../../../components/Radio";
import SearchInputBox from "../../../../components/SearchInputBox";
import CustomTable from "../../../../components/Table";
import CustomContainer from "../../../../components/commonContainer";
import TaskDetails from "../TaskDetails";
import style from "./AssignCiclePlanningHead.module.css";

const AssignCirclePlanningHeadLead = () => {
    return (
        <>
         <NavbarComponent />
         <CustomContainer heading={"Task Management"}>
         <TaskDetails />
         <div className={style.assignCicle}>
                <p className={style.heading}>Assign Circle Planning Head Lead</p>
                <SearchInputBox
            //   inputRef={inputRef}
            //   onChange={Debouncing(handleSearch, 500)}
              placeholder="Search"
            />

         </div>
         <CustomTable header={
              <>
                <th>Assign</th>
                <th> Name</th>
                <th>OLM ID</th>
                <th>Ongoing Orders</th>
                <th>Mobile Number</th>
                
              </>
            }>
            {[1,2,3,4,5,6,7,8,9,10].map((item) => {
                return (
                    <tr className={style.trr} key={item}>
                        <td><CustumRadio label={""}/></td>
                        <td>Shivam</td>
                        <td>OLM12345</td>
                        <td>2</td>
                        <td>9876543210</td>
                    </tr>
                )
            })
            }
          
            </CustomTable>
            <div className={style.btnAlligment}>
            <CommonButton label={"Cancel" }height={true}/>
            <CommonButton label={"Submit" }height={true} type={"filled"}/>
           </div>
         </CustomContainer>
        </>
    )
}
export default AssignCirclePlanningHeadLead;