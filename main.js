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
$(function () {
    const nav = document.querySelector(".nav__list");
    const btn = document.querySelector(".toggle-btn");
    const mask = document.querySelector("#mask");

    if (btn) {
        btn.onclick = () => {
            nav.classList.toggle("open");
            btn.classList.toggle("open");
            mask.classList.toggle("open")
        };
    }

    mask.onclick = () => {
        nav.classList.toggle("open");
    };

    $('.nav__list').click(function () {
        $('#mask.open').removeClass('open');
        btn.classList.toggle("open");
    });
});


/////////////
//カルーセル
/////////////
const target = '.works.splide';

const options = {
    //sp
    mediaQuery: 'min',
    fixedWidth: '16rem',
    gap: 16,
    type: 'loop',
    arrows: false,
    drag: 'free',
    flickPower: 300,
    pagination: true,

    autoScroll: {
        speed: 0.4,
        pauseOnHover: true,
        pauseOnFocus: false,
    },
    breakpoints: {
        //pc
        640: {
            gap: 32,
            fixedWidth: '36rem',
        },
    },
    arrows: {
        prev: '.splide__arrow--prev',
        next: '.splide__arrow--next',
    },
    classes: {
        arrows: 'splide__arrows',
        arrow: 'splide__arrow',
    },
}

const mySplide = new Splide(target, options);

mySplide.mount(window.splide.Extensions);//拡張機能をセットする
mySplide.on('mounted updated', function () {
    const slides = document.querySelectorAll('.works__slide');
    const worksSection = document.querySelector('.works');


    worksSection.addEventListener('mouseenter', () => {
        slides.forEach(s => {
            s.style.opacity = '0.5';
            s.style.transform = 'scale(0.9)';
        });
    });

    worksSection.addEventListener('mouseleave', () => {
        slides.forEach(s => {
            s.style.opacity = '1';
            s.style.transform = 'scale(1)';
        });
    });

    slides.forEach(slide => {
        slide.addEventListener('mouseenter', () => {
            slide.style.opacity = '1';
            slide.style.transform = 'scale(1)';
        });
    });

    const arrows = document.querySelectorAll('.splide__arrow');
    arrows.forEach(arrow => {
        arrow.style.display = 'block';
    });
});


/////////////
//sectionタイトルのアニメーション
/////////////
function GlowAnimeControl() {
    $('.titleAnime').each(function () {
        const elemPos = $(this).offset().top - 50;
        const scroll = $(window).scrollTop();
        const windowHeight = $(window).height();
        if (scroll >= elemPos - windowHeight) {
            $(this).addClass("glow");

        } else {
            $(this).removeClass("glow");
        }
    });
}

$(window).scroll(function () {
    GlowAnimeControl();
});

/////////////
//メインタイトルのタイピングアニメーション
/////////////
$(document).ready(function () {
    // spanタグを追加する
    const elements = $(".main-visual__title");
    elements.each(function () {
        let text = $(this).text();
        let textbox = "";
        text.split('').forEach(function (t) {
            if (t !== " ") {
                textbox += '<span style="opacity: 0;">' + t + '</span>';
            } else {
                textbox += t;
            }
        });
        $(this).html(textbox);
    });

    TextTypingAnime();
});

function TextTypingAnime() {
    $('.main-visual__title').each(function () {
        const thisChild = $(this).children('span');
        const time = 100;

        thisChild.each(function (i) {
            $(this).delay(time * i).animate({ opacity: 1 }, time);
        });

        const totalTime = time * thisChild.length;

        setTimeout(function () {
            const cursor = $('<span class="cursor">|</span>');
            $('.main-visual__title').append(cursor);
            setInterval(function () {
                cursor.toggle();
            }, 600);
        }, totalTime);
    });
}
/////////////
//スキルがランダムに出現する
/////////////
let animeFlag = true;
function moveAnimation() {
    const skillList = document.querySelector(".skill__list");
    const skillItems = Array.from(skillList.children);

    function randomScrollAnime() {
        const elemPos = skillList.getBoundingClientRect().top;

        const scroll = window.scrollY || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;

        if (scroll >= elemPos - windowHeight + 50) {
            if (skillItems.length > 0 && animeFlag) {
                animeFlag = false;
                const rnd = Math.floor(Math.random() * skillItems.length);
                const selectedItem = skillItems[rnd];

                selectedItem.classList.add("fadeUp");

                skillItems.splice(rnd, 1);

                setTimeout(() => {
                    animeFlag = true;
                    randomScrollAnime();
                }, 100);
            }
        } else {
            animeFlag = true;
        }
    }
    randomScrollAnime();
}
window.addEventListener('scroll', moveAnimation);

//skillのアコーディオン
document.addEventListener('DOMContentLoaded', function () {
    const skillItems = document.querySelectorAll('.skill__item');

    skillItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.stopPropagation();

            
            skillItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            
            this.classList.toggle('active');
        });
    });

    document.addEventListener('click', function () {
        skillItems.forEach(item => {
            item.classList.remove('active');
        });
    });
});

/////////////
//aboutのフェードイン
/////////////
window.addEventListener('scroll', function () {
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const boxes = document.querySelectorAll('.about__wrapper');
    boxes.forEach(function (box) {
        const distanceToBox = box.offsetTop;
        if (scroll + windowHeight > distanceToBox) {
            box.classList.add('fadeIn');
        }
    });
});


$(document).ready(function () {
    function PageTopAnime() {
        const scroll = $(window).scrollTop();
        if (scroll >= 200) {
            $('.page-top').removeClass('DownMove');
            $('.page-top').addClass('UpMove');
        } else {
            if ($('.page-top').hasClass('UpMove')) {
                $('.page-top').removeClass('UpMove');
                $('.page-top').addClass('DownMove');
            }
        }
    }

    PageTopAnime();

    $(window).scroll(function () {
        PageTopAnime();
    });

    $('.page-top a').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});