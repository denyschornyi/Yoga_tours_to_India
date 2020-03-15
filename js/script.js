window.addEventListener('DOMContentLoaded', function(){

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


    function hideTabContent(a){
        for( let i = a; i<tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b){
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')){
            for (let i = 0; i<tab.length; i++){
                if(target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;


                }
            }
        }
    });

    // ------------------------ TIMER---------------

    let dedline = '2020-03-14';

    function getTimeRemaining(endtime){
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/1000/60/60));

            return{
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
            };
        }
        function setClock(id, endtime){
            let timer = document.getElementById(id),
                hours = timer.querySelector('.hours'),
                minutes = timer.querySelector('.minutes'),
                seconds = timer.querySelector('.seconds'),
                timeInterval = setInterval(updateClock, 1000);

            function updateClock(){
                let t = getTimeRemaining(endtime);

                function addZero(num){
                    if(num <= 9 )
                        {return '0' + num;}
                    else{return num;}
                }

                hours.textContent = addZero(t.hours);
                minutes.textContent = addZero(t.minutes);
                seconds.textContent = addZero(t.seconds);

                if(t.total <= 0 ){
                    hours.textContent = "00";
                    minutes.textContent = "00";
                    seconds.textContent = "00";
                }
        }
    }
    setClock('timer', dedline);


    // --------------------- MODAL WINDOW ----------------------

    let  more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        moreBtnTabs = document.querySelectorAll('.description-btn');


    more.addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = 'visible';

    });

    moreBtnTabs.forEach(function(item){
        item.addEventListener('click', function(){
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    });
    
    
        
//    class Options{
//        constructor(height, width, bg, fontSize, textAlign){
//             this.height = height;
//             this.width = width;
//             this.bg = bg;
//             this.fontSize = fontSize;
//             this.textAlign = textAlign;
//        }

//         createDiv() {
//             let div = document.createElement('div');
//             div.textContent = 'lorem lorem lorem babah';
//             div.style.cssText = `height: ${this.height}px;
//                                 width: ${this.width}px;
//                                 background: ${this.bg};
//                                 font-size: ${this.fontSize}px;
//                                 text-align: ${this.textAlign};`;
//             document.body.appendChild(div);
//         }

        
//    }
//    let block = new Options(200,200,"red",40,"center");
//    block.createDiv();



 
// -----------------   FORM HERE ----------------

let message = {
    loading: 'Loading...',
    success: 'Thank you. We contact with you as soon, as possible.',
    failure: 'Eror..'
};

let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

form.addEventListener('submit', function(event){
    event.preventDefault();
    form.appendChild(statusMessage);

    let request = new XMLHttpRequest();
    request.open('POST', 'server.php');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    let formData = new FormData(form);

    let obj = {};

    formData.forEach(function(value , key){
        obj[key] = value;           // Robymo z nashogo formData peretvoriuemo d format JSON
    });
    let json = JSON.stringify(obj);

    request.send(json);

    request.addEventListener('readystatechange', function(){
        if(request.readyState < 4){
            statusMessage.innerHTML = message.loading;
        } else if(request.readyState === 4 && request.status == 200){
            statusMessage.innerHTML = message.success;
        }else{
            statusMessage.innerHTML = message.failure;
        }
    });

    for(let i = 0; i < input.length; i++){
        input[i].value = '';
    }

});
    
});



