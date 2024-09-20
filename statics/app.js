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
    var lastHour = last.getHours().toString();
    var nowHour = now.getHours().toString();
    if (lastHour !== nowHour) {
      updateContainer(hourContainer, nowHour);
    }

    // Minute
    var lastMinute = last.getMinutes().toString();
    var nowMinute = now.getMinutes().toString();
    if (lastMinute !== nowMinute) {
      updateContainer(minuteContainer, nowMinute);
    }

    // Second
    var lastSecond = last.getSeconds().toString();
    var nowSecond = now.getSeconds().toString();
    if (lastSecond !== nowSecond) {
      updateContainer(secondContainer, nowSecond);
    }

    last = now;
  }

  function updateContainer(container, newTime) {
    var time = newTime.split('');

    if (time.length === 1) {
      time.unshift('0');
    }

    var tens = container.querySelector(".tens .number");
    if (tens.textContent !== time[0]) {
      updateNumber(tens, time[0]);
    }

    var units = container.querySelector(".units .number");  // Fixed typo
    if (units.textContent !== time[1]) {
      updateNumber(units, time[1]);
    }
  }

  function updateNumber(element, newNumber) {
    if(!element.textContent !== newNumber) {
      const clone = element.cloneNode(true);  

      element.classList.add("move")

      clone.textContent = newNumber;

      element.parentElement.appendChild(clone);


      setTimeout(() => {
        element.remove();
      }, 1)
    }    
  }

  setInterval(timeHandler, 100);
});
