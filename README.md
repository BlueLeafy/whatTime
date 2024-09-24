# Countdown and Time Display

This project is a simple web-based countdown timer and real-time clock that displays the current date, time, and the time remaining until the next holiday. It features dynamic updates for seconds, minutes, hours, and allows for custom holiday messages and backgrounds.

## Features

- Displays current time in hours, minutes, and seconds.
- Shows the current date, including day and month names.
- Countdown to the next holiday with a customizable message and background image.
- Automatically updates every second.
- Calculates and displays the time remaining until the next holiday.

## Requirements

- A modern web browser that supports JavaScript (e.g., Chrome, Firefox, Safari).

## Installation

To use this project, follow these steps:

1. Clone the repository or download the source code.
2. Open the `index.html` file in your preferred web browser.

## Usage
## Adding holidays
To customize holidays, modify the holidays array in the JavaScript file.
Each holiday should include
. name: Name of the holiday
. month: Month (0-indexed, January is 0)
. day: Day of the month
. message: Greeting message for the holiday
. backgUrl: Background image URL for the holiday

## Example
const holidays= [{ name: "easter", month: 3, day: 31, message: "happy easter!", backgUrl: "static/img/easter1920x1200.jpg"},];

## How it works
1. The script initializes the last date and time using new Date(0) and sets it to one hour before the current time.
2. It continuously updates the time and date every second using setInterval().
3. The dateHandler and timeHandler functions manage the display of current time and date.
4. The countdown to the next holiday is calculated and displayed, with the ability to show a holiday message and background image.
5. The script also checks the brightness of the background image to adjust the body class accordingly.

##  Licence
This project is open source and available under the MIT License.

## Acknowledgments
. Inspired by various web countdown timers and real-time clock implementations.
. Uses vanilla JavaScript for functionality and DOM manipulation.

Author
[BlueLeafy]
