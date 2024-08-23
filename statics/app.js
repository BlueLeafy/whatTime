document.addEventListener("DOMContentLoaded", () => {
    const dateParagraph = document.getElementById("date");

    const hourTensBox = document.getElementById("hour-tens");
    const hourUnitsBox = document.getElementById("hour-units");
    const minuteTensBox = document.getElementById("minute-tens");
    const minuteUnitsBox = document.getElementById("minute-units");
    const secondTensBox = document.getElementById("second-tens");
    const secondUnitsBox = document.getElementById("second-units");



    function updateTimeBoxes(hourTens, hourUnits, minuteTens, minuteUnits, secondTens, secondUnits) {
        hourTensBox.innerText = hourTens;
        hourUnitsBox.innerText = hourUnits;
        minuteTensBox.innerText = minuteTens;
        minuteUnitsBox.innerText = minuteUnits;
        secondTensBox.innerText = secondTens;
        secondUnitsBox.innerText = secondUnits;
    }

    function dateTimeHandler() {
        const nowDate = new Date(); // Today

        // Format date
        const date = nowDate.getDate(); // Date number
        const dayIndex = nowDate.getDay(); // Day index

        // Array day names
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const dayName = daysOfWeek[dayIndex]; // Day name from index
        const monthIndex = nowDate.getMonth(); // Month index

        // MonthNames array
        const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const monthName = monthsOfYear[monthIndex]; // Month name from index
        const year = nowDate.getFullYear(); // Year

        // Update text paragraphs
        const dateText = `${dayName}, ${monthName} ${date}, ${year}`;
        dateParagraph.innerText = dateText;

        // Format time
        const hour = String(nowDate.getHours()).padStart(2, '0'); // Hour
        const minutes = String(nowDate.getMinutes()).padStart(2, '0'); // Minutes
        const seconds = String(nowDate.getSeconds()).padStart(2, '0'); // Seconds

        // Split into digits
        const hourTens = hour[0];
        const hourUnits = hour[1];
        const minuteTens = minutes[0];
        const minuteUnits = minutes[1];
        const secondTens = seconds[0];
        const secondUnits = seconds[1];

        // Update time boxes
        updateTimeBoxes(hourTens, hourUnits, minuteTens, minuteUnits, secondTens, secondUnits);
    }

    // Function call
    dateTimeHandler();

    // Run function every second
    setInterval(dateTimeHandler, 1000);

});