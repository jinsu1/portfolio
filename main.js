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
    




// 스크롤시 home 점차 투명 
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
 
});

// arrowUpBtn 스크롤시 나타나기
const arrowUp = document.querySelector('.arrowUpBtn');
document.addEventListener('scroll', () => {
    if(window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else{
        arrowUp.classList.remove('visible');
    }
});

// arrowUpBtn 활성화
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer  = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null) {
    return;
    }
    projectContainer.classList.add('animation-out');
    setTimeout(() => {
        projects.forEach((project) => {   //forEach이기때문에 배열 수 만큼 반복됨. 기본값invisible로 설정
            console.log(project.dataset.type);
            if( filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible'); 
            }else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('animation-out');
    }, 300);

});


// 스크롤 이동힘수
function scrollIntoView(selector) {
    const scrollTo= document.querySelector(selector);
    // scrollTo.scrollIntoView({behavior:'smooth'});

        // 스크롤 이동시 타이틀이 잘리는현상 방지
        const scrollMove = document.querySelector(selector);
        const top = scrollMove.offsetTop - navbarHeight < 0 
            ? 0:scrollMove.offsetTop - navbarHeight;
        const left = scrollMove.offsetTop;
        window.scrollTo({
            top:top,
            left:left,
            behavior:'smooth'
        });
}

