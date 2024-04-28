import { Container } from "react-bootstrap";
import style from "./commonContainer.module.css";
import SearchInputBox from "../SearchInputBox";
import CommonButton from "../CommonButton";
import * as assets from "../../assets/index";
import { Debouncing } from "../../helpers/utils";
const CustomContainer = ({
  children,
  searchInput = false,
  heading,
  userButton = false,
  exportData = false,
  onClick,
  handleSearch,
  onExport,
  btnLabel,
  searchRef,
}) => {
  return (
    <Container className={`main_container`}>
      <div className={`dashboard_flex_div`}>
        <h5 className={`dashboard_header`}>{heading}</h5>
        {searchInput && (
          <SearchInputBox
            inputRef={searchRef}
            onChange={Debouncing(handleSearch, 500)}
            placeholder="Search"
          />
        )}
        <div className={style.flex_div}>
          {userButton && (
            <CommonButton
              label={btnLabel}
              onClick={onClick}
              type="filled"
              height={true}
            />
          )}
          {exportData && (
            <CommonButton
              label="Export Data to Excel"
              height={true}
              icon={assets.exportData}
              onClick={onExport}
            />
          )}
        </div>
      </div>
      {children}
    </Container>
  );
};
export default CustomContainer;
