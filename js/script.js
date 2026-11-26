/////////////
//トップへ戻るボタンの表示切り替え
/////////////
const pageTop = document.querySelector('.page-top');

if (pageTop) {
    const updatePageTop = () => {
        const isVisible = window.scrollY > 300;
        pageTop.classList.toggle('UpMove', isVisible);
        pageTop.classList.toggle('DownMove', !isVisible);
    };

    window.addEventListener('scroll', updatePageTop, { passive: true });
    updatePageTop();
}

/////////////
//ハンバーガー
/////////////
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".toggle-btn");
    const mask = document.querySelector("#mask");
    const header = document.querySelector(".header");

    if (btn && mask) {
        const setMenuOpen = (isOpen, restoreFocus = false) => {
            btn.setAttribute("aria-expanded", String(isOpen));
            btn.classList.toggle("open", isOpen);
            mask.classList.toggle("open", isOpen);
            if (restoreFocus) btn.focus({ preventScroll: true });
        };

        btn.addEventListener("click", () => {
            setMenuOpen(btn.getAttribute("aria-expanded") === "false");
        });

        mask.addEventListener("click", (event) => {
            if (event.target.closest("a")) setMenuOpen(false, true);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
                setMenuOpen(false, true);
            }
        });

        document.addEventListener("focusin", (event) => {
            if (!btn.contains(event.target) && !mask.contains(event.target)) {
                setMenuOpen(false);
            }
        });

        const mobile = window.matchMedia("(max-width: 768px)");
        mobile.addEventListener("change", () => {
            if (!mobile.matches) setMenuOpen(false);
        });
    }

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
});
