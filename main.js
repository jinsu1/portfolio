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
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
    selectNavItem(target);
});

// Navbar 반응형 toggleBtn 활성화
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
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

    // category__btn에 selected를 없애고 새로 선택된 item에 selected를 추가
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = 
        e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

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

// 1. 모든 섹션 요소들을 가지고온다.
// 2. IntersectionOvserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
    
    const sectionIds = ['#home', '#about', '#skills', '#work',  '#contact'];

    const sections = sectionIds.map(id => document.querySelector(id));
    const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`)
    );

    let selectedNavIndex = 0;
    let selectedNavItem = navItems[0];
    
    //selected에 navItems[int] 값이 들어와야함
    function selectNavItem(selected) {
        selectedNavItem.classList.remove('active');
        selectedNavItem = selected;
        selectedNavItem.classList.add('active');
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    }

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting && entry.intersectionRatio > 0) {
                const index = sectionIds.indexOf(`#${entry.target.id}`);
                //스크롤링이 아래로되어서 페이지가 올라옴
                if(entry.boundingClientRect.y < 0) {
                    selectedNavIndex = index + 1;
                } else {
                    selectedNavIndex = index - 1;
                }
            //   selectNavItem(navItems[selectedNavIndex]);
            }
        });
    
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    window.addEventListener('wheel', () => {
        if(window.scrollY === 0){
            selectedNavIndex = 0;
            //wondow.scrollY는 현재화면의 Y좌표 시작값 + window.innerHeight는 현재 보여지는 화면의 높이 값
            //wondow.scrollY + window.innerHeight의 값이 4037.2이라 작동되지 않을 수 있으니 올림 해준다.
        } else if(Math.ceil(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
            //배열의 길이가 6이면 주소값은 5
            selectedNavIndex = navItems.length - 1;
        }
        selectNavItem(navItems[selectedNavIndex]);
      }); 


      // 스크롤 이동함수
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
        
        selectNavItem(navItems[sectionIds.indexOf(selector)]);
}