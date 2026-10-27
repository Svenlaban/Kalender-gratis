"use strict";

// Hämtar formuläret och dess fält från HTML
const contactForm = document.querySelector("#contact-form");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");
const formFeedback = document.querySelector("#form-feedback");

/**
 * Visar ett felmeddelande för ett formulärfält.
 * @param {HTMLElement} input
 * @param {HTMLElement} errorElement
 * @param {string} message
 */
function showError(input, errorElement, message) {
  errorElement.textContent = message;
  input.setAttribute("aria-invalid", "true");
}

/**
 * Tar bort ett tidigare felmeddelande.
 * @param {HTMLElement} input
 * @param {HTMLElement} errorElement
 */
function clearError(input, errorElement) {
  errorElement.textContent = "";
  input.removeAttribute("aria-invalid");
}

/**
 * Kontrollerar att e-postadressen har ett rimligt format.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/**
 * Validerar formulärets samtliga fält.
 * @returns {boolean}
 */
function validateForm() {
  let formIsValid = true;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Tar bort tidigare meddelanden
  clearError(nameInput, nameError);
  clearError(emailInput, emailError);
  clearError(messageInput, messageError);
  formFeedback.textContent = "";

  // Validerar namnet
  if (name.length < 2) {
    showError(
      nameInput,
      nameError,
      "Ange ett namn med minst två tecken."
    );

    formIsValid = false;
  }

  // Validerar e-postadressen
  if (email === "") {
    showError(emailInput, emailError, "Ange din e-postadress.");
    formIsValid = false;
  } else if (!isValidEmail(email)) {
    showError(
      emailInput,
      emailError,
      "Ange en giltig e-postadress."
    );

    formIsValid = false;
  }

  // Validerar meddelandet
  if (message.length < 10) {
    showError(
      messageInput,
      messageError,
      "Meddelandet måste innehålla minst tio tecken."
    );

    formIsValid = false;
  }

  return formIsValid;
}

// Validerar formuläret när användaren klickar på Skicka
contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateForm()) {
    formFeedback.textContent =
      "Tack! Ditt meddelande är nu skickat.";

    contactForm.reset();
  }
});