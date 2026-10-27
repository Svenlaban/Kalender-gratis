"use strict";

// Hämtar årskalenderns element från HTML
const yearGrid = document.querySelector("#year-grid");
const yearHeading = document.querySelector("#year-heading");
const previousYearButton = document.querySelector("#previous-year");
const nextYearButton = document.querySelector("#next-year");

// Svenska namn på årets månader
const monthNames = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December",
];

const weekdayNames = ["V", "M", "T", "O", "T", "F", "L", "S"];

// Anger vilket år som visas
const today = new Date();
let displayedYear = today.getFullYear();

/**
 * Räknar ut ISO-veckonumret för ett datum.
 * @param {Date} date
 * @returns {number}
 */
function getWeekNumber(date) {
  const targetDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );

  const dayNumber = targetDate.getUTCDay() || 7;

  targetDate.setUTCDate(targetDate.getUTCDate() + 4 - dayNumber);

  const firstDayOfYear = new Date(Date.UTC(targetDate.getUTCFullYear(), 0, 1));

  return Math.ceil(((targetDate - firstDayOfYear) / 86400000 + 1) / 7);
}

/**
 * Skapar en mindre kalender för en månad.
 * @param {number} month
 * @returns {HTMLElement}
 */
function createMonthCalendar(month) {
  const monthSection = document.createElement("section");
  const monthHeading = document.createElement("h2");
  const monthGrid = document.createElement("div");

  monthSection.classList.add("year-month");
  monthGrid.classList.add("year-month-grid");

  // Skapar en länk till månaden i månadskalendern
  const monthLink = document.createElement("a");

  monthLink.textContent = monthNames[month];
  monthLink.href = "index.html?year=" + displayedYear + "&month=" + (month + 1);

  monthHeading.appendChild(monthLink);
  monthSection.appendChild(monthHeading);

  // Skapar rubrikraden med veckodagar
  for (let index = 0; index < weekdayNames.length; index++) {
    const weekday = document.createElement("div");

    weekday.classList.add("year-weekday");
    weekday.textContent = weekdayNames[index];

    if (index === 0) {
      weekday.classList.add("week-label");
    }

    if (index === 6 || index === 7) {
      weekday.classList.add("weekend");
    }

    monthGrid.appendChild(weekday);
  }

  // Räknar ut kalenderns första datum
  const firstDayOfMonth = new Date(displayedYear, month, 1);
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const calendarDate = new Date(displayedYear, month, 1 - startOffset);

  // Varje månad visar alltid sex veckor
  for (let week = 0; week < 6; week++) {
    const weekNumber = document.createElement("div");

    weekNumber.classList.add("year-week-number");
    weekNumber.textContent = getWeekNumber(calendarDate);

    monthGrid.appendChild(weekNumber);

    // Skapar veckans sju datum
    for (let day = 0; day < 7; day++) {
      const dayElement = document.createElement("div");

      dayElement.classList.add("year-day");
      dayElement.textContent = calendarDate.getDate();

      // Markerar datum från angränsande månader
      if (calendarDate.getMonth() !== month) {
        dayElement.classList.add("muted");
      }

      // Markerar lördag och söndag
      if (day === 5 || day === 6) {
        dayElement.classList.add("weekend");
      }

      // Markerar dagens datum
      if (
        calendarDate.getMonth() === month &&
        calendarDate.getFullYear() === today.getFullYear() &&
        calendarDate.getMonth() === today.getMonth() &&
        calendarDate.getDate() === today.getDate()
      ) {
        dayElement.classList.add("today");
      }

      monthGrid.appendChild(dayElement);
      calendarDate.setDate(calendarDate.getDate() + 1);
    }
  }

  monthSection.appendChild(monthGrid);

  return monthSection;
}

/**
 * Skapar årsvyn med årets tolv månader.
 */
function renderYearCalendar() {
  // Tar bort den tidigare årskalendern
  yearGrid.innerHTML = "";

  // Uppdaterar rubriken med året som visas
  yearHeading.textContent = displayedYear;

  // Skapar en kalenderbehållare för varje månad
  for (let month = 0; month < monthNames.length; month++) {
    const monthCalendar = createMonthCalendar(month);
    yearGrid.appendChild(monthCalendar);
  }
}

// Visar föregående år
previousYearButton.addEventListener("click", function () {
  displayedYear--;
  renderYearCalendar();
});

// Visar nästa år
nextYearButton.addEventListener("click", function () {
  displayedYear++;
  renderYearCalendar();
});

// Skapar årskalendern när sidan öppnas
renderYearCalendar();
