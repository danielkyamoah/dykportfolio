const hamburgerBtn = document.querySelector(".hamburger-menu");
const navList = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links a");
const year = document.getElementById("year");
const themeButtons = document.querySelectorAll(".theme-btn");
const themeToggleBtn = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const THEME_KEY = "portfolio-theme";
const THEME_ORDER = ["light", "dark", "system"];

if (year) {
    year.textContent = new Date().getFullYear();
}

function closeMobileNav() {
    if (navList) {
        navList.classList.remove("active");
    }

    if (hamburgerBtn) {
        hamburgerBtn.classList.remove("is-open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
    }
}

if (hamburgerBtn && navList) {
    hamburgerBtn.addEventListener("click", () => {
        const isOpen = navList.classList.toggle("active");
        hamburgerBtn.classList.toggle("is-open", isOpen);
        hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            closeMobileNav();
        }
    });
});

function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateThemeIcon(themeChoice) {
    if (!themeIcon) {
        return;
    }

    const activeTheme = themeChoice === "system" ? getSystemTheme() : themeChoice;
    themeIcon.textContent = activeTheme === "dark" ? "☀" : "☾";
}

function applyTheme(themeChoice) {
    const theme = themeChoice === "system" ? getSystemTheme() : themeChoice;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, themeChoice);

    themeButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.theme === themeChoice);
    });

    updateThemeIcon(themeChoice);
}

const savedTheme = localStorage.getItem(THEME_KEY) || "system";
applyTheme(savedTheme);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    const currentPreference = localStorage.getItem(THEME_KEY) || "system";
    if (currentPreference === "system") {
        applyTheme("system");
    }
});

themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        applyTheme(button.dataset.theme);

        if (window.innerWidth <= 768) {
            closeMobileNav();
        }
    });
});

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        const currentChoice = localStorage.getItem(THEME_KEY) || "system";
        const currentIndex = THEME_ORDER.indexOf(currentChoice);
        const nextChoice = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];
        applyTheme(nextChoice);
    });
}

