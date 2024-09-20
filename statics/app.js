document.addEventListener("DOMContentLoaded", () => {
  // Time container
  const hourContainer = document.getElementById("hourContainer");
  const minuteContainer = document.getElementById("minuteContainer");
  const secondContainer = document.getElementById("secondContainer");

  // Last date
  let last = new Date(0);
  last.setUTCHours(-1);

  function timeHandler() {
    var now = new Date();

    // Hour
    var lastHour = last.getHours().toString().padStart(2, '0');
    var nowHour = now.getHours().toString().padStart(2, '0');
    if (lastHour !== nowHour) {
      updateContainer(hourContainer, nowHour);
    }

    // Minute
    var lastMinute = last.getMinutes().toString().padStart(2, '0');
    var nowMinute = now.getMinutes().toString().padStart(2, '0');
    if (lastMinute !== nowMinute) {
      updateContainer(minuteContainer, nowMinute);
    }

    // Second
    var lastSecond = last.getSeconds().toString().padStart(2, '0');
    var nowSecond = now.getSeconds().toString().padStart(2, '0');
    if (lastSecond !== nowSecond) {
      updateContainer(secondContainer, nowSecond);
    }

    last = now;
  }

  // Date containers
  const dateContainer = document.getElementById("date");
  const dayContainer = document.getElementById("day");
  const monthContainer = document.getElementById("month");
  const yearContainer = document.getElementById("year");

  // Arrays
  const daysName = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const monthsName = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];


  // Date handler
  function dateHandler() {
    var now = new Date();

    // Date
    var lastDate = last.getDate().toString().padStart(2, '0');
    var nowDate = now.getDate().toString().padStart(2, '0');
    if (lastDate !== nowDate) {
      dateContainer.querySelector("span").textContent = nowDate;
    }

    // Day
    var lastDay = last.getDay();
    var nowDay = now.getDay();
    if (lastDay !== nowDay) {
      dayContainer.querySelector("span").textContent = daysName[nowDay];
    }

    // Month
    var lastMonth = last.getMonth();
    var nowMonth = now.getMonth();
    if(lastMonth !== nowMonth) {
      monthContainer.querySelector("span").textContent = monthsName[nowMonth];
    }

    // Year
    var lastYear = last.getFullYear();
    var nowYear = now.getFullYear();
    if (lastYear !== nowYear) {
      yearContainer.querySelector("span").textContent = nowYear;
    }

  }

  function updateContainer(container, newTime) {
    // Time
    var [tens, units] = newTime.split('');

    var tensElement = container.querySelector(".tens .number");
    if (tensElement.textContent !== tens) {
      updateNumber(tensElement, tens);
    }

    var unitsElement = container.querySelector(".units .number");  // Fixed typo
    if (unitsElement.textContent !== units) {
      updateNumber(unitsElement, units);
    }
  }

  function updateNumber(element, newNumber) {
    // Update span .numer
    element.textContent = newNumber;

    // update data-mirror attr
    element.setAttribute('data-mirror', newNumber);
  }

  dateHandler();
  timeHandler();

  setInterval(() => {
    timeHandler();
    dateHandler();
   }, 1000);
});
