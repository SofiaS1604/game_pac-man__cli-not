let game = new Vue({
    el: '.game',
    data:{
        game_start: true,
        game_level: false,
        game_play: false,
        game_time: 1000000,
        min : null,
        sec: null,
        levels: [],
        walls: [],
        walls_left: [],
        walls_top: [],
        row: 36,
        cell: 46,
        circle_x: 0,
        circle_y: 0,
    },

    methods: {
        button_play: function () {
            this.game_start = false;
            this.game_level = true;


            for (let i = 1; i < 21; i++) {
                var level = this.levels.push(i);
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
            } else {
                this.gameOver();
            }

        },




        gameOver() {
            this.game_start = true;
            this.game_play = false;
            this.game_time = 1000000
        },




        level_info: function(id){

            this.gameTimer();

            this.game_level = false;
            this.game_play = true;

            for (let i = 1; i < (id*2.5) - 2; i++) {
                let wall = this.walls.push(i);

                let wall_left = this.walls_left.push(Math.floor(Math.random() * 45));
                let wall_top = this.walls_top.push(Math.floor(Math.random() * 35));

            }

        },




        left(){
            if(this.circle_x > 0){
                this.circle_x --;
            }
        },

        top(){
            if(this.circle_y > 0){
                this.circle_y --;
            }
        },

        right(){
            if(this.circle_x < this.cell - 1){
                this.circle_x ++;
            }
        },

        bottom(){
            if(this.circle_y < this.row -1){
                this.circle_y ++;
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
                    this.bottom()

            }
        }


    },


    mounted(){
        window.addEventListener('keydown', this.run);
    },




});






