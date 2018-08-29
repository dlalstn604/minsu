        var myGamePiece;
        var myObstacles = [];
        var hidden = [];
        var missile = [];
        var myMissile = [];
        var myScore;

        function replay() {
            window.location.reload();
        }

        function startGame() {
            myGamePiece = new component(55, 75, ship, 210, 715, "image");
            myEnemy = new enemy(100, 55, enemy2, 220, 50, "image");
            myBackground = new component(450, 2800, space, 0, -2090, "background");
            myScore = new component("30px", "Consolas", "white", 150, 40, "text");
            myGameArea.start();
        }

        var myGameArea = {
            canvas: document.createElement("canvas"),
            start: function () {
                this.canvas.width = 450;
                this.canvas.height = 710;
                this.context = this.canvas.getContext("2d");
                document.body.insertBefore(this.canvas, document.body.childNodes[0]);
                this.frameNo = 0;
                this.interval = setInterval(updateGameArea, 20);
                this.action();
                this.shooting = false;
                this.left = false;
                this.right = false;


            },
            action: function () {
                window.addEventListener("keydown", this.buttonDown);
                window.addEventListener("keyup", this.buttonUp);
            },
            clear: function () {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },
            stop: function () {
                clearInterval(this.interval);
            },

            //컨트롤 키들이 서로 간섭을 하지 않게 하기 위해 따로 값을 먹여줌
            buttonDown: function (e) {
                if (e.keyCode == 17) {
                    myGameArea.shooting = true;
                }
                if (e.keyCode == 37) {
                    myGameArea.left = true;
                }
                if (e.keyCode == 39) {
                    myGameArea.right = true;
                }
            },

            buttonUp: function (e) {
                if (e.keyCode == 17) {
                    myGameArea.shooting = false
                }
                if (e.keyCode == 37) {
                    myGameArea.left = false;
                }
                if (e.keyCode == 39) {
                    myGameArea.right = false;
                }
            }

        }

        function component(width, height, color, x, y, type) {

            this.type = type;
            if (type == "image" || type == "background") {
                this.image = new Image();
                this.image.src = color;
            }
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.speedX = 0;
            this.speedY = 0;
            this.update = function () {
                ctx = myGameArea.context;
                if (type == "image" || type == "background") {
                    ctx.drawImage(this.image,
                        this.x,
                        this.y,
                        this.width, this.height)
                } else if (type == "background") {
                    ctx.drawImage(this.image,
                        this.x + this.width,
                        this.y,
                        this.width, this.height);
                } else if (this.type == "text") {
                    ctx.font = this.width + " " + this.height;
                    ctx.fillStyle = color;
                    ctx.fillText(this.text, this.x, this.y);
                } else {
                    ctx.fillStyle = color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            }
            this.newPos = function () {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.type == "background") {
                    if (this.y > 0) {
                        this.y = (myGameArea.canvas.height - this.height);
                    }
                }
                if (this.type == "image") {
                    if (this.y > 625) {
                        this.y -= 2;
                    }
                }
            }

            this.crashWith = function (otherobj) {
                var myleft = this.x + 5;
                var myright = this.x + (this.width) - 5;
                var mytop = this.y + 17;
                var mybottom = this.y + (this.height);
                var otherleft = otherobj.x;
                var otherright = otherobj.x + (otherobj.width);
                var othertop = otherobj.y;
                var otherbottom = otherobj.y + (otherobj.height);
                var crash = true;
                if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                    crash = false;
                }
                return crash;
            }

        }

        function obstacles(width, height, color, x, y, type) {
            this.type = type;
            if (type == "image") {
                this.image = new Image();
                this.image.src = color;
            }
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.speedX = 0;
            this.speedY = 0;
            this.dirX = Math.random() * 2;
            this.update = function () {
                ctx = myGameArea.context;
                if (type == "image") {
                    ctx.drawImage(this.image,
                        this.x,
                        this.y,
                        this.width, this.height)
                } else {
                    ctx.fillStyle = color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
                if (this.x >= myGameArea.canvas.width - this.width || this.x <= 0) {
                    this.dirX *= -1;
                }
                this.x += this.dirX;
            }
            this.newPos = function () {
                this.y += this.speedY;
                this.X += this.speedX;
            }

        }

        function enemy(width, height, color, x, y, type) {
            this.type = type;
            if (type == "image") {
                this.image = new Image();
                this.image.src = color;
            }
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.dirX = 2;
            this.update = function () {
                ctx = myGameArea.context;
                if (type == "image") {
                    ctx.drawImage(this.image,
                        this.x,
                        this.y,
                        this.width, this.height)
                } else {
                    ctx.fillStyle = color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
                if (this.x >= myGameArea.canvas.width - this.width || this.x <= 0) {
                    this.dirX *= -1;
                }
                this.x += this.dirX;
            }
        }

        function enemyMissile(width, height, color, x, y, type) {
            this.type = type;
            if (type == "image") {
                this.image = new Image();
                this.image.src = color;
            }
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.speedX = 0;
            this.speedY = 0;
            this.update = function () {
                ctx = myGameArea.context;
                if (type == "image") {
                    ctx.drawImage(this.image,
                        this.x,
                        this.y,
                        this.width, this.height)
                } else {
                    ctx.fillStyle = color;
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            }
            this.newPos = function () {
                this.y += this.speedY;
                this.X += this.speedX;
            }
        }


        function updateGameArea() {
            myGameArea.clear();

            if (myGameArea.shooting) {
                shoot();
            }

            function shoot() {
                if (myGameArea.frameNo % 5 == 1) {
                    myMissile.push(new component(5, 20, "#4DF051", myGamePiece.x + 27, myGamePiece.y));
                }
            }

            if (myGameArea.left) {
                myGamePiece.x -= 5;
                if (myGamePiece.x < -20) {
                    myGamePiece.x = -20;
                }
            }
            if (myGameArea.right) {
                myGamePiece.x += 5;
                if (myGamePiece.x + myGamePiece.width > myGameArea.canvas.width + 20) {
                    myGamePiece.x = 415;
                }
            }

            myBackground.speedY = 1.5;
            myBackground.newPos();
            myBackground.update();
            myGamePiece.update();
            myGamePiece.newPos();
            myEnemy.update();
            myScore.text = "SCORE: " + myGameArea.frameNo;
            myGameArea.frameNo += 1;

            if (myGameArea.frameNo == 1 || everyinterval(100)) {
                myObstacles.push(new obstacles(60, 100, stone, Math.random() * 390, -80, 'image'));
            }

            if (myGameArea.frameNo == 1 || everyinterval(10000)) {
                setInterval(function () {
                    hidden.push(new obstacles(55, 55, star, Math.random() * 390, -50, 'image'))
                }, 10000)
            }

            if (myGameArea.frameNo % 10000 == 1) {
                setInterval(function () {

                    missile.push(new enemyMissile(5, 20, "red", myEnemy.x + 50, myEnemy.y + 30));
                }, 1500)
            }


            for (i = 0; i < myObstacles.length; i += 1) {
                myObstacles[i].y += 1;
                myObstacles[i].update();
                myObstacles[i].newPos();
            }

            for (i = 0; i < hidden.length; i += 1) {
                hidden[i].y += 5;
                hidden[i].update();
            }


            for (i = 0; i < missile.length; i += 1) {
                missile[i].y += 5;
                missile[i].update();
                missile[i].newPos();
            }

            myScore.update();



            for (i = 0; i < myMissile.length; i += 1) {
                myMissile[i].y -= 7;
                myMissile[i].update();
                for (x = 0; x < myObstacles.length; x += 1) {
                    if (myMissile[i].crashWith(myObstacles[x])) {
                        myObstacles.splice(myObstacles.indexOf(myObstacles[x]), 1);
                        myMissile.splice(myMissile.indexOf(myMissile[i]), 1);
                        myGameArea.frameNo += 100;

                    }
                }
                for (x = 0; x < hidden.length; x += 1) {
                    if (myMissile[i].crashWith(hidden[x])) {
                        hidden.splice(hidden.indexOf(hidden[x]), 1);
                        myMissile.splice(myMissile.indexOf(myMissile[i]), 2);
                        myGameArea.frameNo += 1000;
                    }
                }
            }

            for (i = 0; i < missile.length; i += 1) {
                if (myGamePiece.crashWith(missile[i])) {
                    myGameArea.stop();
                    alert('GAME OVER\n당신의 점수는 ' + myGameArea.frameNo + '점 입니다.');
                }
            }

            for (i = 0; i < myObstacles.length; i += 1) {
                if (myGamePiece.crashWith(myObstacles[i])) {
                    myGameArea.stop();
                    alert('GAME OVER\n당신의 점수는 ' + myGameArea.frameNo + '점 입니다.');
                }
            }

            // for (i = 0; i < myObstacles.length; i += 1) {
            //     if (myObstacles[i].y + 90 > myGameArea.canvas.height) {
            //         myGameArea.stop();
            //         alert('GAME OVER\n당신의 점수는 ' + myGameArea.frameNo + '점 입니다.');

            //     }
            // }

            setInterval(function () {
                for (i = 0; i < myObstacles.length; i += 1) {
                    myObstacles[i].speedX += 0.05;
                    myObstacles[i].speedY += 0.03;
                }
            }, 10000)

            setInterval(function () {
                for (i = 0; i < missile.length; i += 1) {
                    missile[i].speedY += 0.02;
                    missile[i].update();
                }
            }, 15000)
        }

        function everyinterval(n) {
            if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
            return false;
        }