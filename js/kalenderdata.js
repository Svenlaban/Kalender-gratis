"use strict";

// Sparar redan hämtad kalenderdata med året som nyckel
const calendarDataCache = new Map();

/**
 * Hämtar svensk kalenderdata för ett år.
 * @param {number} year
 * @returns {Promise<Array>}
 */
async function loadCalendarData(year) {
  // Använder sparad data om året redan har hämtats
  if (calendarDataCache.has(year)) {
    return calendarDataCache.get(year);
  }

  const response = await fetch(
    `https://sholiday.faboul.se/dagar/v2.1/${year}`,
  );

  if (!response.ok) {
    throw new Error("Kalenderinformationen kunde inte hämtas.");
  }

  const data = await response.json();

  // Sparar årets data så att den kan återanvändas
  calendarDataCache.set(year, data.dagar);

  return data.dagar;
}