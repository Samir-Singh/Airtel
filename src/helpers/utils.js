import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Showtoast(msg) {
  toast.error(`${msg}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export function ShowtoastSuccess(msg) {
  toast.success(`${msg}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export function Debouncing(fn, delay = 500) {
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(fn.timer);
    fn.timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

export const emailValidation = (email) => {
  const username = "[a-zA-Z0-9.\\-_+]+";
  const domain =
    "(?:[a-zA-Z0-9](?:[a-zA-Z0-9\\-]*[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}";
  const pattern = new RegExp(`^(?=[^@]*[A-Za-z])${username}@${domain}$`, "i");
  return pattern.test(String(email).toLowerCase());
};

export const passwordValidation = (password) => {
  return /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])(?=.*[a-zA-Z])(?=.*\d)/.test(
    password
  );
};

export const passMatchWithCPass = (pass, cpass) => {
  if (pass.length === cpass.length && pass === cpass) {
    return true;
  } else {
    return false;
  }
};

export const accessKeys = {
  // Role Management
  viewRoleListing: "982S6861M83282NC",
  editRole: "834S1550N10666UL",

  // User Management
  viewUserListing: "147H6449W67426RE",
  createUser: "118E7385J17356WO",
  editUser: "121V5050W61950TV",
  teamFilter: "733A4904K45012UV",
  roleFilter: "805M9144Y28040CK",
  circleFilter: "847F5784H36949EK",
  searchUser: "260T5677A22929QN",

  // Task Management
  viewTaskListing: "343N4640O82054NA",

  // Master Data Management
  viewMasterListing: "246O5550B35961VU",
  createCircle: "363Z5719B58576QJ",
  downloadCircleFile: "947G8552C86807GI",
  searchCircle: "354W2951Y93130NM",
  editCircle: "870K9862P35574WV",
};

export const validateKey = (accessKey) => {
  const accessCodes = JSON.parse(
    secureLocalStorage?.getItem("loginResponse")
  )?.navigations;

  return accessCodes?.includes(accessKey);
};

export const generateKMLFileToCoordinates = (kmlFile) => {
  const uint8Array = new Uint8Array(kmlFile);
  const kmlString = new TextDecoder().decode(uint8Array);
  const parser = new DOMParser();
  const kmlDoc = parser.parseFromString(kmlString, 'application/xml');
  let coordinateArraynew = [];
  const placemarks = kmlDoc.querySelectorAll('Placemark');
  placemarks.forEach(placemark => {
      const coordinatesStr = placemark.querySelector('coordinates').textContent;
      const coordinateArray = coordinatesStr.split(' ').map(coord => coord.trim());
       coordinateArraynew=coordinateArray.map((item)=>{
        item=item.split(",")
        return {lat: parseFloat(item[1]),lng:parseFloat(item[0])};
      })
  });
  coordinateArraynew.pop();
  return coordinateArraynew;
};
