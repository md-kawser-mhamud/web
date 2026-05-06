(function () {
  var config = window.DESI_VIRAL_VIDEO_CONFIG || {};
  var mainSite = config.mainSite || "https://pompomhub.com";
  var images = config.images || {};
  var year = document.getElementById("year");
  var themeToggle = document.querySelector("[data-theme-toggle]");
  var themeLabel = document.querySelector("[data-theme-label]");
  var themeColor = document.getElementById("theme-color");

  function normalizeUrl(url) {
    if (!url || typeof url !== "string") {
      return "";
    }

    return url.trim();
  }

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
      themeColor.setAttribute("content", theme === "dark" ? "#14110f" : "#f7f3ed");
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

  Array.prototype.forEach.call(document.querySelectorAll("[data-main-link]"), function (link) {
    link.href = mainSite;
  });

  Array.prototype.forEach.call(document.querySelectorAll("img[data-image-key]"), function (image) {
    var key = image.getAttribute("data-image-key");
    var fallback = image.getAttribute("data-fallback-src") || image.getAttribute("src");
    var configuredUrl = normalizeUrl(images[key]);

    image.addEventListener("error", function () {
      if (image.getAttribute("src") !== fallback) {
        image.setAttribute("src", fallback);
      }
      image.classList.add("image-fallback");
    });

    if (configuredUrl) {
      image.setAttribute("src", configuredUrl);
    }
  });

  setTheme(getCurrentTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTheme(getCurrentTheme() === "dark" ? "light" : "dark");
    });
  }
})();
