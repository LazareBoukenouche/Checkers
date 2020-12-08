// Declare the constants of the game
const boardGame = [
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]],
    [[],[],[],[],[],[],[],[],[],[]]
   ]

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// =================================== Version POO ==============================


// class Pawn {}

// class WhitePawn extends Pawn {}

// class BlackPawn extends Pawn {}

class Board {
    array;
    x;
    y;
    height;
    width;

    constructor(array,x,y,height,width) {
        this.array = array;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        }
    
    // display the board on the HTML page
    display() {
        // we loop trough each cell and multiply their x coordinate by i and y by j
        // then use the display method of each cell
        for (let i = 0;i< this.array.length;i++) {
            for (let j = 0;j<this.array[i].length;j++) {
                this.array[i][j][0].y*=i;
                this.array[i][j][0].x*=j
                this.array[i][j][0].display(this.array[i][j][0].x,this.array[i][j][0].y);
            }
        }
    }

    createCell() {
        let cellInstance = new Cell(this.height/10,this.width/10,this.x,this.y);
        return cellInstance;
    }

    createBlackCell() {
        let blackCellInstance = new BlackCell(this.height/10,this.width/10,this.x,this.y);
        return blackCellInstance;
    }

    addCellsToBoard() {
        // we loop trough the 2D array representing the board
        // if the cell is located on a even row and an even colum,
        // or an odd row and an odd column,
        // we add a black case

        // if the cell is located on a even row and an odd colum,
        // or an odd row and an even column,
        // we add a white case
        for (let i = 0; i < this.array.length;i++) {
            for (let j = 0; j < this.array[i].length;j++) {
                if (i % 2 === 0 && j % 2 === 0) {
                    this.array[i][j].push(this.createBlackCell());
                }
                else if (i % 2 === 0 && j % 2 != 0) {
                    this.array[i][j].push(this.createCell());
                }
                else if (i % 2 != 0 && j % 2 === 0) {
                    this.array[i][j].push(this.createCell());
                }
                else if (i % 2 != 0 && j % 2 != 0) {
                    this.array[i][j].push(this.createBlackCell());
                }
            }
        }
    }

    getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const coordinates = [Math.floor(x),Math.floor(y)];
        return coordinates;
    }

    seeIfInsideCase(row,col) {
        let coteGauche = this.array[row][col][0].getX();
        let coteDroit =  coteGauche + this.array[row][col][0].width;
        let coteSuperieur = this.array[row][col][0].getY();
        let coteInferieur = coteSuperieur + this.array[row][col][0].height;
        let x = this.getCursorPosition(canvas,event)[0];
        let y = this.getCursorPosition(canvas,event)[1];
        if ( x  > coteGauche && x < coteDroit &&  y > coteSuperieur && y < coteInferieur){
                console.log(coteGauche,x,coteDroit);
                console.log(coteSuperieur,y,coteInferieur);
                this.array[row][col][0].select();
                console.log(this.array[row][col][0].color);
        }
    }

    // selectCell(coordX,coordY) {
    //     for (let i = 0;i< this.array.length;i++) {
    //         for (let j = 0;j<this.array[i].length;j++) {
    //             console.log(this.array[i][j][0].getY(),this.array[i][j][0].getX());
    //         }
    //     }
    // }
}

class Cell {
    x;
    y;
    height = canvas.height/10;
    width = canvas.width/10;
    color = "darkred";

    constructor(x,y) {
    	this.x = x;
        this.y = y;
        }
    
    display(x,y) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "white";
        ctx.strokeRect(x,y,this.height,this.width, this.color);
        ctx.fillRect(x,y,this.height,this.width, this.color);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
    
    setX(newX) {
        this.x = newX;
        return this.x;
    }

    setY(newY) {
        this.y = newY;
        return this.y;
    }
    select() {
        console.log('Select');
    }
}

class BlackCell extends Cell {
    color = "black";

    constructor(height,width,x,y) {
    	super(height,width,x,y)
    }
}

class Game {

    start() {
        const board = new Board(boardGame,0,0,canvas.height,canvas.width);
        board.addCellsToBoard();
        board.display();
        // board.selectCell();
        canvas.addEventListener('click',function(e){
            // board.getCursorPosition(canvas, e);
            for (let i = 0; i < board.array.length;i++) {
                for (let j = 0; j < board.array[i].length;j++) {
                    board.seeIfInsideCase(i,j);
                }
            }



            
        });
    }
}

document.querySelectorAll('.play')[0].addEventListener('click', function() {
    // Display the board game when clicking on the start button
    document.querySelector("#main").style.display = 'none';
    document.querySelector("canvas").style.display = 'block';
    const game = new Game();
    game.start();
});

// =================================== Version POO Fin ==============================



// ===================== RULES =====================
// the game is play on a 10*10 board
// each player have 20 pawn at first
// the game start with the white pawn
// we select a pawn
// if the pawn selected face one ore two empty cases
// the pawn can move one time
// if the pawn reach the last range of the opposite board
// it become a King
// A King can move until he encounters a wall or two pawns
// if a pawn have an opponent pawn beyond it and an empty case beyond the opponent pawn
// it can eat the pawn by jumping beyond the opponent pawn unto the empty case
// if, on the empty case, it encounters the same situation, it can eat again

// the game is finished when a Player lose all his pawn or two King of opposite players exists
// at the same time
// ===================== RULES =====================







// =================================== old code  =========================================

// // document.querySelector("aside").style.display = 'flex';
    // const boardGame = new Board(80,80,0,0);
    // boardGame.displayBoard();
    // boardGame.addMovingClassToBlackCells(0,25);
    // boardGame.addPawnsToCells("blackPawn",0,10);
    // boardGame.addPawnsToCells("whitePawn",15,25);
    // boardGame.createPawns();
    // const allWhitePawnsDivs = document.querySelectorAll('.whitePawn');
    // console.log(whitePawnsInstances)
    // const whitePawnsInstancesAndDivMap = new Map();
    // allWhitePawnsDivs.forEach((pawn,i) => {
    //     whitePawnsInstancesAndDivMap.set(pawn.getAttribute("nb"),whitePawnsInstances[i]);
    // });
    // console.log(whitePawnsInstancesAndDivMap.get("1").checkAvailableMoves());
    // // for (let i = 0; i < array2D.length; i++) {    for (let j = 0; j < array2D[i].length; j++) {
    // Draw all the blocks
// const body = document.querySelector("body");
// const joueur1 = true;
// let selection = false;
// const cells = ["cell", "cell", "cell", "cell", "cell", "cell", "cell", "cell", "cell", "cell"];
// const rows = ['row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row', 'row'];
// let whiteTurn = true;
// let blackTurn  = false;
// let blackPawnsInstances = [];
// let whitePawnsInstances = [];
// let pawnIsSelected = false;





// // create the pawns and add them to their respectives arrays
    // createPawns() {
    //     let blackPawn = new BlackPawn(10,10);
    //     let whitePawn = new WhitePawn(10,10);
    //     blackPawn.addSelectFunctionToPawns();
    //     whitePawn.addSelectFunctionToPawns();
    // }

    // select() {
    //     this.style.borderColor = '#4eb1ba';
    //     this.style.height = 100;
    // }
    
    // // add a onclick event
    // addSelectFunctionToCells() {
    //     let cells = document.querySelectorAll("div.cell");
    //     cells.forEach(cell => {
    //         cell.addEventListener("click", this.select);
    //     });
    // }

    // stylePawn(type,bgColor) {
    //     // add a style to the pawns
    //     let pawns = document.querySelectorAll(type);
    //     pawns.forEach(pawn => {
    //         let newPawn = new Pawn();
    //         pawn.style.height = "9vh";
    //         pawn.style.width = "9vh";
    //         pawn.style.backgroundColor = bgColor;
    //         pawn.style.borderRadius = "50%";
    //         pawn.style.margin = "auto";
    //     });
    // }
    // addMovingClassToBlackCells(starterCell,lastCell) {
    //     let evenRowCells = document.querySelectorAll(".row:nth-child(even) .cell:nth-child(even)");

    //     // select the black cells who are on the 2,4,6,8 and 10 rows and add a pawn to these cells
    //     for (let i=starterCell;i<lastCell;i++) {
    //         evenRowCells[i].classList.add("movingCell");
    //     }
       
    //     // select the black cells who are on the 1,3,5,7 and 9 rows and add a pawn to these cells
    //     let oddRowCells = document.querySelectorAll(".row:nth-child(odd) .cell:nth-child(odd)");
    //     for (let i=starterCell;i<lastCell;i++) {
    //         oddRowCells[i].classList.add("movingCell");
    //     }
    // }

    

    // // add Pawns to the board
    // addPawnsToCells(colorPawn,starterCell,lastCell) {
        
    //     let evenRowCells = document.querySelectorAll(".row:nth-child(even) .cell:nth-child(even)");

    //     // select the black cells who are on the 2,4,6,8 and 10 rows and add a pawn to these cells
    //     for (let i=starterCell;i<lastCell;i++) {
    //         evenRowCells[i].insertAdjacentHTML('afterbegin',"<div class="+colorPawn+"></div>");
    //         blackPawnsInstances.push(new Pawn(10,10));
    //         whitePawnsInstances.push(new Pawn(10,10));
    //     }
       
    //     // select the black cells who are on the 1,3,5,7 and 9 rows and add a pawn to these cells
    //     let oddRowCells = document.querySelectorAll(".row:nth-child(odd) .cell:nth-child(odd)");
    //     for (let i=starterCell;i<lastCell;i++) {
    //         oddRowCells[i].insertAdjacentHTML('afterbegin',"<div class="+colorPawn+"></div>");
    //     }

    //     // add a style to the pawns
    //     this.stylePawn(".whitePawn","#a5740c");
    //     this.stylePawn(".blackPawn","darkred");
    // }

// class Board {
//     array;


//     constructor(array) {
//     	this.array = array;
//         }
    
//     // create the board game and display it on the HTML page
//     displayBoard() {
        
//         let container = document.querySelector('main.myGame');
//         // insert ten div.row inside the main tag
//         rows.forEach((row) => { 
//             container.insertAdjacentHTML('beforeend',"<div class="+row.toString()+"></div>");
//         });
//         // insert ten div.cell inside each div.row
//         let myRows = document.querySelectorAll('div.row');
//         cells.forEach(square => {
//             myRows.forEach(unit => {
//                 unit.insertAdjacentHTML('beforeend',"<div class="+cells[0].toString()+"></div>");
//             });
//         });
//     }

//     createCells() {}
    
//     select() {
//         this.style.borderColor = '#4eb1ba';
//         this.style.height = 100;
//     }
    
//     // add a onclick event
//     addSelectFunctionToCells() {
//         let cells = document.querySelectorAll("div.cell");
//         cells.forEach(cell => {
//             cell.addEventListener("click", this.select);
//         });
//     }

//     stylePawn(type,bgColor) {
//         // add a style to the pawns
//         let pawns = document.querySelectorAll(type);
//         pawns.forEach(pawn => {
//             let newPawn = new Pawn();
//             pawn.style.height = "9vh";
//             pawn.style.width = "9vh";
//             pawn.style.backgroundColor = bgColor;
//             pawn.style.borderRadius = "50%";
//             pawn.style.margin = "auto";
//         });
//     }
//     addMovingClassToBlackCells(starterCell,lastCell) {
//         let evenRowCells = document.querySelectorAll(".row:nth-child(even) .cell:nth-child(even)");

//         // select the black cells who are on the 2,4,6,8 and 10 rows and add a pawn to these cells
//         for (let i=starterCell;i<lastCell;i++) {
//             evenRowCells[i].classList.add("movingCell");
//         }
       
//         // select the black cells who are on the 1,3,5,7 and 9 rows and add a pawn to these cells
//         let oddRowCells = document.querySelectorAll(".row:nth-child(odd) .cell:nth-child(odd)");
//         for (let i=starterCell;i<lastCell;i++) {
//             oddRowCells[i].classList.add("movingCell");
//         }
//     }

//     // create the pawns and add them to their respectives arrays
//     createPawns() {
//         let blackPawn = new BlackPawn(10,10);
//         let whitePawn = new WhitePawn(10,10);
//         blackPawn.addSelectFunctionToPawns();
//         whitePawn.addSelectFunctionToPawns();
//     }

//     // add Pawns to the board
//     addPawnsToCells(colorPawn,starterCell,lastCell) {
        
//         let evenRowCells = document.querySelectorAll(".row:nth-child(even) .cell:nth-child(even)");

//         // select the black cells who are on the 2,4,6,8 and 10 rows and add a pawn to these cells
//         for (let i=starterCell;i<lastCell;i++) {
//             evenRowCells[i].insertAdjacentHTML('afterbegin',"<div class="+colorPawn+"></div>");
//             blackPawnsInstances.push(new Pawn(10,10));
//             whitePawnsInstances.push(new Pawn(10,10));
//         }
       
//         // select the black cells who are on the 1,3,5,7 and 9 rows and add a pawn to these cells
//         let oddRowCells = document.querySelectorAll(".row:nth-child(odd) .cell:nth-child(odd)");
//         for (let i=starterCell;i<lastCell;i++) {
//             oddRowCells[i].insertAdjacentHTML('afterbegin',"<div class="+colorPawn+"></div>");
//         }

//         // add a style to the pawns
//         this.stylePawn(".whitePawn","#a5740c");
//         this.stylePawn(".blackPawn","darkred");
//     }
// }