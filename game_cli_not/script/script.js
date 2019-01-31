let game = new Vue({
    el: '.game',
    data:{
        game_start: true,
        game_level: false,
        game_play: false,
        game_time: 90,
        min : null,
        sec: null,
        levels: [],
        walls: [],
        walls_left: [],
        walls_top: [],
        circle_left: [],
        circle_top: [],
        row: 36,
        cell: 46,
        square_x: 0,
        square_y: 0,
        target: null,
        score: 0,
        circle_number: [],
        game_end: false,
        title_end: ''
    },

    methods: {
        gameStart: function () {
            this.game_start = false;
            this.game_level = true;
            this.game_play = false;
            this.levels = [];
            this.walls = [];
            this.walls_left = [];
            this.walls_top = [];
            this.square_x = 0;
            this.square_y = 0;
            this.game_end = false;
            this.circle_number = [];

            for(let i = 0; i < 10; i++ ){
                let div = document.createElement('div');
                div.className = 'circle circle-'+i;
                let circles = document.getElementsByClassName('circles')[0];
                circles.appendChild(div);

                document.getElementsByClassName('circle-'+i)[0].style.top = this.circle_top[i]*15+'px';
                document.getElementsByClassName('circle-'+i)[0].style.left = this.circle_left[i]*15+'px';
            }

            for (let i = 1; i < 21; i++) {
                this.levels.push(i);
            }
        },

        gameTimer() {
            if (this.game_time > 0) {

                this.game_time--;
                this.min =  Math.floor(this.game_time / 60);
                this.sec = this.game_time - ((Math.floor(this.game_time / 60)) * 60);

                if(this.min < 10 ){
                    this.min = '0' + this.min;
                }

                if (this.sec < 10) {
                    this.sec = '0' + this.sec;
                }

                setTimeout(() => {
                    this.gameTimer();
                }, 1000);

            }else {
                this.gameOver();
            }
        },

        gameOver() {
            this.game_start = false;
            this.game_play = false;
            this.game_level = false;
            this.game_time = 90;
            this.game_end = true;

            document.getElementsByClassName('circles')[0].innerHTML = '';

            if(this.target <= this.score)
                this.title_end = 'You win!';
            else
                this.title_end = 'You lose!'
        },


        gamePlay: function(id){
            this.target = id+35;
            this.gameTimer();
            this.game_level = false;
            this.game_play = true;
            this.game_start = false;
            this.changeCircle();
            this.scoreChange();
            this.title_end = '';

            for (let i = 0; i < 55 ; i++) {
                this.walls.push(i);

                let left = Math.floor(Math.floor(Math.random() * (36/6)) + 1);
                let top = Math.floor(Math.floor(Math.random() * (46/5)) + 1);

                this.walls_top.push(((Math.floor(Math.random() * (top)) + 1)*60)-15);
                this.walls_left.push(((Math.floor(Math.random() * (left)) + 1)*105)-60);
            }

        },

        changeCircle(){


                let charset = this.circle_number.length;
                if(charset > 0){
                    for(let i = 0; i < charset; i++){
                        let circles = document.getElementsByClassName('circles')[0];
                        let div = document.createElement('div');
                        div.className = 'circle circle-'+this.circle_number[0];
                        circles.appendChild(div);
                        this.circle_number.splice(0, 1);
                    }
                }else{
                    this.circle_number = [];
                }



            for(let i = 0; i < 10; i++){
                this.circle_left[i] = Math.floor(Math.floor(Math.random() * 36));
                this.circle_top[i] = Math.floor(Math.floor(Math.random() * 36));

                if(document.getElementsByClassName('circle-'+i)[0]){
                    document.getElementsByClassName('circle-'+i)[0].style.top = this.circle_top[i]*15+'px';
                    document.getElementsByClassName('circle-'+i)[0].style.left = this.circle_left[i]*15+'px';
                }
            }

            setTimeout(() =>{
                this.changeCircle();
            },5000)
        },

        scoreChange(){

            let circles = document.getElementsByClassName('circles')[0];

            for(let i = 0; i < this.circle_left.length; i++ ) {
                if (this.circle_left[i] * 15 === this.square_x * 15 && this.circle_top[i] * 15 === this.square_y * 15) {

                    this.circle_number.push(i);
                    circles.removeChild(document.getElementsByClassName('circle-' + i)[0]);

                    delete this.circle_top[i];
                    delete this.circle_left[i];

                    this.score += 1;
                }
            }

            setTimeout(() =>{
                this.scoreChange()
            },10)
        },


        left(){
            if(this.square_x > 0){
                let counter = 0;

                for(let i = 0; i < this.walls.length; i++ ){
                    if((this.walls_top[i] === this.square_y*15 || this.walls_top[i]+15 === this.square_y*15) && this.walls_left[i]+30 === this.square_x*15){
                        counter = 1;
                    }
                }

                if(counter !== 1){
                    this.square_x --;
                }
            }
        },

        top(){
            if(this.square_y > 0){
                let counter = 0;

                for(let i = 0; i < this.walls_left.length; i++ ){
                    if(this.walls_top[i]+30 === this.square_y*15 && (this.walls_left[i] === this.square_x*15 || this.walls_left[i]+15 === this.square_x*15)){
                        counter = 1;
                    }
                }

                if(counter !== 1){
                    this.square_y --;
                }
            }
        },

        right(){
            if(this.square_x < this.cell - 1){
                let counter = 0;

                for(let i = 0; i < this.walls.length; i++ ){
                    if((this.walls_top[i] === this.square_y*15 || this.walls_top[i]+15 === this.square_y*15) && this.walls_left[i]-15 === this.square_x*15  ) {
                        counter = 1;
                    }
                }

                if(counter !== 1){
                    this.square_x ++;
                }
            }
        },

        bottom(){
            if(this.square_y < this.row -1){
                let counter = 0;

                for(let i = 0; i < this.walls.length; i++ ){
                    if(this.walls_top[i]-15 === this.square_y*15 && (this.walls_left[i] === this.square_x*15 || this.walls_left[i]+15 === this.square_x*15)) {
                        counter = 1;
                    }
                }

                if(counter !== 1){
                    this.square_y ++;
                }
            }
        },


        run: function (e) {
            switch (e.keyCode) {
                case 37:
                    this.left();
                    break;
                case 38:
                    this.top();
                    break;
                case 39:
                    this.right();
                    break;
                case 40:
                    this.bottom();
                    break;
            }
        }
    },

    mounted(){
        window.addEventListener('keydown', this.run);
    },

});





