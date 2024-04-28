import style from "./CustomizedSwitch.module.css";
import { FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor:
          theme.palette.mode === "dark" ? "#177ddc" : "var(--primary-var)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#E5E5E5",
    boxSizing: "border-box",
  },
}));
const CustomizedSwitch = () => {
  return (
    <div className={style.parent_div}>
      <div className={style.heading}>My Order</div>
      {/* <FormGroup></FormGroup> */}
      <FormControlLabel
        control={
          <AntSwitch
            sx={{ m: 1 }}
            // defaultChecked
          />
        }
      />
    </div>
  );
};
export default CustomizedSwitch;
