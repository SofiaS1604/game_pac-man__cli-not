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
        circles: [0,1,2,3,4,5,6,7,8,9]
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
            this.game_start = true;
            this.game_play = false;
            this.game_level = false;
            this.game_time = 90;
        },


        gamePlay: function(id){

            this.target = id+35;
            this.gameTimer();
            this.game_level = false;
            this.game_play = true;
            this.game_start = false;
            this.changeCircle();
            this.scoreChange();

            console.log(this.circle_top);

            for (let i = 0; i < 55 ; i++) {
                this.walls.push(i);

                let left = Math.floor(Math.floor(Math.random() * (36/6)) + 1);
                let top = Math.floor(Math.floor(Math.random() * (46/5)) + 1);

                this.walls_top.push(((Math.floor(Math.random() * (top)) + 1)*60)-15);
                this.walls_left.push(((Math.floor(Math.random() * (left)) + 1)*105)-60);
            }

        },

        changeCircle(){

            for(let i = 0; i < 11; i++){
                this.circle_left[i] = Math.floor(Math.floor(Math.random() * 36));
                this.circle_top[i] = Math.floor(Math.floor(Math.random() * 36));
            }

            setTimeout(() =>{
                this.changeCircle();
            },5000)


        },

        scoreChange(){

            for(let i = 0; i < this.circle_left.length; i++ ){
                if(this.circle_left[i]*15 === this.square_x*15 && this.circle_top[i]*15 === this.square_y*15){

                    this.score += 1;
                    delete this.circle_top[i];
                    delete this.circle_left[i];
                }
            }

            setTimeout(() =>{
                this.scoreChange()
            },25)
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





