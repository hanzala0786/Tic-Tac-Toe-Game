const playerInfo = document.querySelector(".playerInfo");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let crntPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initializeNewGame(){
    crntPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    playerInfo.innerText = `currrent player - ${crntPlayer}`;
    newGameBtn.classList.remove("active");
    // updating on UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })
}
initializeNewGame();

function turnSwap(){
    if(crntPlayer === "X"){
        crntPlayer = "0";
    }
    else{
        crntPlayer = "X";
    }

    playerInfo.innerText = `current player - ${crntPlayer}`;
}

function checkGameOver(){
    // let us winner is
    console.log("winner is no one");
    let winner = "";

    // condition for winning
    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                console.log("let us assume winner is X")
                if(gameGrid[position[0]] === "X") 
                    winner = "X";
                else {
                    winner = "0";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    // declaring the winner on playerInfo
    if(winner !== ""){
        playerInfo.innerText = `winning player - ${winner}`;
        newGameBtn.classList.add("active");
        return ;
    }

    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });
    if(fillCount == 9){
        newGameBtn.classList.add("active");
        playerInfo.innerText = `Game Tied !`;
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = crntPlayer;
        gameGrid[index] = crntPlayer;
        boxes[index].style.pointerEvents = "none";
        // now change the player
        turnSwap();
        // check wheather any player has win or not
        console.log("checking for the winner");
        checkGameOver();
        console.log("winner has found");
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener('click', initializeNewGame);
