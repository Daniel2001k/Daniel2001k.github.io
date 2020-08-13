function f(speed) {
    let displayNone = document.getElementById("start");
    displayNone.style.display = "none";

    let applePosition
    let course = 1;
    let pom = 121;
    let snakeBody = [119,120,pom];
    let snakeLastElement = null;
    let snakeInterval;
    let firstTime = true;
    let btns = document.getElementsByClassName("btn-curs");
    
    for (let i = 0; i < btns.length; i++) {
        btns[i].style.display = "flex";
        btns[i].addEventListener("click", mobileCourseChange);
    }
    btns = document.getElementById("buttons");
    btns.style.display = "flex";

    document.body.addEventListener("keyup",courseChange);

    printPoints();
    printBoard();
    printTiles();
    applePosition = printApple();

    document.getElementById(120).classList.add("startSnake");
    document.getElementById(121).classList.add("startSnake");
    document.getElementById(122).classList.add("startSnake");

    window.setTimeout(toStart,1000);
    
    
    function toStart() {
        snakeInterval = window.setInterval(snakeAnimation, speed);
    }

    //mobileCourseChange
    function mobileCourseChange() {
        //console.log(this);

        if (this.id == "btn-up" && course != 17) {
            course = -17;
        } else if (this.id == "btn-down" && course != -17) {
            course = 17;
        } else if (this.id == "btn-left" && course != 1) {
            course = -1;
        } else if (this.id == "btn-right" && course != -1) {
            course = 1;
        }
    }

    //course
    function courseChange(e) {
        //console.log(e);
        if (e.code == "ArrowUp" && course != 17) {
            course = -17;
        } else if (e.code == "ArrowDown" && course != -17) {
            course = 17;
        } else if (e.code == "ArrowLeft" && course != 1) {
            course = -1;
        } else if (e.code =="ArrowRight" && course != -1) {
            course = 1;
        }
    }


    //points
    function printPoints() {
        let points = document.createElement("h1");
        let bd = document.getElementById("game");
        let quantity = document.createTextNode("0");
        points.id = "points";
        points.appendChild(quantity);
        bd.appendChild(points);
    }
    //points change
    function changePoints() {
        let points = document.getElementById("points");
        let no = parseInt(points.innerHTML);
        ++no;
        points.innerHTML = no;
        applePosition = printApple();
    }
    //board
    function printBoard() {
        let board = document.createElement("div");
        board.className = "board";
        board.id = "board";
        let bd = document.getElementById("game")
        bd.appendChild(board);
    }

    //tiles
    function printTiles() {
        let board = document.getElementsByClassName("board");
        let tilesQuantity = 289;
        let tile;

        for (let i = 0; i < tilesQuantity; i++) {
            tile = document.createElement("div");
            tile.id = i;
            if (i % 2 == 0) {
                tile.className = "lightTile";
            } else {
                tile.className = "darkTile";
            }
            board[0].appendChild(tile);
        }
    }

    //apple
    function printApple() {
        let random = Math.floor(Math.random() * 289);
        let j = 0;
        for (let i = 0; i < snakeBody.length; i++) {
            if (random === snakeBody[i]) {
                while (document.getElementById(j).classList.contains("snake")) {
                    j++;
                }
                random = j;
            }
        }
        let img = document.createElement("img");
        img.src = "img/apple.png"
        img.className = "apple";
        img.id = "apple";
        document.getElementById(random).appendChild(img);
        return random;
    }

    //snake animation
    function snakeAnimation() {
        let isApple = false;
        let goEnd = false;

        

        //remove last element of snake if apple wasnt touch
        if (!isApple && snakeLastElement != null) {
            document.getElementById(snakeBody[0]).classList.remove("snake");
        }

        //console.log(applePosition);
        //console.log(snakeBody);

        //course,table of snake
        snakeLastElement = snakeBody[0];
        for (let i = 0; i < snakeBody.length; i++) {
            //first element
            if(i === snakeBody.length - 1) {
                snakeBody[i] += course;
            } else { //next elements
                snakeBody[i] = snakeBody[i+1];
            }
        }
        
        //if snake touch apple
        if(snakeBody[snakeBody.length - 1] === applePosition) {
            //add element on start of snake
            snakeBody.unshift(snakeLastElement);
            
            //remove old apple
            let oldApplesDiv = document.getElementById(applePosition);
            oldApplesDiv.removeChild(oldApplesDiv.firstChild);

            //create new apple
            //add point
            changePoints();

            isApple = true;
        }

        //print snake
        for (let i = 0; i < snakeBody.length; i++) {
            if (i != snakeBody.length - 1 && document.getElementById(snakeBody[i])) {
                document.getElementById(snakeBody[i]).classList.add("snake");  
            } else if (document.getElementById(snakeBody[i]) && !document.getElementById(snakeBody[i]).classList.contains("snake")) {
                document.getElementById(snakeBody[i]).classList.add("snake");  
            } else if (document.getElementById(snakeBody[i]) && document.getElementById(snakeBody[i]).classList.contains("snake")) {
                clearInterval(snakeInterval);
                goEnd = true;
            }
        }
        
        //last element
        snakeLastElement = document.getElementById(snakeBody[0]);

        //end 2
        if (isEnd()) {
            clearInterval(snakeInterval);
            goEnd = true;
        }

        if (goEnd) {
            let pointsEnd = document.getElementById("endPoints");
            let pointss = parseInt(document.getElementById("points").innerHTML); 
            pointsEnd.innerHTML = "Your points: " + pointss; 
            let endBoard = document.getElementById("koniec");
            endBoard.style.display = "flex";
            let endGame = document.getElementById("board");
            let bd = document.getElementById("game")
            bd.removeChild(endGame);
            endGame = document.getElementById("points");
            bd.removeChild(endGame);
            let btns = document.getElementsByClassName("btn-curs");
            for (let i = 0; i < btns.length; i++) {
                btns[i].style.display = "none";
            }
            btns = document.getElementById("buttons");
            btns.style.display = "none";
        }

        if (firstTime) {
            document.getElementById(120).classList.remove("startSnake");
            document.getElementById(121).classList.remove("startSnake");
            document.getElementById(122).classList.remove("startSnake");
            firstTime = false;
        }
    }

    //rules
    function isEnd() {
        //right wall
        if(snakeBody[snakeBody.length - 1] === 17 && snakeBody[snakeBody.length - 2] === 16) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 34 && snakeBody[snakeBody.length - 2] === 33) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 51 && snakeBody[snakeBody.length - 2] === 50) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 68 && snakeBody[snakeBody.length - 2] === 67) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 85 && snakeBody[snakeBody.length - 2] === 84) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 102 && snakeBody[snakeBody.length - 2] === 101) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 119 && snakeBody[snakeBody.length - 2] === 118) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 136 && snakeBody[snakeBody.length - 2] === 135) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 153 && snakeBody[snakeBody.length - 2] === 152) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 170 && snakeBody[snakeBody.length - 2] === 169) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 187 && snakeBody[snakeBody.length - 2] === 186) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 204 && snakeBody[snakeBody.length - 2] === 203) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 221 && snakeBody[snakeBody.length - 2] === 220) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 238 && snakeBody[snakeBody.length - 2] === 237) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 255 && snakeBody[snakeBody.length - 2] === 254) {
            return true;
        } else if(snakeBody[snakeBody.length - 1] === 272 && snakeBody[snakeBody.length - 2] === 271) {
            return true;
        } else if(snakeBody[snakeBody.length - 1] === 289 && snakeBody[snakeBody.length - 2] === 288) {
            return true;
        }
        //left wall
        else if(snakeBody[snakeBody.length - 1] === -1 && snakeBody[snakeBody.length - 2] === 0) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 16 && snakeBody[snakeBody.length - 2] === 17) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 33 && snakeBody[snakeBody.length - 2] === 34) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 50 && snakeBody[snakeBody.length - 2] === 51) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 67 && snakeBody[snakeBody.length - 2] === 68) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 84 && snakeBody[snakeBody.length - 2] === 85) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 101 && snakeBody[snakeBody.length - 2] === 102) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 118 && snakeBody[snakeBody.length - 2] === 119) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 135 && snakeBody[snakeBody.length - 2] === 136) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 152 && snakeBody[snakeBody.length - 2] === 153) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 169 && snakeBody[snakeBody.length - 2] === 170) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 186 && snakeBody[snakeBody.length - 2] === 187) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 203 && snakeBody[snakeBody.length - 2] === 204) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 220 && snakeBody[snakeBody.length - 2] === 221) {
            return true;
        } else if (snakeBody[snakeBody.length - 1] === 237 && snakeBody[snakeBody.length - 2] === 238) {
            return true;
        } else if(snakeBody[snakeBody.length - 1] === 254 && snakeBody[snakeBody.length - 2] === 255) {
            return true;
        } else if(snakeBody[snakeBody.length - 1] === 271 && snakeBody[snakeBody.length - 2] === 272) {
            return true;
        }
        //ceil and floor
        else if(snakeBody[snakeBody.length - 1] < 0 || snakeBody[snakeBody.length - 1] > 288) {
            return true;
        } 
    }

    
}

function closeEndBoard() {
    let endBoard = document.getElementById("koniec");
    endBoard.style.display = "none";
    let startBoard = document.getElementById("start");
    startBoard.style.display = "flex";
    
}
