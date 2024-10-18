let params;
let rootElement;

document.addEventListener("DOMContentLoaded", function () {
  params = getUrlParams();
  rootElement = document.getElementById("dDayCounter");

  initializeDdayCounterApp();
});

const getUrlParams = () => {
  const { search } = window.location;
  const urlParams = new URLSearchParams(search);
  return urlParams;
};

const initializeDdayCounterApp = () => {
  setAppStyles();
  setContent();
  setDate();
};

const setAppStyles = () => {
  rootElement.style.backgroundColor = `#${params.get("background")}` ?? "";
  rootElement.style.color = `#${params.get("text")}` ?? "";
};

const setContent = () => {
  const content = params.get("content");
  rootElement.querySelector(".content").textContent = content ?? "";
};

const setDate = () => {
  function getDaysDifference(targetDate, currentDate) {
    let startDate = new Date(targetDate);
    let endDate = new Date(currentDate);

    let timeDiff = endDate.getTime() - startDate.getTime();
    let daysDiff = timeDiff / (1000 * 60 * 60 * 24);

    return daysDiff;
  }

  const date = params.get("date");

  const year = parseInt(date.slice(0, 4), 10);
  const month = parseInt(date.slice(4, 6), 10) - 1;
  const day = parseInt(date.slice(6), 10);

  let currentDate = new Date();
  let targetDate = new Date(year, month, day);

  const diff = getDaysDifference(
    targetDate.toLocaleDateString(),
    currentDate.toLocaleDateString()
  );

  const formattedDate = targetDate.toISOString().split("T")[0];
  rootElement.querySelector(".date").textContent = formattedDate ?? "";

  const prefix = diff > 0 ? "D+" : "D";
  rootElement.querySelector(".counter").textContent = prefix + diff;
};
