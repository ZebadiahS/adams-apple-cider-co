// calling cider cards from data.js
import { ciderData } from "./data.js";

// getting navigation bar items
const menuBtn = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

// getting cider card accordions
const acc = document.getElementsByClassName("accordion");
let i;

// getting search and reset buttons for cider finder
const searchBtn = document.querySelector(".search");
const resetBtn = document.querySelector(".reset");

// nav button event listener
menuBtn.addEventListener("click", navOpenClose);

// toggle for accordion 
for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", toggleAccordion);
};

// hide navigation bar when the screen is resized
window.addEventListener("resize", collapseNavbar);

// getting all elements needed for the cider finder
const ciderFinder = document.getElementById("cider-finder");
const ciderSearch = document.getElementById("finder-section");
const container = document.createElement("section");
container.setAttribute("class", "finder-container");
const ciderGrid = document.createElement("div");
ciderGrid.setAttribute("class", "cider-card-grid");
const flavorProfile = document.getElementById("flavor-profile");
const carbonationLevel = document.getElementById("carbonation");
const sweetnessLevel = document.getElementById("sweetness");
const search = document.getElementById("search");
const reset = document.getElementById("reset");
reset.addEventListener("click", resetSelects);
// creating a results below message
const resultsMsgContainer = createElement("div", {class: "text-container"}, "");
const resultsMsg = createElement("p", {}, "Find your results below!");


// adding event listeners to update flavor profile options dynamically
flavorProfile.addEventListener("change", updateAllSelectOptions)
carbonationLevel.addEventListener("change", updateAllSelectOptions);
sweetnessLevel.addEventListener("change", updateAllSelectOptions);
search.addEventListener("click", createCards);

// writing of filters was assisted by copilot
function updateAllSelectOptions() {
  const selectedFlavor = flavorProfile.value;
  const selectedCarbonation = carbonationLevel.value;
  const selectedSweetness = sweetnessLevel.value;

  // reset all options to enabled for cider finder selects
  resetSelectOptions(flavorProfile);
  resetSelectOptions(carbonationLevel);
  resetSelectOptions(sweetnessLevel);

  // filter valid options for each select
  const validFlavors = new Set();
  const validCarbonation = new Set();
  const validSweetness = new Set();

  ciderData.categories.forEach(category => {
    const matchesFlavor = selectedFlavor === "default" || category.category === selectedFlavor;

    category.items.forEach(cider => {
      const matchesCarbonation = selectedCarbonation === "default" || cider.carbonation === selectedCarbonation;
      const matchesSweetness = selectedSweetness === "default" || cider.sweetness === selectedSweetness;

      // adding valid options for other selects
      if (matchesFlavor && matchesCarbonation && matchesSweetness) {
        validFlavors.add(category.category);
        validCarbonation.add(cider.carbonation);
        validSweetness.add(cider.sweetness);
      }
    });
  });

  // always disable invalid options for each select
  disableInvalidOptions(flavorProfile, validFlavors);
  disableInvalidOptions(carbonationLevel, validCarbonation);
  disableInvalidOptions(sweetnessLevel, validSweetness);
}

// function for reseting all options in a select to enabled
function resetSelectOptions(selectElement) {
  Array.from(selectElement.options).forEach(option => {
    option.disabled = false;
  });
}

// function to disable invalid options in a select
function disableInvalidOptions(selectElement, validOptions) {
  Array.from(selectElement.options).forEach(option => {
    if (option.value !== "default" && !validOptions.has(option.value)) {
      option.disabled = true;
    }
  });
}

// function for opening the navbar
// and changing the aria-expanded attribute 
// assisted by Copilot
function navOpenClose() {
  const isOpened = menuBtn.getAttribute("aria-expanded");
  if (isOpened === "false") {
    menuBtn.setAttribute("aria-expanded", 'true');
  }
  else {
    menuBtn.setAttribute("aria-expanded", 'false');
  }
  navbar.classList.toggle("expanded");
};


// function for collapsing the navbar when the screen is resized
// Created with assistance from Copilot.
function collapseNavbar() {
  let screenWidth = window.innerWidth;
  if (screenWidth <= 1060) {
    navbar.classList.remove("expanded");
    menuBtn.setAttribute("aria-expanded", 'false');
  }
};


// function for toggling the accordion for cider cards
// and changing the aria-hidden attribute/
// assisted by Copilot
function toggleAccordion() {
  this.classList.toggle("active");

  const panel = this.nextElementSibling;
  panel.classList.toggle("open");

  if (panel.classList.contains("open")) {
    panel.setAttribute("aria-hidden", 'false');
  } else {
    panel.setAttribute("aria-hidden", 'true');
  }
};

// function to reset all selects to default
function resetSelects() {
  // reset all selects to their default values
  flavorProfile.value = "default";
  sweetnessLevel.value = "default";
  carbonationLevel.value = "default";

  resetSelectOptions(flavorProfile);
  resetSelectOptions(carbonationLevel);
  resetSelectOptions(sweetnessLevel);

  // clear all content from the container
  ciderGrid.innerHTML = "";
  container.innerHTML = "";
  resultsMsgContainer.innerHTML = "";

  // remove the container from the DOM if it exists
  if (ciderFinder.contains(container)) {
    ciderFinder.removeChild(container);
    ciderSearch.removeChild(resultsMsgContainer);
  }
}

// function to create cider cards based on selected filters
// Code initially written by me with occasional input from Copilot.
// The code was cleaned up and reformatted with the assistance of Deepseek.
function createCards() {
  // Clear previous content
  ciderGrid.innerHTML = "";
  container.innerHTML = "";
  resultsMsgContainer.innerHTML = "";

  if (ciderFinder.contains(container)) {
    ciderFinder.removeChild(container);
    ciderSearch.removeChild(resultsMsgContainer);
  };

  const selectedFlavor = flavorProfile.value;
  const selectedCarbonation = carbonationLevel.value;
  const selectedSweetness = sweetnessLevel.value;

  // rebuild the container and grid
  ciderSearch.appendChild(resultsMsgContainer);
  resultsMsgContainer.appendChild(resultsMsg);
  ciderFinder.appendChild(container);
  container.appendChild(ciderGrid);

  // card counter
  let cardsCreated = 0;

  // filter and render matching ciders
  ciderData.categories.forEach(category => {
    const matchesFlavor = selectedFlavor === "default" || category.category === selectedFlavor;

    if (!matchesFlavor) return;

    category.items.forEach(cider => {
      const matchesCarbonation = selectedCarbonation === "default" || cider.carbonation === selectedCarbonation;
      const matchesSweetness = selectedSweetness === "default" || cider.sweetness === selectedSweetness;

      if (!matchesCarbonation || !matchesSweetness) return;

      const ciderCard = createCiderCard(cider);
      ciderGrid.appendChild(ciderCard);
      cardsCreated++;
    });
  });

  if (cardsCreated === 0) {
      noResults();
  };
};



// function to display no results message
function noResults() {

  container.innerHTML = "";
  
  const sorryMessage = document.createElement("h2");
  sorryMessage.textContent = "Sorry!";
  const noResultsMessage = document.createElement("p");
  noResultsMessage.textContent = "No results found. Please try different filters.";
  
  container.appendChild(sorryMessage);
  container.appendChild(noResultsMessage);
};

// function to create a single cider card
function createCiderCard(cider) {
  const ciderCard = document.createElement("div");
  ciderCard.className = "cider-card";

  // adding image to card creation
  const ciderImage = createElement("img", {
    src: cider.image,
    alt: cider.name
  });

  // creating card elements
  const ciderName = createElement("h3", {}, cider.name);
  const ciderAbv = createElement("p", {}, cider.abv);

  const cardText = createElement("div", { class: "card-text" });
  const accordionBtn = createElement("button", { class: "accordion" }, "About");
  const panel = createElement("div", {
    class: "panel",
    "aria-hidden": "true"
  });

  const ciderDescription = createElement("p", {}, cider.description);

  accordionBtn.addEventListener("click", () => {
    accordionBtn.classList.toggle("active");
    panel.classList.toggle("open");
    panel.setAttribute("aria-hidden", panel.classList.contains("open") ? "false" : "true");
  });

  // appending card elements
  panel.appendChild(ciderDescription);
  cardText.appendChild(accordionBtn);
  cardText.appendChild(panel);

  ciderCard.appendChild(ciderImage);
  ciderCard.appendChild(ciderName);
  ciderCard.appendChild(ciderAbv);
  ciderCard.appendChild(cardText);

  return ciderCard;
};

// function for element creation
function createElement(tag, attributes = {}, textContent = "") {
  const el = document.createElement(tag);
  Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
  if (textContent) el.textContent = textContent;
  return el;
};