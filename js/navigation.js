"use strict";

// Hämtar menyknappen och navigationen från DOM
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#main-navigation");

// Öppnar eller stänger mobilmenyn
menuButton.addEventListener("click", function () {
  const isOpen = navigation.classList.toggle("open");

  // Informerar hjälpmedel om menyn är öppen eller stängd
  menuButton.setAttribute("aria-expanded", isOpen);

  // Anpassar knappens beskrivning efter menyns tillståd
  if (isOpen) {
    menuButton.setAttribute("aria-label", "Stäng meny");
  } else {
    menuButton.setAttribute("aria-label", "Öppna meny");
  }
});
