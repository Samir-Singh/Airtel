import { IoSearchOutline } from "react-icons/io5";
import style from "./SearchInputBax.module.css";
const SearchInputBox = ({ inputRef, onChange, placeholder }) => {
  return (
    <>
      <div className={style.s1}>
        <input
          ref={inputRef}
          type="text"
          className={style.search_bar}
          placeholder={placeholder}
          onChange={onChange}
        />
        <div className={style.search_pipe}>|</div>
        <IoSearchOutline className={style.search_icon} />
      </div>
    </>
  );
};
export default SearchInputBox;
