document.addEventListener("DOMContentLoaded", function () {
    console.log("Сайт загружен!");

    // Делаем body фокусируемым для улучшения навигации
    document.body.setAttribute("tabindex", "-1");
    document.body.focus();
    console.log("Элемент с фокусом при загрузке:", document.activeElement);

    /* 1. ВЫБОР СЛУЧАЙНОЙ ФОТОГРАФИИ */
    const photoArray = [
        "images/1.png",
        "images/2.png",
        "images/3.png",
        "images/4.png",
        "images/5.png"
    ];
    const randomPhoto = photoArray[Math.floor(Math.random() * photoArray.length)];
    document.getElementById("random-photo").src = randomPhoto;

    /* 2. АНИМАЦИЯ ПОЯВЛЕНИЯ СЕКЦИЙ */
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

    /* 3. СМЕНА PNG → GIF НА ИКОНКАХ СОЦСЕТЕЙ */
    document.querySelectorAll(".social-img").forEach(img => {
        const staticSrc = img.src;
        const gifSrc = img.getAttribute("data-gif");

        img.addEventListener("mouseenter", () => img.src = gifSrc);
        img.addEventListener("mouseleave", () => img.src = staticSrc);
    });

    /* 4. ОТКРЫТИЕ МОДАЛЬНОГО ОКНА */
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalDescription = document.getElementById("modal-description");
    const closeModalButton = document.querySelector(".close");
    let lastFocusedElement; // сохраняем элемент, имевший фокус перед открытием модального окна

    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            // Сохраняем текущий фокус для последующего восстановления
            lastFocusedElement = document.activeElement;

            modalTitle.innerText = card.getAttribute("data-title");
            modalImage.src = card.getAttribute("data-image");
            modalDescription.innerText = card.getAttribute("data-description");

            modal.classList.add("show");
            modal.style.display = "flex";

            // Отключаем прокрутку страницы при открытом модальном окне
            document.body.style.overflow = "hidden";

            // Устанавливаем фокус на кнопку закрытия для удобства навигации с клавиатуры
            closeModalButton.focus();
        });
    });

    /* 5. Функция закрытия модального окна с восстановлением фокуса */
    function closeModalWindow() {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = ""; // Восстанавливаем прокрутку страницы
            // Восстанавливаем фокус на последний активный элемент
            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        }, 300);
    }

    // Закрытие модального окна по клику на кнопку
    closeModalButton.addEventListener("click", closeModalWindow);

    // Добавляем обработку клавиши Enter для кнопки закрытия
    closeModalButton.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            closeModalWindow();
        }
    });

    // Закрытие модального окна при клике вне его содержимого
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModalWindow();
        }
    });

    // Закрытие модального окна при нажатии на клавишу Escape
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.style.display === "flex") {
            closeModalWindow();
        }
    });
});
