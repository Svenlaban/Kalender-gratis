"use strict";

// Hämtar kalenderns element från HTML
const calendar = document.querySelector("#calendar");
const monthHeading = document.querySelector("#month-heading");
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

// Anger vilken månad som visas
const today = new Date();
let displayedYear = today.getFullYear();
let displayedMonth = today.getMonth();

/**
 * Skapar kalenderns rubrik och veckodagsrad.
 */
function renderCalendar() {
  // Tar bort den tidigare kalendern
  calendar.innerHTML = "";

  // Uppdaterar rubriken med den månad som visas
  monthHeading.textContent = monthNames[displayedMonth] + " " + displayedYear;

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
