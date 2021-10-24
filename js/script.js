'use strict';
window.addEventListener('DOMContentLoaded',function(){
  
  let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');  

    function hideTabContent(a){
        for (let i=a;i<tabContent.length;i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);
    function showTabContent(b){
        if( tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
info.addEventListener('click',function(event){
    let target = event.target;
    if(target && target.classList.contains('info-header-tab')){
        for(let i = 0;i<tab.length;i++){
            if(target == tab[i]) {
                hideTabContent(0);
                showTabContent(i);
                break;
            }
        }
    }

});

//define variables

function newTimer(){
    let time = document.querySelector(".timer-numbers"),
    hours = document.querySelector(".hours"),
    minutes = document.querySelector(".minutes"),
    seconds = document.querySelector(".seconds"),
    days = document.querySelector(".days"),
    getHours = new Date().getHours(),
    getMinutes = new Date().getMinutes(),
    getSeconds = new Date().getSeconds(),
    getDay = new Date().getDay();

    console.log(getHours,getMinutes,getSeconds,getDay);
    
let newHours = 23 - getHours,
    newMinutes = 59 - getMinutes,
    newSeconds = 59 - getSeconds;
    hours.innerHTML = newHours,
    minutes.innerHTML = newMinutes,
    seconds.innerHTML = newSeconds;
    // if (newSeconds==60){
    //     minutes.innerHTML=getMinutes-1;
    //     seconds.innerHTML=0;
    // } else if (newMinutes==60){
    //     minutes.innerHTML=0;
    //     hours.innerHTML=newHours-1;
    // } else if (hours.innerHTML==24){
    //     hours.innerHTML=0;
    // }
      if (newSeconds<10){
        
        seconds.innerHTML='0'+newSeconds;
    } else if (newMinutes<10){
        minutes.innerHTML='0'+newMinutes;
        
    }



    switch(getDay){
        case 0:
        case 6:
            days.innerHTML="Weekend";
            break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            days.innerHTML="Working day";
            break;
        default:
            days.innerHTML="Ok day";
        
    }
    
}


    
    setInterval(newTimer,1000);
//Overlay
let btnDescription = document.querySelectorAll('.description-btn'),
    btnMore = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    btnClose = document.querySelector('.popup-close');

    function addOverlay(){
        overlay.classList.add('overlayon');
    }
    function removeOverlay(){
        overlay.classList.remove('overlayon');
    }
for (let i = 0;i<btnDescription.length;i++){
btnDescription[i].addEventListener('click', addOverlay);
}
btnMore.addEventListener('click', addOverlay);
btnClose.addEventListener('click',removeOverlay);


 // Form

//  let message = {
//     loading: 'Загрузка...',
//     success: 'Спасибо! Скоро мы с вами свяжемся!',
//     failure: 'Что-то пошло не так...'
// };

// let form = document.querySelector('.main-form'),
//     input = form.getElementsByTagName('input'),
//     statusMessage = document.createElement('div');

//     statusMessage.classList.add('status');

// form.addEventListener('submit', function(event) {
//     event.preventDefault();
//     form.appendChild(statusMessage);

//     let request = new XMLHttpRequest();
//     request.open('POST', 'server.php');
//     request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

//     let formData = new FormData(form);

//     let obj = {};
//     formData.forEach(function(value, key) {
//         obj[key] = value;
//     });
//     let json = JSON.stringify(obj);

//     request.send(json);

//     request.addEventListener('readystatechange', function() {
//         if (request.readyState < 4) {
//             statusMessage.innerHTML = message.loading;
//         } else if(request.readyState === 4 && request.status == 200) {
//             statusMessage.innerHTML = message.success;
//         } else {
//             statusMessage.innerHTML = message.failure;
//         }
//     });

//     for (let i = 0; i < input.length; i++) {
//         input[i].value = '';
//     }
// });

let message = {
    loading:"Loading...Please wait",
    succes:"Thanks , We will call You",
    erorror:"Oops something wrong"

};

let form = document.querySelector('.main-form'),
    input  = form.getElementsByTagName('input'),
    messDisplay = document.createElement('div');
    messDisplay.classList.add('status');
 
form.addEventListener('submit', function(evt){
    evt.preventDefault();
    form.appendChild(messDisplay);
    function sendForm(method,url){
     return new Promise((resolve,reject)=>{

    

    let request = new XMLHttpRequest();
    request.open(method,url);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
   
    let formData = new FormData(form);

    let obj = {};
    formData.forEach(function(value, key) {
        obj[key] = value;
    });
    let json = JSON.stringify(obj);

    request.send(json);
    

request.onload=()=>{
  if(request.readyState == 4 && request.status == 200) {
    resolve(messDisplay.innerHTML = message.succes);
  } else {
    reject(messDisplay.innerHTML = message.erorror);
  }
    };


for(let i=0; i<input.length; i++){
    input[i].value = "";
}
            });
        }
        sendForm("POST","../server.php")
        .than(data=>console.log(data))
        .catch(e=>console.log(e));
    });
//Slider

let slideIndex = 1,
    slides = document.querySelectorAll('.slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.querySelectorAll('.dot');

 showSlides(slideIndex);

function showSlides(n){
    if (n > slides.length){
        slideIndex = 1;
    }
    if (n < 1){
        slideIndex = slides.length;
    }

    // slides.forEach((item) => item.style.display = "none");
    for(let i = 0; i < slides.length; i++){
        slides[i].style.display = 'none';
    }
    dots.forEach((item) => item.classList.remove('dot-active'));
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex - 1].classList.add("dot-active");
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

prev.addEventListener("click", function(){
    plusSlides(-1);
});

next.addEventListener("click", function(){
    plusSlides(1);
});

dotsWrap.addEventListener("click", function(event){
    for (let i = 0; i < dots.length + 1;i++){
        if(event.target.classList.contains('dot') && event.target == dots[i-1]){
            currentSlide(i);
        }
    }
});

//Calc
let persons = document.querySelectorAll('.counter-block-input')[0],
restDays = document.querySelectorAll('.counter-block-input')[1],
place = document.getElementById('select'),
totalValue = document.getElementById('total'),
personsSum = 0,
daysSum = 0,
total = 0;

totalValue.innerHTML = 0;

persons.addEventListener('change', function() {
personsSum = +this.value;
total = (daysSum + personsSum)*4000;

if(restDays.value == '') {
    totalValue.innerHTML = 0;
} else {
    totalValue.innerHTML = total;
}
});

restDays.addEventListener('change', function() {
daysSum = +this.value;
total = (daysSum + personsSum)*4000;

if(persons.value == '') {
    totalValue.innerHTML = 0;
} else {
    totalValue.innerHTML = total;
}
});

place.addEventListener('change', function() {
if (restDays.value == '' || persons.value == '') {
    totalValue.innerHTML = 0;
} else {
    let a = total;
    totalValue.innerHTML = a * this.options[this.selectedIndex].value;
}
});
});
