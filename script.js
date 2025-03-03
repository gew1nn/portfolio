document.addEventListener("DOMContentLoaded", function () {
    console.log("Сайт загружен!");

    /* 🔹 1. ВЫБОР СЛУЧАЙНОЙ ФОТОГРАФИИ */
    const photoArray = [
        "images/1.png",
        "images/2.png",
        "images/3.png",
        "images/4.png",
        "images/5.png"
    ];
    const randomPhoto = photoArray[Math.floor(Math.random() * photoArray.length)];
    document.getElementById("random-photo").src = randomPhoto;

    /* 🔹 2. АНИМАЦИЯ ПОЯВЛЕНИЯ */
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    /* 🔹 3. СМЕНА PNG → GIF НА ИКОНКАХ СОЦСЕТЕЙ */
    document.querySelectorAll(".social-img").forEach(img => {
        const staticSrc = img.src;
        const gifSrc = img.getAttribute("data-gif");

        img.addEventListener("mouseenter", () => img.src = gifSrc);
        img.addEventListener("mouseleave", () => img.src = staticSrc);
    });

    /* 🔹 4. ЭФФЕКТ НАВЕДЕНИЯ НА КАРТОЧКИ */
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("mouseover", () => card.style.transform = "scale(1.05)");
        card.addEventListener("mouseleave", () => card.style.transform = "scale(1)");
    });
});
