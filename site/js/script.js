if (document.getElementsByClassName('profile')[0]){
    document.getElementsByClassName('profile')[1].addEventListener('click', () => {
        document.getElementsByClassName('profile')[1].classList.add('profile--active');
        document.getElementsByClassName('profile')[0].classList.remove('profile--active');
        document.getElementsByClassName('profile')[2].classList.remove('profile--active');
        document.querySelector('.employee-informatics').style.display = 'none';
        document.querySelector('.employee-linguistics').style.display = 'flex';
        document.querySelector('.employee-maths').style.display = 'none';
    });

    document.getElementsByClassName('profile')[0].addEventListener('click', () => {
        document.getElementsByClassName('profile')[0].classList.add('profile--active');
        document.getElementsByClassName('profile')[1].classList.remove('profile--active');
        document.getElementsByClassName('profile')[2].classList.remove('profile--active');
        document.querySelector('.employee-informatics').style.display = 'none';
        document.querySelector('.employee-linguistics').style.display = 'none';
        document.querySelector('.employee-maths').style.display = 'flex';
    });

    document.getElementsByClassName('profile')[2].addEventListener('click', () => {
        document.getElementsByClassName('profile')[2].classList.add('profile--active');
        document.getElementsByClassName('profile')[0].classList.remove('profile--active');
        document.getElementsByClassName('profile')[1].classList.remove('profile--active');
        document.querySelector('.employee-informatics').style.display = 'flex';
        document.querySelector('.employee-linguistics').style.display = 'none';
        document.querySelector('.employee-maths').style.display = 'none';
    });
}



$(document).ready(function () {
    let new_id;
    $('.section__classes').delegate('a', 'click', function(e) {
        e.preventDefault();
        if(new_id !== undefined){
            document.getElementsByClassName('section__class')[new_id].classList.remove('section__class--active');
        }
        for (let i = 0; i < document.querySelectorAll('.section__block').length; i++){
            document.getElementsByClassName('section__block')[i].style.display = 'none';
        }
        document.getElementsByClassName('section__block')[$(this).index() + 1].style.display = 'flex';
        document.getElementsByClassName('section__class')[$(this).index()].classList.add('section__class--active');

        new_id = $(this).index();
    });

});