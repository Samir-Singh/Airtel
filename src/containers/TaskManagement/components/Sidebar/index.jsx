import React from "react";
import style from "./SideBar.module.css";
import CommonButton from "../../../../components/Buttons";
import CommonInput from "../../../../components/inputs";
import CustomSelect from "../../../../components/Select";

const SideBar = ({
  drawingManagerRef,
  polylineRefs,
  handlePauseToggle,
  handleResumeToggle,
  pause,
  setPolylineStatus,
  polylineStatus,
}) => {
  const handlePause = () => {
    drawingManagerRef.current.setDrawingMode(null);
    handlePauseToggle();
  };
  const handleResume = () => {
    drawingManagerRef.current.setDrawingMode(
      window.google.maps.drawing.OverlayType.POLYLINE
    );
    handleResumeToggle();
  };
  const handleEditPolyline = () => {
    polylineRefs.current.forEach((polyline) => {
      polyline.setOptions({
        editable: true,
        draggable: true,
      });
    });
  };
  
  const mainPolygonFn = () => {
    setPolylineStatus({
      ...polylineStatus,
      mainSubPolygon: true,
    });
  };
  const subPolygonFn = () => {
    setPolylineStatus({
      ...polylineStatus,
      mainSubPolygon: false,
    });
  };
  return (
    <div className={style.sidebar}>
      <div className={style.polygon}>
        <div
          className={style.mainPolygon}
          onClick={mainPolygonFn}
          style={
            polylineStatus.mainSubPolygon
              ? { backgroundColor: "var(--primary-color)", color: "white" }
              : {backgroundColor: "var(--grey-25)", color: "black"}
          }
        >
          Main Polygon
        </div>
        <div className={style.subPolygon} onClick={subPolygonFn}
         style={
            !polylineStatus.mainSubPolygon
              ? { backgroundColor: "var(--primary-color)", color: "white" }
              : {backgroundColor: "var(--grey-25)", color: "black"}
          }
        >
          Sub-Polygon
        </div>
      </div>
      <div className={style.polygonBtn}>
        <CommonButton
          type={"editPolygon"}
          label={"Edit polygon"}
          styles={{ height: "2.2rem" }}
          onClick={handleEditPolyline}
        />
        {pause ? (
          <CommonButton
            type={"submit"}
            label={"Pause"}
            styles={{ height: "2.2rem" }}
            onClick={handlePause}
          />
        ) : (
          <CommonButton
            type={"submit"}
            label={"Resume"}
            styles={{ height: "2.2rem" }}
            onClick={handleResume}
          />
        )}
      </div>
      <div className={style.hr}></div>
      <div className={style.polygonform}>
        <CommonInput placeholders="Projected household count" />
        <CommonInput placeholders="Projected home pass count" />
        <CommonInput placeholders="Mobility User count" />
        <CommonInput placeholders="B2B user count" />
        <CommonInput placeholders="Vo-wifi user count" />
        <CommonInput placeholders="Leads count" />
        <div className={style.B2B}>
          <CustomSelect placeholders="B2B user count" />
        </div>
        <CommonInput placeholders="Competition home pass count" />
      </div>
      <div className={style.polygonBtn}>
        <CommonButton
          type={"submit"}
          label={"Add Operator"}
          styles={{ height: "2.2rem" }}
        />
      </div>

      <div className={style.hr} style={{ marginTop: "0rem" }}></div>
      <div className={style.polygonBtn}>
        <CommonButton
          type={"submit"}
          label={"Submit"}
          styles={{ height: "2.2rem" }}
        />
      </div>
    </div>
  );
};
export default SideBar;
