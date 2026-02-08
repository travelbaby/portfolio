/////////////
//スムーススクロール
/////////////
const links = document.querySelectorAll('a[href^="#"]');
links.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        const targetSection = document.querySelector(href);
        const sectionTop = targetSection.getBoundingClientRect().top;
        const currentPos = window.scrollY;
        const gap = 96;
        const target = sectionTop + currentPos - gap;
        window.scrollTo({
            top: target,
            behavior: 'smooth',
        });
    });
});

/////////////
//ハンバーガー
/////////////
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".nav__list");
    const btn = document.querySelector(".toggle-btn");
    const mask = document.querySelector("#mask");
    const header = document.querySelector(".header");

    if (!btn || !nav || !mask) return;

    btn.addEventListener("click", () => {
        nav.classList.toggle("open");
        btn.classList.toggle("open");
        mask.classList.toggle("open");
    });

    mask.addEventListener("click", () => {
        nav.classList.remove("open");
        btn.classList.remove("open");
        mask.classList.remove("open");
    });

    nav.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;
        nav.classList.remove("open");
        btn.classList.remove("open");
        mask.classList.remove("open");
    });

    if (header) {
        let triggerPoint = header.offsetHeight;

        const updateHeader = () => {
            if (window.scrollY > triggerPoint) {
                header.classList.add("is-scrolled");
            } else {
                header.classList.remove("is-scrolled");
            }
        };

        window.addEventListener("scroll", updateHeader);
        window.addEventListener("resize", () => {
            triggerPoint = header.offsetHeight;
            updateHeader();
        });
        updateHeader();
    }

    const filterButtons = document.querySelectorAll(".works__filter");
    const worksCards = Array.from(document.querySelectorAll(".works-card"));
    const moreBtn = document.querySelector(".works__more .btn");
    const worksEmpty = document.querySelector(".works__empty");
    let currentFilter = "all";
    let isExpanded = false;

    const getMaxVisible = () => {
        return window.matchMedia("(max-width: 768px)").matches ? 2 : 6;
    };

    const applyFilter = () => {
        const filtered = worksCards.filter((card) => {
            if (currentFilter === "all") return true;
            return card.dataset.category === currentFilter;
        });

        worksCards.forEach((card) => {
            card.style.display = "none";
        });

        const maxVisible = isExpanded ? filtered.length : getMaxVisible();
        filtered.forEach((card, index) => {
            if (index < maxVisible) {
                card.style.display = "";
            }
        });

        if (moreBtn) {
            if (filtered.length > maxVisible) {
                moreBtn.style.display = "inline-flex";
                moreBtn.setAttribute("aria-hidden", "false");
            } else {
                moreBtn.style.display = "none";
                moreBtn.setAttribute("aria-hidden", "true");
            }
        }

        if (worksEmpty) {
            const shouldShow = currentFilter === "closed" && filtered.length === 0;
            worksEmpty.style.display = shouldShow ? "block" : "none";
            worksEmpty.setAttribute("aria-hidden", shouldShow ? "false" : "true");
        }
    };

    if (filterButtons.length && worksCards.length) {
        filterButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                filterButtons.forEach((item) => item.classList.remove("is-active"));
                btn.classList.add("is-active");
                currentFilter = btn.dataset.filter || "all";
                isExpanded = false;
                applyFilter();
            });
        });
    }

    if (moreBtn) {
        moreBtn.addEventListener("click", () => {
            isExpanded = true;
            applyFilter();
        });
    }

    if (worksCards.length) {
        window.addEventListener("resize", applyFilter);
        applyFilter();
    }
});
