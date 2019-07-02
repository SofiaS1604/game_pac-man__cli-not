$(document).ready(function () {
    let newSection;
    $('.section__classes').delegate('a', 'click', function(e) {
        e.preventDefault();
        if(newSection !== undefined){
            document.getElementsByClassName('section__class')[newSection].classList.remove('section__class--active');
        }
        for (let i = 0; i < document.querySelectorAll('.section__block').length; i++){
            document.getElementsByClassName('section__block')[i].style.display = 'none';
        }
        document.getElementsByClassName('section__block')[$(this).index() + 1].style.display = 'flex';
        document.getElementsByClassName('section__class')[$(this).index()].classList.add('section__class--active');

        newSection = $(this).index();
    });


    let newEmployees = 0;
    $('.profiles').delegate('a', 'click', function(e) {
        e.preventDefault();

        document.getElementsByClassName('profile')[newEmployees].classList.remove('profile--active');

        for (let i = 0; i < document.querySelectorAll('.employees_container').length; i++){
            document.getElementsByClassName('employees_container')[i].style.display = 'none';
        }
        document.getElementsByClassName('employees_container')[$(this).index()].style.display = 'flex';
        document.getElementsByClassName('profile')[$(this).index()].classList.add('profile--active');

        newEmployees = $(this).index();
    });

    $('.log-in__button').click(() => {
        if(document.getElementsByClassName('log-in__input')[0].value === '123' && document.getElementsByClassName('log-in__input')[1].value === '123'){
            window.location="https://sofias1604.github.io/game_pac-man__cli-not/site/log_in-admin.html";
        }
    })
});

