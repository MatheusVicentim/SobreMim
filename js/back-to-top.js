// Script para controlar o header ao rolar a página
window.addEventListener("scroll", function () {
  const header = document.getElementsByTagName("header")[0];
  const backToTop = document.getElementById("back-to-top");

  // Adiciona classe quando a página é rolada
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
    backToTop.classList.add("show");
  } else {
    header.classList.remove("scrolled");
    backToTop.classList.remove("show");
  }
});

// Rolagem suave para os links âncora
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");

    if (targetId === "#") {
      // Para o botão de voltar ao topo
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Para links de navegação
      const targetElement = document.querySelector(targetId);
      const headerHeight =
        document.getElementsByTagName("header")[0].offsetHeight;

      if (targetElement) {
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  });
});

class ThemeManager {
  constructor() {
    this.body = document.body;
    this.currentTheme = this.body.getAttribute("data-theme");

    this.themeToggle = document.getElementById("themeToggle");
    this.themeIcon = document.getElementById("themeIcon");

    this.themeToggle.addEventListener("click", () => this.toggleTheme());
  }

  toggleTheme() {
    const currentTheme = this.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    this.applyTheme(newTheme);

    this.themeToggle.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.themeToggle.style.transform = "scale(1)";
    }, 150);
  }

  applyTheme(theme) {
    if (theme === "dark") {
      this.body.setAttribute("data-theme", "dark");
      this.themeIcon.src = "images/tema-dark.png";
    } else {
      this.body.setAttribute("data-theme", "light");
      this.themeIcon.src = "images/tema-light.png";
    }
  }

  watchSystemTheme() {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.applyTheme(mediaQuery.matches ? "dark" : "light");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const themeManager = new ThemeManager();
  themeManager.watchSystemTheme();
});
