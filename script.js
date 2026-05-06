(function () {
  var year = document.getElementById("year");
  var themeToggle = document.querySelector("[data-theme-toggle]");
  var themeLabel = document.querySelector("[data-theme-label]");
  var themeColor = document.getElementById("theme-color");

  function setTheme(nextTheme) {
    var theme = nextTheme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;

    if (themeToggle && themeLabel) {
      var isDark = theme === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      themeLabel.textContent = isDark ? "Light" : "Dark";
    }

    if (themeColor) {
      themeColor.setAttribute("content", theme === "dark" ? "#11131a" : "#f6f7fb");
    }

    try {
      localStorage.setItem("desi-theme", theme);
    } catch (error) {
      // Theme persistence is optional.
    }
  }

  function getCurrentTheme() {
    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  }

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  setTheme(getCurrentTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(getCurrentTheme() === "dark" ? "light" : "dark");
    });
  }
})();
