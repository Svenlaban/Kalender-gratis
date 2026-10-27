"use strict";

/**
 * Hämtar Sveriges officiella helgdagar för ett år.
 * @param {number} year
 * @returns {Promise<Array>}
 */
async function loadPublicHolidays(year) {
  const response = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/SE`
  );

  if (!response.ok) {
    throw new Error("Helgdagarna kunde inte hämtas.");
  }

  return response.json();
}