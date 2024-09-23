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
    if (lastMonth !== nowMonth) {
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

  // Holiday array
  // Define list of holidays with names, month, day and message (no year, it hanlded synamically)
  // Months are 0-indexed
  const holidays = [
    { name: "easter", month: 3, day: 31, message: "happy easter!", backgUrl: "statics/img/1920x1200Halloween01.jpg" },
    { name: "halloween", month: 9, day: 31, message: "happy halloween!", backgUrl: "statics/img/1920x1080Halloween.jpg" },
    { name: "newYearEve", month: 11, day: 31, message: "happy new year!", backgUrl: "statics/img/1920x1080Halloween.jpg" },
    { name: "christmas", month: 11, day: 25, message: "merry christmas!", backgUrl: "statics/img/1920x1080Halloween.jpg" },
    { name: "new", month: 8, day: 30, message: "happy new!", backgUrl: "statics/img/BlueWave1920x1200.jpg" }, // Sept 30 BlueWave1920x1200.jpg
  ]

  // Get the time difference until a give date
  function getTimeUntil(targetDate) {
    const now = new Date();

    if (now > targetDate) {
      return null; // Target date has passed
    }

    const diff = targetDate - now;

    //  Milliseconds conversion
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days: days, hours: hours, minutes: minutes, seconds: seconds };
  }

  // function to generate the target date for the holiday in current or next year
  function getHolidayDate(month, day) {
    const now = new Date();
    let holidayDate = new Date(now.getFullYear(), month, day);

    // If the holiday has passed this year, target next year
    if (now > holidayDate) {
      holidayDate.setFullYear(now.getFullYear() + 1);
    }


    // Return the date
    return holidayDate;
  }

  // Find the next upcoming holiday
  function getNextHoliday() {
    const now = new Date();
    let closestHoliday = null;

    for (let holiday of holidays) {
      const holidayDate = getHolidayDate(holiday.month, holiday.day);

      // Check if this holiday is upcoming
      if (holidayDate > now) {
        // If no closest holiday found yet or this one is closer
        if (!closestHoliday || holidayDate < closestHoliday.date) {
          closestHoliday = { ...holiday, date: holidayDate };
        }
      }
    }

    return closestHoliday; // Return the closest holiday found
  }

  // Update the countdown container
  function updateCountdown() {
    const greets = document.querySelector("#greetings span");
    const countContainer = document.querySelectorAll("#countdown .text");
    const bodyBg = document.querySelector("body");
    const nextHoliday = getNextHoliday();

    if (!nextHoliday) {
      countContainer.forEach((text) => {
        text.style.display = "none";
      });
      greets.textContent = ""; // Clear greetings if no holiday
      bodyBg.style.backgroundImage = ""; // Clear background
      return;
    }

    const time = getTimeUntil(nextHoliday.date);
    const now = new Date();
    const thirtyDaysFromNow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);

    // First, check if today is the holiday
    if (now.toDateString() === nextHoliday.date.toDateString()) {
      greets.parentElement.style.display = "block";
      // greets.parentElement.style.width = "84%";
      greets.textContent = nextHoliday.message; // Display holiday message
      bodyBg.style.backgroundImage = `url(${nextHoliday.backgUrl})`;
      countContainer.forEach((text) => text.style.display = "none"); // Hide countdown
      return; // Exit since the holiday message is displayed
    }

    // Handle the countdown if the holiday is coming up
    if (nextHoliday.date <= thirtyDaysFromNow && time) {
      greets.parentElement.style.display = "block";
      // greets.parentElement.style.width = "auto";
      greets.textContent = `To ${nextHoliday.name}`; // Display countdown greeting
      bodyBg.style.backgroundImage = `url(${nextHoliday.backgUrl})`;
      checkImageBrightness(nextHoliday.backgUrl); // Check brightness

      countContainer.forEach((text) => {
        text.style.display = "block"; // Show countdown
        const digitContainer = text.querySelector(".digits");
        const alphaContainer = text.querySelector(".alpha");

        // Update countdown digits based on the text ID
        if (text.id === "countDay") {
          digitContainer.textContent = (time.days < 10 ? '0' : '') + time.days;
          alphaContainer.textContent = time.days === 1 ? 'day' : 'days';
        } else if (text.id === "countHour") {
          digitContainer.textContent = (time.hours < 10 ? '0' : '') + time.hours;
          alphaContainer.textContent = time.hours === 1 ? 'hour' : 'hours';
        } else if (text.id === "countMinut") {
          digitContainer.textContent = (time.minutes < 10 ? '0' : '') + time.minutes;
          alphaContainer.textContent = "minutes";
        } else if (text.id === "countSec") {
          digitContainer.textContent = (time.seconds < 10 ? '0' : '') + time.seconds;
          alphaContainer.textContent = "seconds";
        }
      });
    } else {
      // If the holiday has already passed or isn't within 30 days
      countContainer.forEach((text) => text.style.display = "none"); // Hide countdown
      greets.textContent = ""; // Clear greetings
      bodyBg.style.backgroundImage = ""; // Clear background
    }
  }


  // Check the image brightness
  function checkImageBrightness(imgSrc) {
    const imgElement = new Image();
    imgElement.src = imgSrc

    imgElement.onload = function () {
      // Create canvas and get its content
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set the canvas size to match the image size
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;
      ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

      // Get image data (pixels)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let totalBrightness = 0;

      // Loop through pixels and calculate brightness
      for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i]; // Red
        const g = pixels[i + 1]; // Green
        const b = pixels[i + 2]; // Blue

        // Calculate brightness (common formula 0.299*R + 0.587*G + 0.144*B)
        const brightness = 0.299 * r + 0.587 * g + 0.144 * b;
        totalBrightness += brightness;
      }

      // Average brightness
      const avgBrightness = totalBrightness / (pixels.length / 4);

      // Check if the image is light or dark 
      if (avgBrightness > 128) {
        // if light
        document.body.classList.add("light-bg");
      } else {
        document.body.classList.remove("light-bg");

      }
    }

    imgElement.onerror = function () {
      console.error("Failed to load the image");

    }
  }

  dateHandler();
  timeHandler();
  updateCountdown();

  setInterval(() => {
    timeHandler();
    dateHandler();
    updateCountdown();
  }, 1000);
});
