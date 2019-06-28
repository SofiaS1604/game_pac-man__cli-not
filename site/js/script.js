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

if(document.querySelector('.section-maths__classes')){
    document.getElementsByClassName('section-maths__class')[0].addEventListener('click', () =>{
        document.querySelector('.section-maths__block--about').style.display = 'none';
        document.querySelector('.section-maths__block--5class').style.display = 'flex'
    })
}