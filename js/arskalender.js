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

const today = new Date();

// Läser eventuellt år från webbadressen
const urlParameters = new URLSearchParams(window.location.search);
const requestedYear = Number(urlParameters.get("year"));

// Visar aktuellt år som standard
let displayedYear = today.getFullYear();

// Innehåller årets hämtade kalenderdata
let calendarData = [];

// Använder året från länken om värdet är giltigt
if (Number.isInteger(requestedYear) && requestedYear > 0) {
  displayedYear = requestedYear;
}

/**
 * Omvandlar ett datum till formatet ÅÅÅÅ-MM-DD.
 * @param {Date} date
 * @returns {string}
 */
function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

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

      // Hämtar kalenderinformationen för det aktuella datumet
      const dateKey = formatDateKey(calendarDate);

      const calendarDayData = calendarData.find(function (item) {
        return item.datum === dateKey;
      });

      if (calendarDayData && calendarDate.getMonth() === month) {
        const descriptions = [];

        // Kontrollerar om dagen är en högtidsafton
        const isHolidayEve =
          calendarDayData.helgdagsafton ||
          (calendarDayData["arbetsfri dag"] === "Ja" &&
            calendarDayData["röd dag"] === "Nej" &&
            calendarDayData.helgdag);

        if (isHolidayEve) {
          const holidayName =
            calendarDayData.helgdagsafton || calendarDayData.helgdag;

          dayElement.classList.add("holiday-eve");
          descriptions.push(holidayName);
        } else if (calendarDayData["röd dag"] === "Ja") {
          dayElement.classList.add("public-holiday");

          if (calendarDayData.helgdag) {
            descriptions.push(calendarDayData.helgdag);
          }
        }

        // Lägger till namnsdagar i datumrutans beskrivning
        if (calendarDayData.namnsdag.length > 0) {
          const names = calendarDayData.namnsdag.join(", ");
          descriptions.push("Namnsdag: " + names);
        }

        const readableDate = calendarDate.toLocaleDateString("sv-SE", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });

        let accessibleDescription = readableDate;

        if (descriptions.length > 0) {
          dayElement.title = descriptions.join(" – ");
          accessibleDescription += ". " + descriptions.join(". ");
        }

        dayElement.setAttribute("aria-label", accessibleDescription);
      }

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

/**
 * Hämtar kalenderdata och uppdaterar årskalendern.
 */
async function updateYearCalendar() {
  try {
    calendarData = await loadCalendarData(displayedYear);
  } catch (error) {
    console.error(error);
    calendarData = [];
  }

  renderYearCalendar();
}

// Visar föregående år
previousYearButton.addEventListener("click", function () {
  displayedYear--;
  updateYearCalendar();
});

// Visar nästa år
nextYearButton.addEventListener("click", function () {
  displayedYear++;
  updateYearCalendar();
});

// Skapar årskalendern när sidan öppnas
updateYearCalendar();
