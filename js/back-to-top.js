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
