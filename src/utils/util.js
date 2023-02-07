import parse from "html-react-parser";

export const checkValidFullName = (value) => {
  let regex = new RegExp("^([A-Za-z ])+$");
  if (value) {
    if (!regex.test(value)) {
      return false;
    } else {
      return true;
    }
  }
};

export const checkValidUsername = (value) => {
  let regex = new RegExp("^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})|(^[0-9]{10})+$");

  if (value) {
    if (!regex.test(value)) {
      return false;
    } else {
      return true;
    }
  }
};

export const checkValidPhone = (value) => {
  let regex = new RegExp("^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$");
  if (value) {
    if (!regex.test(value)) {
      return false;
    } else {
      return true;
    }
  }
};

export const checkValidPassword = (value) => {
  const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
  if (value) {
    if (!regex.test(value)) {
      return false;
    } else {
      return true;
    }
  }
};

export const setSessionKeyValue = (key, value) => {
  sessionStorage.setItem(key, value);
};
export const getSessionValue = (key) => {
  return sessionStorage.getItem(key) || "";
};

export const checkAuthentication = () => {
  if (getSessionValue("auth-token") && getSessionValue("auth-token") != undefined) {
    return true;
  }
  return false;
};

export const logoutSession = (navigate) => {
  removeAuthetication(navigate);
  setSessionKeyValue("userDetails", null);
};

export const logoutSessionForPasswordChange = (navigate) => {
  removeAutheticationUpdated(navigate);
  setSessionKeyValue("userDetails", null);
};

export const getUserId = () => {
  const userInfo = getSessionValue("userInfo");
  return JSON.parse(userInfo)?.sachUserId;
};

export const getUserIdUpdated = () => {
  const userInfo = getSessionValue("userDetails");
  return JSON.parse(userInfo)?.user?.sachUserId;
};

export const removeAuthetication = (navigate) => {
  sessionStorage.removeItem("auth-token");
  navigate("/");
};

export const removeAutheticationUpdated = (navigate) => {
  sessionStorage.removeItem("auth-token");
  navigate("/login");
};

export const goToLoginPage = (pathname, navigate) => {
  if (pathname === "/login") {
    navigate(0);
  } else {
    navigate("/login");
  }
};

export const startTimer = (timeleft, callbackFun) => {
  let downloadTimer = setInterval(function () {
    if (timeleft < 0) {
      clearInterval(downloadTimer);
      callbackFun();
    } else {
      if (document.getElementById("timer-value") != undefined) {
        document.getElementById("timer-value").innerHTML = timeleft;
      }
    }
    timeleft -= 1;
  }, 1000);
  return downloadTimer;
};

export const getCommonApiHeader = () => {
  return {
    Authorization: `Bearer ${getSessionValue("auth-token")}`,
  };
};

export const getCurrentUserDetails = () => {
  return getSessionValue("userDetails") ? JSON.parse(getSessionValue("userDetails")) : {};
};

export const csvToArray = (str, delimiter = ",") => {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\r\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\r\n") + 2).split("\r\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
};

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const appendQueryParamToUrl = (uri, obj = {}) => {
  Object.keys(obj).map((key) => {
    let value = obj[key];
    let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    let separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
      uri = uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      uri = uri + separator + key + "=" + value;
    }
    return uri;
  });
  return uri;
};

export const parseHtml = (data) => {
  if (!data) return "";
  return parse(data);
};

export const countdownTimeStart = (toDate) => {
  let countDownDate = new Date(toDate).getTime();
  // Update the count down every 1 second
  let x = setInterval(() => {
    // Get todays date and time
    let now = new Date().getTime();

    // Find the distance between now an the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    if (document.getElementById("event-days")) document.getElementById("event-days").innerHTML = days;
    if (document.getElementById("event-hours")) document.getElementById("event-hours").innerHTML = hours;
    if (document.getElementById("event-mins")) document.getElementById("event-mins").innerHTML = minutes;
    if (document.getElementById("event-secs")) document.getElementById("event-secs").innerHTML = seconds;

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("event-days").innerHTML = 0;
      document.getElementById("event-hours").innerHTML = 0;
      document.getElementById("event-mins").innerHTML = 0;
      document.getElementById("event-secs").innerHTML = 0;
    }
  }, 1000);
  return x;
};

export const secondsToTime = (secs) => {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    h: hours,
    m: minutes,
    s: seconds,
  };
  return obj;
};

export const inputNumberOnly = (evt) => {
  if (evt.keyCode !== 8 && evt.keyCode !== 189 && (evt.keyCode <= 47 || evt.keyCode >= 58)) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  }
};
