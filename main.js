'use strict';

// 스크롤시 navbar색깔 투명해제
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else{
        navbar.classList.remove('navbar--dark');
    }
});

// navbar메뉴 클릭시 스크롤 이동
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) =>{
    const target= event.target;
    const link= target.dataset.link;
    if (link == null) {
      return;
    }
    scrollIntoView(link);

});

// contactMe button 클릭시 스크롤 이동
const contactMeBtn = document.querySelector('.home__contact');
contactMeBtn.addEventListener('click', (event) => {
    scrollIntoView('#contact');
});

function scrollIntoView(selector) {
    const scrollTo= document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});

}