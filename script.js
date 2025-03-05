document.addEventListener("DOMContentLoaded", function () {
    console.log("Сайт загружен!");

    document.body.setAttribute("tabindex", "-1"); // Делаем body фокусируемым
    document.body.focus(); // Принудительно даём фокус
    console.log("Элемент с фокусом при загрузке:", document.activeElement);

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

    /* 🔹 2. АНИМАЦИЯ ПОЯВЛЕНИЯ СЕКЦИЙ */
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver((entries, observer) => {
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

    /* 🔹 4. ОТКРЫТИЕ МОДАЛЬНОГО ОКНА */
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalDescription = document.getElementById("modal-description");
    const closeModal = document.querySelector(".close");

    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            modalTitle.innerText = card.getAttribute("data-title");
            modalImage.src = card.getAttribute("data-image");
            modalDescription.innerText = card.getAttribute("data-description");

            modal.classList.add("show");
            modal.style.display = "flex";

            // Убираем прокрутку страницы при открытии модального окна
            document.body.style.overflow = "hidden";
        });
    });

    /* 🔹 5. ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА + ВОЗВРАТ ФОКУСА */
    function closeModalWindow() {
        modal.classList.remove("show");

        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = ""; // Восстанавливаем прокрутку страницы
        }, 300);
    }

    closeModal.addEventListener("click", closeModalWindow);

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModalWindow();
        }
    });

    /* 🔹 6. ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА ПО ESC */
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.style.display === "flex") {
            closeModalWindow();
        }
    });
});
