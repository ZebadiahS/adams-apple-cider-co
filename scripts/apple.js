
// navbar
// This code adds an event listener to a button with the class "menu-icon".
// When the button is clicked, it toggles the "expanded" class on an element with the class "navbar".
const menuBtn = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");
var acc = document.getElementsByClassName("accordion");
var i;



menuBtn.addEventListener("click", navOpenClose);

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", toggleAccordion);
};

window.addEventListener("resize", collapseNavbar);



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

function collapseNavbar() {
  let screenWidth = window.innerWidth;
  if (screenWidth <= 1060) {
    navbar.classList.remove("expanded");
    menuBtn.setAttribute("aria-expanded", 'false');
  }
}

function toggleAccordion() {
  this.classList.toggle("active");

  var panel = this.nextElementSibling;
  panel.classList.toggle("open");

  if (panel.classList.contains("open")) {
    panel.setAttribute("aria-hidden", 'false');
  } else {
    panel.setAttribute("aria-hidden", 'true');
  }
}