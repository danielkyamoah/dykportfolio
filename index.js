const hamburgerBtn = document.querySelector(".hamburger-menu");
const navList = document.querySelector(".nav-links");
const year = document.getElementById("year");
const themeButtons = document.querySelectorAll(".theme-btn");
const THEME_KEY = "portfolio-theme";

if (year) {
  year.textContent = new Date().getFullYear();
}

if (hamburgerBtn && navList) {
  hamburgerBtn.addEventListener("click", () => {
    navList.classList.toggle("active");
  });
}

function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(themeChoice) {
  const theme = themeChoice === "system" ? getSystemTheme() : themeChoice;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, themeChoice);

  themeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.theme === themeChoice);
  });
}

const savedTheme = localStorage.getItem(THEME_KEY) || "system";
applyTheme(savedTheme);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  const currentPreference = localStorage.getItem(THEME_KEY) || "system";
  if (currentPreference === "system") {
    applyTheme("system");
  }
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTheme(button.dataset.theme);
  });
});