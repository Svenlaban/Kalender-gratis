"use strict";

// Hämtar kalenderns element från HTML
const calendar = document.querySelector("#calendar");
const yearLink = document.querySelector("#year-link");
const previousMonthButton = document.querySelector("#previous-month");
const nextMonthButton = document.querySelector("#next-month");

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

const weekdayNames = [
  { short: "V", full: "Vecka" },
  { short: "Mån", full: "Måndag" },
  { short: "Tis", full: "Tisdag" },
  { short: "Ons", full: "Onsdag" },
  { short: "Tor", full: "Torsdag" },
  { short: "Fre", full: "Fredag" },
  { short: "Lör", full: "Lördag" },
  { short: "Sön", full: "Söndag" },
];

// Anger dagens datum
const today = new Date();

// Läser eventuellt år och månad från webbadressen
const urlParameters = new URLSearchParams(window.location.search);
const requestedYear = Number(urlParameters.get("year"));
const requestedMonth = Number(urlParameters.get("month"));

// Visar dagens år och månad som standard
let displayedYear = today.getFullYear();
let displayedMonth = today.getMonth();

// Använder året och månaden från länken om värdena är giltiga
if (
  Number.isInteger(requestedYear) &&
  Number.isInteger(requestedMonth) &&
  requestedYear > 0 &&
  requestedMonth >= 1 &&
  requestedMonth <= 12
) {
  displayedYear = requestedYear;
  displayedMonth = requestedMonth - 1;
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
 * Skapar kalenderns rubrik, veckodagar och datum.
 */
function renderCalendar() {
  // Tar bort den tidigare kalendern
  calendar.innerHTML = "";

  // Uppdaterar rubriken och länken till rätt årskalender
  yearLink.textContent = monthNames[displayedMonth] + " " + displayedYear;
  yearLink.href = "arskalender.html?year=" + displayedYear;

  // Skapar rubrikraden med veckodagar
  for (let index = 0; index < weekdayNames.length; index++) {
    const weekday = document.createElement("div");
    weekday.classList.add("weekday");

    const shortName = document.createElement("span");
    shortName.classList.add("weekday-short");
    shortName.textContent = weekdayNames[index].short;

    const fullName = document.createElement("span");
    fullName.classList.add("weekday-full");
    fullName.textContent = weekdayNames[index].full;

    weekday.appendChild(shortName);
    weekday.appendChild(fullName);

    // Den första kolumnen används för veckonummer
    if (index === 0) {
      weekday.classList.add("week-label");
    }

    // Lördag och söndag får en annan bakgrundsfärg
    if (index === 6 || index === 7) {
      weekday.classList.add("weekend");
    }

    calendar.appendChild(weekday);
  }

  // Hämtar månadens första och sista datum
  const firstDayOfMonth = new Date(displayedYear, displayedMonth, 1);

  // Räknar ut hur många dagar kalendern ska backa till måndagen
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;

  // Första datumet som ska visas i kalendern
  const calendarDate = new Date(displayedYear, displayedMonth, 1 - startOffset);

  // Kalendern visar alltid sex veckor för att behålla samma höjd
  const numberOfWeeks = 6;

  // Skapar en rad i taget
  for (let week = 0; week < numberOfWeeks; week++) {
    const weekNumber = document.createElement("div");

    weekNumber.classList.add("week-number");
    weekNumber.textContent = getWeekNumber(calendarDate);

    calendar.appendChild(weekNumber);

    // Skapar veckans sju datumrutor
    for (let day = 0; day < 7; day++) {
      const dayElement = document.createElement("div");

      dayElement.classList.add("calendar-day");
      dayElement.textContent = calendarDate.getDate();

      // Markerar datum från föregående eller nästa månad
      if (calendarDate.getMonth() !== displayedMonth) {
        dayElement.classList.add("muted");
      }

      // Ger lördag och söndag en annan bakgrundsfärg
      if (day === 5 || day === 6) {
        dayElement.classList.add("weekend");
      }

      // Markerar dagens datum
      if (
        calendarDate.getFullYear() === today.getFullYear() &&
        calendarDate.getMonth() === today.getMonth() &&
        calendarDate.getDate() === today.getDate()
      ) {
        dayElement.classList.add("today");
      }

      calendar.appendChild(dayElement);

      // Går vidare till nästa datum
      calendarDate.setDate(calendarDate.getDate() + 1);
    }
  }
}

// Visar föregående månad
previousMonthButton.addEventListener("click", function () {
  displayedMonth--;

  // Byter till december föregående år
  if (displayedMonth < 0) {
    displayedMonth = 11;
    displayedYear--;
  }

  renderCalendar();
});

// Visar nästa månad
nextMonthButton.addEventListener("click", function () {
  displayedMonth++;

  // Byter till januari nästa år
  if (displayedMonth > 11) {
    displayedMonth = 0;
    displayedYear++;
  }

  renderCalendar();
});

// Skapar kalendern när sidan öppnas
renderCalendar();
