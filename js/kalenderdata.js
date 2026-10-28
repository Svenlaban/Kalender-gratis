"use strict";

/**
 * Hämtar svenska namnsdagar för ett år.
 * @param {number} year
 * @returns {Promise<Array>}
 */
async function loadCalendarData(year) {
  const response = await fetch(
    `https://sholiday.faboul.se/dagar/v2.1/${year}`
  );

  if (!response.ok) {
    throw new Error("Namnsdagarna kunde inte hämtas.");
  }

  const data = await response.json();

  return data.dagar;
}