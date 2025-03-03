document.addEventListener("DOMContentLoaded", function () {
    console.log("Сайт загружен!");

    /* 🔹 1. АНИМАЦИЯ ПОЯВЛЕНИЯ СЕКЦИЙ */
    const sections = document.querySelectorAll("section");
    const options = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    /* 🔹 2. ПОДСВЕТКА АКТИВНЫХ ССЫЛОК В МЕНЮ */
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let fromTop = window.scrollY;

        navLinks.forEach(link => {
            let section = document.querySelector(link.getAttribute("href"));
            if (
                section.offsetTop <= fromTop + 100 &&
                section.offsetTop + section.offsetHeight > fromTop + 100
            ) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });

    /* 🔹 3. ПЛАВНЫЙ СКРОЛЛ ПО САЙТУ */
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    /* 🔹 4. ЭФФЕКТ НАВЕДЕНИЯ НА КАРТОЧКИ */
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("mouseover", () => {
            card.style.transform = "scale(1.05)";
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "scale(1)";
        });
    });
});

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
    const options = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});
